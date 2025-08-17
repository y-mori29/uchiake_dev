import React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

export default function ProfilePage() {
  return (
    <div className="min-h-[calc(100vh-48px)]">
      <Head>
        <title>「うちあけ」とは | うちあけ</title>
      </Head>
      <div className="py-2">
        <header className="mb-8">
          <div
            className="relative mb-4 flex h-52 w-full flex-col items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url(/imgs/top.png)" }}
          >
            <h1 className="w-full bg-gray-300/80 py-4 text-center text-xl font-bold">
              あなたの病気体験
              <br />
              うちあけてみませんか？
            </h1>
          </div>
        </header>

        <main>
          <section className="mb-12">
            <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">
              病気体験を共有し
              <br />
              あなたと共に歩むサービス
            </h2>
          </section>

          <section className="mb-12">
            <h3 className="mx-4 mb-4 text-2xl font-semibold text-gray-800">―うちあけとは？</h3>
            <p className="px-10 text-center text-lg font-bold text-gray-700">
              病気の当事者が体験を共有し
              <br />
              他の患者さんの体験や努力を知り
              <br />
              共感や励ましを通じて
              <br />
              前向きな気持ちを育むコミュニティ
            </p>
          </section>

          <hr className="mx-10 mb-8 border-gray-300" />

          <section className="mx-auto mb-12 max-w-2xl px-4">
            <div className="mb-20 flex flex-row items-center justify-center space-x-2">
              <div>
                <h4 className="mb-2 text-xl font-bold text-gray-800">体験をうちあける</h4>
                <p className="text-gray-700">自分の病気体験・不安・不満を言葉にすることで自分の心が整理される</p>
              </div>
              <Image src="/imgs/about/tell.png" alt="Share Experience" className="size-32" width={128} height={128} />
            </div>

            <div className="mb-20 flex flex-row items-center justify-center space-x-2">
              <Image src="/imgs/about/find.png" alt="Find Patients" className="size-32" width={128} height={128} />
              <div>
                <h4 className="mb-2 text-xl font-bold text-gray-800">同じ境遇の患者さんを見つける</h4>
                <p className="text-gray-700">自分の経験をうちあけると「同じ境遇」「同じ疾患」を持つ人が見つかる</p>
              </div>
            </div>

            <div className="mb-20 flex flex-row items-center justify-center space-x-2">
              <div>
                <h4 className="mb-2 text-xl font-bold text-gray-800">コメント・リアクションで共感を</h4>
                <p className="text-gray-700">
                  「あなたは一人じゃない」「誰かも同じことを思っている」心のつながりを感じ、励まされたり励ましたり
                </p>
              </div>
              <Image
                src="/imgs/about/share.png"
                alt="Comment and Reaction"
                className="size-32"
                width={128}
                height={128}
              />
            </div>

            <div className="mb-20 flex flex-row items-center justify-center space-x-2">
              <Image
                src="/imgs/about/be_positive.png"
                alt="Grow Positive Feelings"
                className="size-32"
                width={128}
                height={128}
              />
              <div>
                <h4 className="mb-2 text-xl font-bold text-gray-800">前向きな気持ちを醸成</h4>
                <p className="text-gray-700">
                  自分の経験をうちあけると共感してもらえたり、同じ境遇の患者さんと出会えたり、気持ちが前向きになれるそんなサービス
                </p>
              </div>
            </div>
          </section>

          <Link
            href="/new/form"
            className="mx-auto block w-48 rounded-full bg-blue-600 px-4 py-2 text-center shadow-md text-white hover:bg-blue-700"
          >
            うちあけを書く
          </Link>
        </main>
      </div>
    </div>
  );
}
