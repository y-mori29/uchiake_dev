import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function New1Page() {
  return (
    <div className="relative flex h-[calc(100vh-48px)] flex-col items-start overflow-hidden bg-gray-100">
      <Head>
        <title>ストーリーの投稿 | うちあけ</title>
      </Head>

      <div className="ml-8 mt-16 rounded-full bg-amber-500 px-8 py-2 text-2xl font-bold text-white">完了</div>

      <h2 className="ml-7 mt-8 text-left text-4xl font-semibold text-gray-800">
        書き込み完了です
        <br />
        お疲れ様でした！
      </h2>

      <div
        className="absolute rounded-full bg-amber-500"
        style={{
          width: "250vw",
          height: "250vw",
          top: "50vh",
          left: "-75vw",
        }}
      />
      <div className="absolute flex w-full flex-col items-center" style={{ bottom: "10vh" }}>
        <div className="overflow-hidden rounded-lg">
          <img src="https://via.placeholder.com/150" alt="Placeholder" className="fill-current" />
        </div>
        <Link
          href="/"
          className="mt-6 w-11/12 max-w-md rounded-full bg-gray-100 px-8 py-2 text-center text-base font-bold shadow-md hover:bg-gray-300"
        >
          みんなの「うちあけ」を見る
        </Link>
      </div>
    </div>
  );
}
