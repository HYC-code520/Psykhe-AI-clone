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
  // Calculate gradient colors based on position using theme colors
  const getButtonGradient = () => {
    const ratio = totalOptions > 1 ? index / (totalOptions - 1) : 0; // 0 for first, 1 for last
    
    // Use the same color scheme as the footer gradient for consistency
    // Purple -> Blue -> Green progression matching the theme
    const themeColors = {
      purple: 'hsl(295, 71%, 56%)',
      gradientBlue: 'hsl(207, 73%, 57%)', 
      green: 'hsl(84, 60%, 67%)',
      purpleLight: 'hsl(295, 71%, 70%)',
      blueLight: 'hsl(207, 73%, 70%)',
      greenLight: 'hsl(84, 60%, 80%)'
    };
    
    // Create gradients that transition through the theme spectrum
    if (ratio <= 0.25) {
      // First quarter: Green variations
      return `linear-gradient(135deg, ${themeColors.greenLight} 0%, ${themeColors.green} 100%)`;
    } else if (ratio <= 0.5) {
      // Second quarter: Green to Blue
      return `linear-gradient(135deg, ${themeColors.green} 0%, ${themeColors.blueLight} 100%)`;
    } else if (ratio <= 0.75) {
      // Third quarter: Blue variations
      return `linear-gradient(135deg, ${themeColors.blueLight} 0%, ${themeColors.gradientBlue} 100%)`;
    } else {
      // Last quarter: Blue to Purple
      return `linear-gradient(135deg, ${themeColors.gradientBlue} 0%, ${themeColors.purple} 100%)`;
    }
  };

  return (
    <div
      className={cn(
        "card-hover cursor-pointer px-8 py-5 rounded-3xl text-white text-center w-full flex items-center justify-center min-w-full transition-all duration-200 shadow-lg hover:shadow-xl",
        isSelected && "ring-2 ring-white ring-offset-2 scale-105"
      )}
      style={{ background: getButtonGradient() }}
      onClick={onToggle}
    >
      <span className="font-medium text-base leading-relaxed">
        {option.text}
      </span>
    </div>
  );
}
