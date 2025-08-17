import { PostPreview } from "@/client";
import Link from "next/link";

interface PostCardProps {
  post: PostPreview;
  link?: boolean;
}

export default function PostComponent({ post, link = true }: PostCardProps) {
  const content = [
    <div key="1">
      <h3 className="text-sm font-bold">{post.title}</h3>
      <div className="mt-1 flex flex-wrap items-center space-x-2">
        {post.tags.map((tag, index) => (
          <span key={index} className="text-xs">
            #{tag}
          </span>
        ))}
      </div>
    </div>,
    <div key="2">
      <p className="line-clamp-4 text-xs">{post.description}</p>
    </div>,
  ];

  return link ? (
    <Link href={`/post/${post.id}`} className="grid h-20 grid-cols-2 gap-2 bg-gray-100 p-2 shadow-md">
      {content}
    </Link>
  ) : (
    <div className="grid h-20 grid-cols-2 gap-2 bg-gray-100 p-2">{content}</div>
  );
}
