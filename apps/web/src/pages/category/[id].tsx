import { Category, PostPreview } from "@/client";
import PostComponent from "@/components/PostComponent";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import ReactLoading from "react-loading";
import { useApiClients } from "@/hooks/UseApiClients";

export default function CategoryPage() {
  const router = useRouter();
  const { id } = router.query;
  const api = useApiClients();

  const [category, setCategory] = useState<Category | null>(null);
  const [posts, setPosts] = useState<PostPreview[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (typeof id !== "string" || Number.isNaN(Number(id))) {
      return;
    }
    const newPosts = await api.getPostPreviewsInCategory({
      category: id,
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
      if (typeof id !== "string" || Number.isNaN(Number(id))) {
        return;
      }
      setCategory(await api.getCategory({ id: id }));
      setPosts(await api.getPostPreviewsInCategory({ category: id }));
    };
    call();
  }, [id]);

  return (
    <div className="min-h-[calc(100vh-48px)] pt-2">
      <Head>
        <title>{category?.name} についての「うちあけ」 | うちあけ</title>
      </Head>
      <h2 className="relative mb-2 bg-gray-100 px-2 py-1 text-xl font-bold before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-amber-500">
        {category?.name} についての「うちあけ」
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
