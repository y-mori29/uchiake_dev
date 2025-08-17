import { Question } from "@/client";
import PostCategory from "@/components/new/PostCategory";
import PostTitle from "@/components/new/PostTitle";
import PostAnswer from "@/components/new/PostAnswer";
import { ArrowLeftIcon, ArrowRightIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import React, { useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/router";
import { CreatePostDto } from "@/client/models/CreatePostDto";
import Head from "next/head";
import { useApiClients } from "@/hooks/UseApiClients";

const phase1Question = "今回の「うちあけ」に\nタイトルをつけてください";
const phase1Placeholder = "5文字以上、20文字以内";

export default function Page() {
  const router = useRouter();
  const api = useApiClients();
  const [phase, setPhase] = React.useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);

  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<number | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    const call = async () => {
      const questions = await api.getQuestions();
      setQuestions(questions);
      setAnswers(new Array(questions.length).fill(""));
    };
    call();
  }, [api]);

  const sendPost = async () => {
    const createPostDto: CreatePostDto = {
      title,
      categoryId: category!,
      answers: questions.map((q, i) => {
        return {
          questionId: q.id,
          content: answers[i],
        };
      }),
    };
    await api.createPost(
      { createPostDto },
    );
    await router.push("/new/done");
  };

  const canMoveNext = useCallback(() => {
    if (phase === 0) {
      return category !== null;
    } else if (phase === 1) {
      return title.length >= 5 && title.length <= 20;
    } else if (phase >= 2 && phase < questions.length + 2) {
      return answers[phase - 2] && questions[phase - 2] && answers[phase - 2].length > questions[phase - 2].minimum;
    }
    return true;
  }, [answers, category, phase, questions, title]);

  const setAnswer = (n: number, answer: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[phase - 2] = answer;
      return next;
    });
  };

  return (
    <div className="relative flex h-[calc(100vh-48px)] w-full flex-col bg-gray-100">
      <Head>
        <title>「うちあけ」の投稿 | うちあけ</title>
      </Head>
      <div className="mb-6 flex items-center justify-center space-x-2 py-4">
        {new Array(phase).fill(0).map((_, i) => (
          <div key={i} className="size-4 rounded-full bg-gray-300"></div>
        ))}
        <div className="flex size-8 items-center justify-center rounded-full bg-amber-500 text-white">{phase + 1}</div>
        {new Array(questions.length - phase + 1).fill(0).map((_, i) => (
          <div key={i} className="size-4 rounded-full bg-gray-300"></div>
        ))}
      </div>

      <div className="w-full flex-1 overflow-auto">
        {phase === 0 && <PostCategory selectedCategory={category} onChange={setCategory} />}
        {phase === 1 && (
          <PostTitle question={phase1Question} placeholder={phase1Placeholder} value={title} onChange={setTitle} />
        )}
        {phase >= 2 && phase < questions.length + 2 && questions[phase - 2] && (
          <PostAnswer
            key={questions[phase - 2].id}
            question={questions[phase - 2]}
            answer={answers[phase - 2]}
            onChange={(answer) => {
              setAnswer(phase - 2, answer);
            }}
          />
        )}
      </div>

      <footer className="flex w-full items-center justify-between px-8 py-4">
        <button
          className={twMerge(
            "flex items-center justify-center rounded-full bg-amber-500 p-4 text-lg text-white",
            phase === 0 && "opacity-50",
          )}
          onClick={() => setPhase(phase - 1)}
          disabled={phase === 0}
        >
          <ArrowLeftIcon className="size-10" />
        </button>
        {phase === questions.length + 1 ? (
          <button
            className={twMerge(
              "flex items-center justify-center rounded-full bg-amber-500 p-4 text-lg text-white",
              !canMoveNext() && "opacity-50",
            )}
            disabled={!canMoveNext()}
            onClick={() => {
              sendPost();
            }}
          >
            <PaperAirplaneIcon className="size-10" />
          </button>
        ) : (
          <button
            className={twMerge(
              "flex items-center justify-center rounded-full bg-amber-500 p-4 text-lg text-white",
              !canMoveNext() && "opacity-50",
            )}
            disabled={!canMoveNext()}
            onClick={() => setPhase(phase + 1)}
          >
            <ArrowRightIcon className="size-10" />
          </button>
        )}
      </footer>
    </div>
  );
}
