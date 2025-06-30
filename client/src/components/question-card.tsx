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
  index: number;
  totalOptions: number;
}

export default function QuestionCard({ option, isSelected, onToggle, index, totalOptions }: QuestionCardProps) {
  // Calculate gradient based on position - top button more green, bottom button more purple
  const getGradientColors = () => {
    const ratio = index / (totalOptions - 1); // 0 for first, 1 for last
    
    // Green to purple gradient points
    const startColor = `hsl(${120 - ratio * 60}, 70%, 60%)`; // Green (120°) to blue-purple (60°)
    const endColor = `hsl(${280 - ratio * 40}, 70%, 55%)`; // Light purple (280°) to deep purple (240°)
    
    return `linear-gradient(135deg, ${startColor}, ${endColor})`;
  };

  return (
    <div
      className={cn(
        "card-hover cursor-pointer px-16 py-4 rounded-xl text-white text-center w-full flex items-center justify-center min-w-full",
        isSelected && "card-selected ring-2 ring-white ring-offset-2"
      )}
      style={{ background: getGradientColors() }}
      onClick={onToggle}
    >
      <span className="font-medium text-sm leading-tight">
        {option.text}
      </span>
    </div>
  );
}
