import { useApiClients } from "@/hooks/UseApiClients";
import Head from "next/head";
import React, { useEffect } from "react";
import { PostPreview } from "@/client";
import PostComponent from "@/components/PostComponent";
import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();
  const api = useApiClients();
  const [result, setResult] = React.useState<PostPreview[]>([]);
  const searchInput = React.useRef<HTMLInputElement>(null);
  const { q } = router.query;

  const search = async () => {
    const keyword = searchInput.current?.value;
    if (!keyword) {
      return;
    }

    await router.replace(
      { pathname: router.pathname, query: { q: keyword } },
      undefined,
      { shallow: true },
    );

    const res = await api.searchPosts({ query: keyword });
    setResult(res);
  };

  useEffect(() => {
    const call = async () => {
      if (typeof q !== "string") {
        return;
      }
      if (!searchInput.current) {
        return;
      }

      searchInput.current.value = q;

      if (q) {
        await search();
      }
    };
    call();
  }, [q]);

  return (
    <div>
      <div className="min-h-[calc(100vh-48px)] mx-2">
        <Head>
          <title>検索 | うちあけ</title>
        </Head>

        <div className="mt-8 flex justify-center items-center h-full">
          <input
            ref={searchInput}
            className="h-12 px-4 text-lg border border-gray-300 rounded-md grow"
            type="text"
            placeholder="キーワード"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !(e.nativeEvent as KeyboardEvent).isComposing) {
                search();
              }
            }}
          />
          <button
            className="h-12 px-4 text-lg border border-gray-300 rounded-md"
            onClick={search}
          >
            検索
          </button>
        </div>

        <div className="mt-8 space-y-2">
          {result.map((post) => (
            <PostComponent post={post} key={post.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
