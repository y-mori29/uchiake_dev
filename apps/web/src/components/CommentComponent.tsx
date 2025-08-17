import { Comment } from "@/client";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";

type CommentProps = {
  comment: Comment;
  highlight: boolean;
};

export default function CommentComponent({ comment, highlight }: CommentProps) {
  return (
    <div className={twMerge("m-1 rounded border-2 border-gray-300 p-1", highlight && "border-amber-500 bg-amber-50")} id={`comment-${comment.id}`}>
      <div className="mb-2">
        <div className="flex items-center">
          <UserCircleIcon className="size-8" />
          <p className="px-1 text-sm">{comment.user.name}</p>
          {comment.user.role === "EXPERT" && (
            <span className="ml-2 rounded bg-yellow-200 px-1 text-xs">専門家のコメント</span>
          )}
        </div>
      </div>
      <div className="whitespace-pre-line text-sm">{comment.content}</div>
    </div>
  );
}
