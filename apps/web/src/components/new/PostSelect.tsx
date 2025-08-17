import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import PostComponent from "../PostComponent";
import { PostPreview } from "@/client";
import { useApiClients } from "@/hooks/UseApiClients";

type PostSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function PostSelect({ value, onChange }: PostSelectProps) {
  const [posts, setPosts] = useState<PostPreview[]>([]);
  const api = useApiClients();

  useEffect(() => {
    const call = async () => {
      setPosts(
        await api.getMyPostPreviews(),
      );
    };
    call();
  }, []);

  return (
    <div className="flex w-full flex-col items-center px-4 py-8">
      <h1 className="mb-6 text-center text-lg font-semibold">
        あなたが書くストーリーの
        <br />
        続きを選んでください
      </h1>

      <div className="flex w-full max-w-2xl">
        <div className="flex grow flex-wrap space-x-2">
          {posts.length === 0 && (
            <div className="mb-6 w-full text-center text-lg">あなたが書き込んだ「うちあけ」がまだないようです</div>
          )}
          {posts.map((post) => (
            <div
              key={post.id}
              className={twMerge(
                "mb-4 grow rounded bg-gray-100 p-2 shadow-lg",
                value === post.id && "border-2 border-amber-500",
              )}
              onClick={() => onChange(post.id)}
            >
              <PostComponent post={post} link={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
