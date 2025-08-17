import { UserCreate } from "@/client";
import Birthday from "@/components/new/BirthdayComponent";
import GenderComponent, { GenderValue } from "@/components/new/GenderComponent";
import PostTitle from "@/components/new/PostTitle";
import { ArrowLeftIcon, ArrowRightIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useApiClients } from "@/hooks/UseApiClients";
import ConsentComponent from "@/components/new/ConsentComponent";

const phase1Question = "あなたの性別を\n教えてください";
const phase2Question = "あなたの生まれた日を教えてください";
const phase3Question = "あなたのニックネームを\n決めましょう";
const phase3Placeholder = "3文字以上20文字以内";

export default function ProfilePage() {
  const router = useRouter();
  const api = useApiClients();

  const [phase, setPhase] = React.useState(0);
  const [consent, setConsent] = useState(false);
  const [gender, setGender] = useState<GenderValue>("");
  const [birthday, setBirthday] = useState<string>("1980-01-01");
  const [nickname, setNickname] = useState<string>("");

  const handlePrev = () => {
    if (phase === 0) {
      router.push("/register/start");
    } else {
      setPhase(phase - 1);
    }
  };

  const sendPost = async () => {
    const userCreate: UserCreate = {
      name: nickname,
      birthday,
      gender,
    };
    await api.createUser(
      { userCreate },
    );
    await router.push("/new/start");
  };

  const canMoveNext = useCallback(() => {
    if (phase === 0) {
      return consent;
    } else if (phase === 1) {
      return gender !== "";
    } else if (phase === 2) {
      return birthday !== "";
    } else if (phase === 3) {
      return nickname.length >= 3 && nickname.length <= 20;
    }
    return true;
  }, [birthday, consent, gender, nickname.length, phase]);

  return (
    <div className="relative flex h-[calc(100vh-48px)] w-full flex-col bg-gray-100">
      <Head>
        <title>ユーザー登録 | うちあけ</title>
      </Head>
      <div className="mb-6 flex items-center justify-center space-x-2 py-4">
        {new Array(phase).fill(0).map((_, i) => (
          <div key={i} className="size-4 rounded-full bg-gray-300"></div>
        ))}
        <div className="flex size-8 items-center justify-center rounded-full bg-amber-500 text-white">{phase + 1}</div>
        {new Array(4 - phase - 1).fill(0).map((_, i) => (
          <div key={i} className="size-4 rounded-full bg-gray-300"></div>
        ))}
      </div>

      <div className="w-full flex-1 overflow-auto">
        {phase === 0 && <ConsentComponent value={consent} onChange={setConsent} />}
        {phase === 1 && <GenderComponent question={phase1Question} value={gender} onChange={setGender} />}
        {phase === 2 && <Birthday question={phase2Question} value={birthday} onChange={setBirthday} />}
        {phase === 3 && (
          <PostTitle
            question={phase3Question}
            placeholder={phase3Placeholder}
            value={nickname}
            onChange={setNickname}
          />
        )}
      </div>

      <footer className="flex w-full items-center justify-between px-8 py-4">
        <button
          className={twMerge(
            "flex items-center justify-center rounded-full bg-amber-500 p-4 text-lg text-white"
          )}
          onClick={handlePrev}
        >
          <ArrowLeftIcon className="size-10" />
        </button>
        {phase === 3 ? (
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
