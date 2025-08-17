import { XMarkIcon } from "@heroicons/react/24/solid";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useApiClients } from "@/hooks/UseApiClients";

interface CommentFormProps {
  postId: string | undefined;
  closeCommentArea: () => void;
  updatePage: () => void;
}

export type CommentFormRef = {
  focus: () => void;
};

const CommentForm = forwardRef<CommentFormRef, CommentFormProps>(({ postId, closeCommentArea, updatePage }, ref) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const api = useApiClients();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef?.current?.focus();
    },
  }));

  const sendComment = async () => {
    if (postId === undefined) return;
    const comment = inputRef?.current?.value;
    if (!comment) return;
    if (inputRef?.current) {
      inputRef.current.value = "";
    }
    await api.createComment({
      createCommentDto: {
        postId,
        content: comment,
      },
    });
    closeCommentArea();
    updatePage();
  };

  return (
    <div className="mx-1 flex flex-col">
      <div className="flex justify-end">
        <XMarkIcon className="size-6 cursor-pointer" onClick={closeCommentArea} />
      </div>
      <textarea
        className="mt-2 h-32 w-full rounded border p-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
        placeholder="コメントを入力してください"
        ref={inputRef}
      />
      <div className="flex justify-end">
        <button
          className="my-2 cursor-pointer rounded-full bg-amber-600 px-4 py-2 text-sm text-white shadow-md hover:bg-amber-700"
          onClick={sendComment}
        >
          送信
        </button>
      </div>
    </div>
  );
});

CommentForm.displayName = "CommentForm";

export default CommentForm;
