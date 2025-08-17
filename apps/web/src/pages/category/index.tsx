import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Category } from "@/client";
import Head from "next/head";
import { useApiClients } from "@/hooks/UseApiClients";

export default function Home() {
  const api = useApiClients();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const call = async () => {
      setCategories(await api.getCategories());
    };
    call();
  }, []);

  return (
    <div className="min-h-[calc(100vh-48px)]">
      <Head>
        <title>ジャンルから調べる | うちあけ</title>
      </Head>
      <main className="py-2">
        <section className="mb-4">
          <h2
            id="categories"
            className="relative m-2 bg-gray-100 px-2 py-1 text-xl font-bold before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-amber-500"
          >
            ジャンルから調べる
          </h2>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {categories.map((category, index) => (
              <Link href={`/category/${category.id}`} key={index} className="mb-2 flex flex-col items-center">
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
      </main>
    </div>
  );
}
