import { ChangeEvent } from "react";

type PostTitleProps = {
  question: string;
  placeholder: string;
  value: string;
  onChange: (title: string) => void;
};

export default function PostTitle({ question, placeholder, value, onChange }: PostTitleProps) {
  return (
    <div className="flex w-full flex-col items-center px-4 py-8">
      <h1 className="mb-6 w-full whitespace-pre-wrap text-center text-lg font-semibold">{question}</h1>

      <input
        type="text"
        className="w-full rounded border p-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        value={value}
      ></input>
    </div>
  );
}
