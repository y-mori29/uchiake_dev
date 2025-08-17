import { Question } from "@/client";
import React from "react";

type PostAnswerProps = {
  question: Question;
  answer: string;
  onChange: (value: string) => void;
};

export default function PostAnswer({ question, answer, onChange }: PostAnswerProps) {
  return (
    <div className="flex w-full flex-col items-center px-4 py-8">
      <h1 className="mb-6 text-center text-lg font-semibold">{question?.content}</h1>

      <textarea
        className="h-32 w-full rounded border p-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
        placeholder={question?.description}
        value={answer}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
    </div>
  );
}
