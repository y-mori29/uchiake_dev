import Head from "next/head";
import React from "react";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100vh-48px)] flex-col items-center justify-center p-4 text-gray-800">
      <Head>
        <title>Not Found | うちあけ</title>
      </Head>
      <h1 className="mb-4 text-6xl font-extrabold">404</h1>
      <p className="mb-2 text-xl font-medium">Page Not Found</p>
      <p className="mb-8 text-base text-gray-600">
        お探しのページが見つかりませんでした。URLが正しいことを確認してください。
      </p>
      <button
        onClick={() => window.history.back()}
        className="rounded-lg bg-amber-500 px-4 py-2 text-white shadow-md transition-all duration-300 ease-in-out hover:bg-amber-600"
      >
        戻る
      </button>
    </div>
  );
}
