import PostComponent from "@/components/PostComponent";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Category, PostPreview } from "@/client";
import Head from "next/head";
import { useApiClients } from "@/hooks/UseApiClients";
import { useRouter } from "next/router";
import { useAuth0 } from "@auth0/auth0-react";
import useRegisterRequiredModal from "@/hooks/UseRegisterRequiredModal";

export default function Home() {
  const [posts, setPosts] = useState<PostPreview[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const api = useApiClients();
  const router = useRouter();
  const { isAuthenticated } = useAuth0();
  const { openRegisterModal } = useRegisterRequiredModal();

  useEffect(() => {
    const call = async () => {
      setPosts(await api.getPostPreviews());
      setCategories(await api.getCategories());
    };
    call();
  }, []);

  const handleScrollToCategories = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("categories");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePostCreate = async () => {
    if (!isAuthenticated) {
      openRegisterModal("うちあけを書き込む");
      return;
    }
    await router.push("/new/form");
  };

  return (
    <div className="min-h-[calc(100vh-48px)]">
      <Head>
        <title>Top | うちあけ</title>
      </Head>
      <main className="py-2">
        {/* Hero セクション */}
        <div
          className="relative mb-4 flex h-52 w-full flex-col items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url(/imgs/top.png)" }}
        >
          <h1 className="mb-4 w-full bg-gray-300/80 py-4 text-center text-xl font-bold">
            あなたの病気体験
            <br />
            うちあけてみませんか？
          </h1>
        </div>

        {/* アイコンナビゲーション */}
        <section className="mb-6">
          <div className="flex justify-around px-4">
            {/* ジャンルから調べる */}
            <Link
              href="/"
              scroll={false}
              onClick={handleScrollToCategories}
              className="flex flex-col items-center space-y-1"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-md">
                <Image
                  src="/imgs/icons/SearchFromGenre.png"
                  alt="ジャンルから調べる"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-sm font-medium">ジャンルから調べる</span>
            </Link>

            {/* キーワード検索 */}
            <Link href="/search" className="flex flex-col items-center space-y-1">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-md">
                <Image
                  src="/imgs/icons/SearchFromKeyword.png"
                  alt="キーワード検索"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-sm font-medium">キーワード検索</span>
            </Link>

            {/* 最新の投稿を見る */}
            <Link href="/post" className="flex flex-col items-center space-y-1">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-md">
                <Image
                  src="/imgs/icons/SeeLatestPosts.png"
                  alt="最新の投稿を見る"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-sm font-medium">最新の投稿を見る</span>
            </Link>
            {/* 自分のうちあけを投稿 */}
            <button
              onClick={handlePostCreate}
              className="flex flex-col items-center space-y-1"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-md">
                <Image
                  src="/imgs/icons/Post.png"
                  alt="自分のうちあけを投稿"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-sm font-medium">自分のうちあけを投稿</span>
            </button>
          </div>
        </section>


        {/* 最新投稿リスト */}
        <section className="mb-4">
          <h2
            id="latest-posts"
            className="relative m-2 bg-gray-100 px-2 py-1 text-xl font-bold before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-amber-500"
          >
            <Link href="/post">最新の「うちあけ」</Link>
          </h2>
          <div className="space-y-2 px-2">
            {posts.map((post, index) => (
              <PostComponent post={post} key={index} />
            ))}
          </div>
        </section>

        {/* ジャンル一覧 */}
        <section className="mb-4" id="categories">
          <h2
            className="relative m-2 bg-gray-100 px-2 py-1 text-xl font-bold before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-amber-500"
          >
            <Link href="/category">ジャンルから調べる</Link>
          </h2>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {categories.map((category, index) => (
              <Link
                href={`/category/${category.id}`}
                key={index}
                className="mb-2 flex flex-col items-center"
              >
                <Image
                  className="mb-1 size-12 rounded-full border border-gray-300 shadow-md"
                  src={category.image}
                  alt={category.name}
                  width={48}
                  height={48}
                />
                <p className="text-center text-sm font-bold">{category.name}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-6 mt-10">
          <h2 className="relative m-2 bg-gray-100 px-2 py-1 text-xl font-bold before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-amber-500">
            うちあけ
          </h2>
          <div
            className="relative mb-4 flex h-52 w-full flex-col items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url(/imgs/top.png)" }}
          >
            <h1 className="w-full bg-gray-300/80 py-4 text-center text-xl font-bold">
              病気体験を共有し
              <br />
              あなたと共に歩むサービス
            </h1>
          </div>

          <div className="mb-12">
            <h3 className="mx-4 mb-4 text-lg font-semibold text-gray-800">―「うちあけ」とは？</h3>
            <p className="px-10 text-center font-bold text-gray-700">
              病気の当事者が体験を共有し
              <br />
              他の患者さんの体験や努力を知り
              <br />
              共感や励ましを通じて
              <br />
              前向きな気持ちを育むコミュニティ
            </p>
          </div>

          <div className="mb-12">
            <h3 className="mx-4 mb-4 text-lg font-semibold text-gray-800">―「うちあけ」でできること</h3>
            <div className="flex justify-center font-semibold">
              <ul className="list-disc px-10 text-gray-700">
                <li>自分の病気や症状の体験をうちあける</li>
                <li>他のユーザーから共感される</li>
                <li>同じ境遇の患者さんと情報交換</li>
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="mx-4 mb-4 text-lg font-semibold text-gray-800">―「うちあけ」にかける想い</h3>
            {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
            <div className="font-zen mx-auto max-w-2xl rounded-lg bg-amber-50 px-4 py-2 text-center text-xs font-bold text-gray-700 shadow-md md:text-base">
              <p className="mb-2 border-b-2 border-dashed">私は薬剤師として患者さんに服薬指導をしていた時のこと</p>
              <p className="mb-2 border-b-2 border-dashed">処方箋通りの薬を出して、説明して、少しだけ会話をして</p>
              <p className="mb-2 border-b-2 border-dashed">「お大事に」と言って、お会計をする。この間１分</p>
              <p className="mb-2 border-b-2 border-dashed">患者さんの話をじっくり聞くことはほとんどない。</p>
              <p className="mb-2 border-b-2 border-dashed">なぜなら、他の患者さんも待ってるし、上司に怒られる</p>
              <p className="mb-2 border-b-2 border-dashed">ある患者さんに言われた。「もっとゆっくり話がしたい」</p>
              <p className="mb-2 border-b-2 border-dashed">患者さんは「もっと話したい」「聞いてほしい」</p>
              <p className="mb-2 border-b-2 border-dashed">自分の中にある不安な気持ち、不満、大変なことを</p>
              <p className="mb-2 border-b-2 border-dashed">共感してほしい、分かってほしい、そう思ってると</p>
              <p className="mb-2 border-b-2 border-dashed">私は、薬剤師の経験から「患者さんの体験を話せる」</p>
              <p className="mb-2 border-b-2 border-dashed">そんなサービスを作りました。</p>
              <p className="mb-2 border-b-2 border-dashed">ここにくれば誰かがいる。共感してくれる。</p>
              <p className="mb-2 border-b-2 border-dashed">メッセージが来る</p>
              <p className="mb-2 border-b-2 border-dashed">励みになる。元気になる。他の頑張ってる人がいる。</p>
              <p className="mb-2 border-b-2 border-dashed">「うちあけ」なら自分の思っていること、不安、不満、</p>
              <p className="mb-2 border-b-2 border-dashed">なんでもうちあけてOK</p>
              <p className="mb-2 border-b-2 border-dashed">あなたの当事者としての病気の経験、</p>
              <p className="mb-2 border-b-2 border-dashed">うちあけてみませんか？</p>
              <p className="mb-2 border-b-2 border-dashed text-right">株式 会社メディキャンバス 副田</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
