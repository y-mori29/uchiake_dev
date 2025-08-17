import { Category } from "@/client";
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useApiClients } from "@/hooks/UseApiClients";

type PostCategoryProps = {
  selectedCategory: number | null;
  onChange: (category: number | null) => void;
};

export default function PostCategory({ selectedCategory, onChange }: PostCategoryProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const api = useApiClients();

  useEffect(() => {
    const call = async () => {
      setCategories(await api.getCategories());
    };
    call();
  }, []);

  return (
    <div className="flex w-full flex-col items-center px-4 py-8">
      <h1 className="mb-6 text-center text-lg font-semibold">
        あなたが書き込む
        <br />
        病気の種類を教えてください
      </h1>

      <div className="flex w-full max-w-2xl">
        <div className="flex grow flex-wrap space-x-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className={twMerge(
                "mb-4 w-2/5 grow rounded bg-gray-100 p-2 text-center shadow",
                selectedCategory === category.id && "bg-amber-500 text-white",
              )}
              onClick={() => onChange(category.id)}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
