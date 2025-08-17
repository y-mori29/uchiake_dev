import { useRouter } from "next/router";
import { HeartIcon, MegaphoneIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { PostDetail, ResponseError } from "@/client";
import { useEffect, useRef, useState } from "react";
import CommentForm from "@/components/CommentForm";
import { CommentFormRef } from "@/components/CommentForm";
import CommentComponent from "@/components/CommentComponent";
import { useAuth0 } from "@auth0/auth0-react";
import { twMerge } from "tailwind-merge";
import { useDebouncedCallback } from "use-debounce";
import Head from "next/head";
import useRegisterRequiredModal from "@/hooks/UseRegisterRequiredModal";
import { useApiClients } from "@/hooks/UseApiClients";

export default function PostPage() {
  const router = useRouter();
  const { id, commentid } = router.query;
  const api = useApiClients();

  const defualtDescription =
    "うちあけは、病気の当事者が体験を共有し、他の患者さんの体験や努力を知り、共感や励ましを通じて、前向きな気持ちを育むコミュニティサイトです";

  const [post, setPosts] = useState<PostDetail | undefined>(undefined);
  const [openCommentForm, setOpenCommentForm] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isCheered, setIsCheered] = useState(false);
  const [cheerCount, setCheerCount] = useState(0);

  const commentFormRef = useRef<CommentFormRef>(null);

  const { isLoading, isAuthenticated } = useAuth0();

  const { openRegisterModal } = useRegisterRequiredModal();

  useEffect(() => {
    if (isLoading) return;
    updateData();
  }, [id, isAuthenticated, isLoading]);

  useEffect(() => {
    if (openCommentForm && commentFormRef.current) {
      commentFormRef.current.focus();
    }
  }, [openCommentForm]);

  const handleWriteComment = () => {
    if (!isAuthenticated) {
      openRegisterModal("コメント機能を使う");
      return;
    }
    openCommentArea();
  };

  const openCommentArea = () => {
    setOpenCommentForm(true);
    commentFormRef?.current?.focus();
  };

  const closeCommentArea = () => {
    setOpenCommentForm(false);
  };

  const debouncedSendLikeRequest = useDebouncedCallback(async (flag: boolean) => {
    if (!post) return;
    await api.updateGoodFeedback(
      { postId: post.id, updateFeedbackDto: { flag } },
    );
  }, 200);

  const debouncedSendCheerRequest = useDebouncedCallback(async (flag: boolean) => {
    if (!post) return;
    await api.updateCheerFeedback(
      { postId: post.id, updateFeedbackDto: { flag } },
    );
  }, 200);

  const handleLikeClick = async () => {
    if (!isAuthenticated) {
      openRegisterModal("フィードバック機能を使う");
      return;
    }
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1));
    debouncedSendLikeRequest(newLikedState);
  };

  const handleCheerClick = async () => {
    if (!isAuthenticated) {
      openRegisterModal("フィードバック機能を使う");
      return;
    }
    const newCheeredState = !isCheered;
    setIsCheered(newCheeredState);
    setCheerCount((prev) => (newCheeredState ? prev + 1 : prev - 1));
    debouncedSendCheerRequest(newCheeredState);
  };

  const updateData = async () => {
    if (typeof id !== "string") return;

    if (isAuthenticated) {
      try {
        const post = await api.getPostDetails(
          { id },
        );
        setPosts(post);
        setIsLiked(post?.feedback.find((feedback) => feedback.kind === "GOOD")?.pushed || false);
        setLikeCount(post?.feedback?.find((feedback) => feedback.kind === "GOOD")?.count || 0);
        setIsCheered(post?.feedback.find((feedback) => feedback.kind === "CHEER")?.pushed || false);
        setCheerCount(post?.feedback?.find((feedback) => feedback.kind === "CHEER")?.count || 0);
      } catch (e) {
        if (e instanceof ResponseError && e.response?.status === 404) {
          await router.push("/404");
        }
      }
    } else {
      try {
        setPosts(await api.getPostDetails({ id }));
      } catch (e) {
        if (e instanceof ResponseError && e.response?.status === 404) {
          await router.push("/404");
        }
      }
    }
  };

  return (
    <main className="min-h-[calc(100vh-48px)]">
      <Head>
        <title>{post?.title} | うちあけ</title>
        <meta name="description" content={post?.answers[0].content.slice(0, 100) || defualtDescription} />
        <meta property="og:title" content={post?.title || "うちあけ"} />
        <meta property="og:description" content={post?.answers[0].content.slice(0, 100) || defualtDescription} />
        <meta property="og:image" content="https://uchiake.com/icon-512x512.png" />
        <meta property="og:url" content={"https://uchiake.com/post/" + id} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <section className="my-4 bg-gray-100">
        <div className="mb-2">
          <h1 className="relative my-2 bg-gray-300 px-2 py-1 text-xl font-bold">{post?.title}</h1>
          <div className="flex items-center">
            <UserCircleIcon className="size-16" />
            <p className="text-sm">{post?.user.name}</p>
          </div>
          <p className="mt-1 mb-2 px-2 text-sm text-gray-600">
            {post?.tags.map(tag => `#${tag}`).join(' ')}
          </p>
        </div>

        <div className="space-y-4 px-2">
          {post?.answers.map((answer) => (
            <div key={answer.question.order}>
              <h2
                className="relative my-1 bg-gray-100 px-2 py-1 text-sm font-bold before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-amber-500">
                {answer.question.viewContent}
              </h2>
              <p className="text-sm whitespace-pre-line">{answer.content}</p>
            </div>
          ))}
        </div>

        <div className="py-4">
          <div className="flex justify-end space-x-8 px-4">
            <div className="flex items-center space-x-2">
              <HeartIcon
                className={twMerge("size-6 cursor-pointer text-gray-400", isLiked && "text-red-500")}
                onClick={() => {
                  handleLikeClick();
                }}
              />
              <span>{likeCount}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MegaphoneIcon
                className={twMerge("size-6 cursor-pointer text-gray-400", isCheered && "text-red-500")}
                onClick={() => {
                  handleCheerClick();
                }}
              />
              <span>{cheerCount}</span>
            </div>
          </div>
        </div>
      </section>

      {post?.subPosts && post.subPosts.length > 0 && (
        <>
          <h1 className="mb-2 mt-4 text-xl font-semibold text-gray-800">ストーリー</h1>
          {post.subPosts.map((subPost) => (
            <section className="bg-gray-100" key={subPost.id}>
              <div className="relative my-2 bg-gray-300 px-2 py-1 text-xl font-bold">{subPost.title}</div>
              <div className="mb-4 space-y-4 px-2 pb-4 pt-2">
                {subPost?.subAnswers.map((subAnswer) => (
                  <div key={subAnswer.subQuestion.order}>
                    <h2
                      className="relative my-1 bg-gray-100 px-2 py-1 text-sm font-bold before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-amber-500">
                      {subAnswer.subQuestion.viewContent}
                    </h2>
                    <p className="text-sm whitespace-pre-line">{subAnswer.content}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </>
      )}

      <section className="mb-4">
        <div>
          <div className="flex items-center px-2 py-1">
            <h2 className="relative font-bold">この投稿に対してのコメント</h2>
            <div className="grow"></div>
            <div
              className="cursor-pointer rounded-full bg-blue-600 px-4 py-2 text-sm text-white shadow-md hover:bg-blue-700"
              onClick={handleWriteComment}
            >
              コメントを書く
            </div>
          </div>
        </div>

        <div>
          {openCommentForm && (
            <CommentForm
              postId={post?.id}
              closeCommentArea={closeCommentArea}
              updatePage={updateData}
              ref={commentFormRef}
            />
          )}
          {post?.comments.map((comment, index) => <CommentComponent key={index} comment={comment} highlight={commentid === comment.id} />)}
        </div>
      </section>
    </main>
  );
}
