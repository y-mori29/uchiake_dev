import { PostPreview } from "@/client";
import PostComponent from "@/components/PostComponent";
import Head from "next/head";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import ReactLoading from "react-loading";
import { useApiClients } from "@/hooks/UseApiClients";

export default function PostsPage() {
  const [posts, setPosts] = useState<PostPreview[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const api = useApiClients();

  const loadMore = async () => {
    const newPosts = await api.getPostPreviews({
      createdAt: posts[posts.length - 1]?.createdAt || "",
      id: posts[posts.length - 1]?.id || "",
    });
    if (newPosts.length === 0) {
      setHasMore(false);
    }
    setPosts([...posts, ...newPosts]);
  };

  useEffect(() => {
    const call = async () => {
      setPosts(await api.getPostPreviews());
    };
    call();
  }, []);

  return (
    <div className="min-h-[calc(100vh-48px)] pt-2">
      <Head>
        <title>最新の「うちあけ」 | うちあけ</title>
      </Head>
      <h2 className="relative mb-2 bg-gray-100 px-2 py-1 text-xl font-bold before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-amber-500">
        最新の「うちあけ」
      </h2>

      <InfiniteScroll
        loadMore={loadMore}
        hasMore={hasMore}
        loader={
          <div className="mx-0 my-auto flex items-center" key={0}>
            <ReactLoading type="spokes" color="#ccc" height={30} width={30} />
          </div>
        }
      >
        <div className="space-y-2 px-1">
          {posts.map((post, index) => (
            <PostComponent post={post} key={index} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
