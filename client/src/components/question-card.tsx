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
  // Calculate gradient colors based on position - green to purple progression
  const getButtonGradient = () => {
    const ratio = totalOptions > 1 ? index / (totalOptions - 1) : 0; // 0 for first, 1 for last
    
    // Color progression: Green (120°) → Blue-Green (180°) → Blue (240°) → Blue-Purple (270°) → Purple (300°)
    const baseHue = 120 + (ratio * 180); // 120° to 300°
    const saturation = 70;
    
    // Create a subtle gradient from lighter to darker shade
    const lightColor = `hsl(${baseHue}, ${saturation}%, 65%)`;
    const darkColor = `hsl(${baseHue}, ${saturation + 10}%, 45%)`;
    
    return `linear-gradient(135deg, ${lightColor} 0%, ${darkColor} 100%)`;
  };

  return (
    <div
      className={cn(
        "card-hover cursor-pointer px-16 py-4 rounded-xl text-white text-center w-full flex items-center justify-center min-w-full transition-all duration-200",
        isSelected && "ring-2 ring-white ring-offset-2 scale-105"
      )}
      style={{ background: getButtonGradient() }}
      onClick={onToggle}
    >
      <span className="font-medium text-sm leading-tight">
        {option.text}
      </span>
    </div>
  );
}
