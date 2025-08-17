import { twMerge } from "tailwind-merge";
import { UserIcon } from "@heroicons/react/24/solid";

export type GenderValue = "" | "MALE" | "FEMALE";

type PostGenderProps = {
  question: string;
  value: GenderValue;
  onChange: (gender: GenderValue) => void;
};

const MALE = "MALE";
const FEMALE = "FEMALE";

export default function GenderComponent({ question, value, onChange }: PostGenderProps) {
  return (
    <div className="flex w-full flex-col items-center px-4 py-8">
      <h1 className="mb-6 w-full whitespace-pre-wrap text-center text-lg font-semibold">{question}</h1>

      <div className="flex space-x-8">
        <div className={twMerge("flex cursor-pointer flex-col items-center space-y-4")} onClick={() => onChange(MALE)}>
          <div
            className={twMerge(
              "flex h-32 w-32 items-center justify-center rounded-full border-2 border-blue-300",
              value === MALE && "bg-blue-100",
            )}
          >
            <UserIcon className="size-16 text-blue-500" />
          </div>
          <button className={twMerge("text-lg font-bold text-black", value === MALE && "text-blue-500")}>男性</button>
        </div>

        <div
          className={twMerge("flex cursor-pointer flex-col items-center space-y-4")}
          onClick={() => onChange(FEMALE)}
        >
          <div
            className={twMerge(
              "flex h-32 w-32 items-center justify-center rounded-full border-2 border-pink-300",
              value === FEMALE && "bg-pink-100",
            )}
          >
            <UserIcon className="size-16 text-pink-500" />
          </div>
          <button className={twMerge("text-lg font-bold text-black", value === FEMALE && "text-pink-500")}>女性</button>
        </div>
      </div>
    </div>
  );
}
