import Link from "next/link";

type PostConsentProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export default function ConsentComponent({ value, onChange }: PostConsentProps) {
  return (
    <div className="flex w-full flex-col items-center py-8 px-4">
      <div className="flex flex-col items-center justify-center">
        <img src="/imgs/logo.png" alt="Patient Voice Logo" className="mb-4 size-48" />
      </div>

      <div className="mt-8 flex items-center justify-center">
        <input 
          type="checkbox"
          id="consent"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="mr-2 size-6"
        />
        <label htmlFor="consent" className="text-lg font-medium"><Link href="/terms" className="text-blue-500 underline">利用規約</Link>に同意します</label>
      </div>
    </div>
  );
}
  