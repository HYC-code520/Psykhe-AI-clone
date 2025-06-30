import { cn } from "@/lib/utils";

interface Option {
  id: string;
  text: string;
  color: string;
  trait: string;
  score: number;
}

interface QuestionCardProps {
  option: Option;
  isSelected: boolean;
  onToggle: () => void;
}

export default function QuestionCard({ option, isSelected, onToggle }: QuestionCardProps) {
  return (
    <div
      className={cn(
        "card-hover cursor-pointer p-6 rounded-xl text-white text-center min-h-[120px] flex flex-col justify-center",
        isSelected && "card-selected"
      )}
      style={{ backgroundColor: option.color }}
      onClick={onToggle}
    >
      <span className="font-medium text-sm leading-tight">
        {option.text}
      </span>
    </div>
  );
}
