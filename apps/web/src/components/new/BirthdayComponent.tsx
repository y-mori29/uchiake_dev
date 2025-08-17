type PostBirthdayProps = {
  question: string;
  value: string;
  onChange: (title: string) => void;
};

export default function BirthdayComponent({ question, value, onChange }: PostBirthdayProps) {
  return (
    <div className="flex w-full flex-col items-center px-4 py-8">
      <h1 className="mb-6 w-full whitespace-pre-wrap text-center text-lg font-semibold">{question}</h1>

      <input
        type="date"
        id="date"
        name="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
    </div>
  );
}
