import { CreateSubPostDto, SubQuestionDto } from "@/client";
import PostTitle from "@/components/new/PostTitle";
import PostAnswer from "@/components/new/PostAnswer";
import { ArrowLeftIcon, ArrowRightIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import React, { useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/router";
import PostSelect from "@/components/new/PostSelect";
import Head from "next/head";
import { useApiClients } from "@/hooks/UseApiClients";

const phase1Question = "タイトルを教えて下さい(仮)";
const phase1Placeholder = "5文字以上、20文字以内";

export default function Page() {
  const router = useRouter();
  const api = useApiClients();
  const [phase, setPhase] = React.useState(0);
  const [subQuestions, setSubQuestions] = useState<SubQuestionDto[]>([]);

  const [title, setTitle] = useState<string>("");
  const [post, setPost] = useState<string>("");
  const [subAnswers, setSubAnswers] = useState<string[]>([]);

  useEffect(() => {
    const call = async () => {
      const subQuestions = await api.getSubQuestions();
      setSubQuestions(subQuestions);
      setSubAnswers(new Array(subQuestions.length).fill(""));
    };
    call();
  }, []);

  const sendPost = async () => {
    const createSubPostDto: CreateSubPostDto = {
      title,
      postId: post,
      subAnswers: subQuestions.map((q, i) => {
        return {
          subQuestionId: q.id,
          content: subAnswers[i],
        };
      }),
    };
    await api.createSubPost(
      { createSubPostDto },
    );
    await router.push("/new/done");
  };

  const canMoveNext = useCallback(() => {
    if (phase === 0) {
      return post !== "";
    } else if (phase === 1) {
      return title.length >= 5 && title.length <= 20;
    } else if (phase >= 2 && phase < subQuestions.length + 2) {
      return (
        subAnswers[phase - 2] &&
        subQuestions[phase - 2] &&
        subAnswers[phase - 2].length > subQuestions[phase - 2].minimum
      );
    }
    return true;
  }, [subAnswers, post, phase, subQuestions, title]);

  const setAnswer = (n: number, answer: string) => {
    setSubAnswers((prev) => {
      const next = [...prev];
      next[phase - 2] = answer;
      return next;
    });
  };

  return (
    <div className="relative flex h-[calc(100vh-48px)] w-full flex-col">
      <Head>
        <title>ストーリーの投稿 | うちあけ</title>
      </Head>
      <div className="mb-6 flex items-center justify-center space-x-2 py-4">
        {new Array(phase).fill(0).map((_, i) => (
          <div key={i} className="size-4 rounded-full bg-gray-300"></div>
        ))}
        <div className="flex size-8 items-center justify-center rounded-full bg-amber-500 text-white">{phase + 1}</div>
        {new Array(subQuestions.length - phase + 1).fill(0).map((_, i) => (
          <div key={i} className="size-4 rounded-full bg-gray-300"></div>
        ))}
      </div>

      <div className="w-full flex-1 overflow-auto">
        {phase === 0 && <PostSelect value={post} onChange={setPost} />}
        {phase === 1 && (
          <PostTitle question={phase1Question} placeholder={phase1Placeholder} value={title} onChange={setTitle} />
        )}
        {phase >= 2 && phase < subQuestions.length + 2 && subQuestions[phase - 2] && (
          <PostAnswer
            key={subQuestions[phase - 2].id}
            question={subQuestions[phase - 2]}
            answer={subAnswers[phase - 2]}
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
        {phase === subQuestions.length + 1 ? (
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
