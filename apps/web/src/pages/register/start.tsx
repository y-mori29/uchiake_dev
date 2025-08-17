import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Start() {
  return (
    <div className="relative flex h-[calc(100vh-48px)] w-full flex-col items-start overflow-hidden bg-gray-100">
      <Head>
        <title>ユーザー登録 | うちあけ</title>
      </Head>
      <div className="ml-8 mt-16 rounded-full bg-amber-500 px-8 py-2 text-2xl font-bold text-white">Step 1</div>

      <div
        className="absolute rounded-full bg-amber-500"
        style={{
          width: "250vw",
          height: "250vw",
          top: "50vh",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <div className="absolute z-10 w-full" style={{ top: "25vh" }}>
        <h2 className="ml-7 text-left text-3xl font-semibold text-gray-800">
          まず、あなたのことを
          <br />
          教えてください
        </h2>
      </div>

      <div className="absolute flex w-full flex-col items-center" style={{ bottom: "10vh" }}>
        <div className="overflow-hidden rounded-lg">
          <Image 
            src="/imgs/register/before_registration.png" 
            alt="writing and reading about health" 
            className="fill-current" 
            width={500}
            height={500}
            style={{ width: "50vw", height: "auto", maxWidth: "500px" }}
          />
        </div>
        <Link
          href="/register/form"
          className="mt-6 w-11/12 max-w-md rounded-full bg-gray-100 px-8 py-2 text-center text-base font-bold shadow-md hover:bg-gray-300"
        >
          次へ
        </Link>
      </div>
    </div>
  );
}
