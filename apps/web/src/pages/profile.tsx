import { PostPreview, ResponseError, UserProfile } from "@/client";
import PostComponent from "@/components/PostComponent";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useApiClients } from "@/hooks/UseApiClients";
import { useAuth0 } from "@auth0/auth0-react";

export default function ProfilePage() {
  const router = useRouter();
  const api = useApiClients();

  const [user, setUser] = useState<UserProfile | null>(null);
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    const call = async () => {

      if (!isAuthenticated) {
        await router.push("/");
      }

      try {
        const result = await api.getProfile();
        setUser(result);
      } catch (e) {
        if (e instanceof ResponseError && e.response?.status === 404) {
          await router.push("/register/start");
        }
      }
    };
    call();
  }, []);

  return (
    <div className="min-h-[calc(100vh-48px)]">
      <Head>
        <title>プロフィール | うちあけ</title>
      </Head>
      <div className="mx-auto w-full bg-white p-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center rounded-full">
            <UserCircleIcon className="size-20" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-gray-600">年齢: {user?.age}歳</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-lg font-semibold">あなたのストーリー</p>
          <div className="mt-2 text-gray-700">
            <p>「うちあけ」投稿数: {user?.postCount}件</p>
            <p>あなたの投稿したコメント数: {user?.commentCount}件</p>
            <div>
              <p>あなたのもらった</p>
              <p className={"ml-4"}>コメント: {user?.refCommentCount}件</p>
              <p className={"ml-4"}>いいね: {user?.refFeedbackCounts?.find(x => x.kind === "GOOD")?.count || 0}件</p>
              <p
                className={"ml-4"}>がんばれ: {user?.refFeedbackCounts?.find(x => x.kind === "CHEER")?.count || 0}件</p>
            </div>
          </div>
        </div>

        <section className="mt-6">
          <p className="text-lg font-semibold">あなたのストーリー履歴</p>
          <div className="space-y-2 px-1">
            {user?.posts.map((post: PostPreview) => <PostComponent post={post} key={post.id} />)}
          </div>
        </section>

        <section className="mb-4 mt-6">
          <div className="flex flex-col items-center space-y-2 px-2 py-1">
            <Link href="/new/form">
              <div className="rounded-full bg-amber-600 px-4 py-2 text-sm text-white shadow-md">
                あなたの「うちあけ」を投稿
              </div>
            </Link>
            <Link href="/newsub/form">
              <div className="rounded-full bg-amber-600 px-4 py-2 text-sm text-white shadow-md">
                あなたの「うちあけ」の続きを投稿
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
