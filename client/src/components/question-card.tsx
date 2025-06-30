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
    
    // Define specific colors for the gradient spectrum to match the reference
    const gradients = [
      'linear-gradient(135deg, #a8e6cf 0%, #7fcdcd 100%)', // Light green to teal
      'linear-gradient(135deg, #7fcdcd 0%, #4fc3f7 100%)', // Teal to light blue
      'linear-gradient(135deg, #4fc3f7 0%, #3f51b5 100%)', // Light blue to blue
      'linear-gradient(135deg, #3f51b5 0%, #7b1fa2 100%)', // Blue to purple
      'linear-gradient(135deg, #7b1fa2 0%, #c2185b 100%)', // Purple to magenta
    ];
    
    // If we have specific gradients, use them; otherwise calculate dynamically
    if (totalOptions <= gradients.length) {
      const gradientIndex = Math.round(ratio * (gradients.length - 1));
      return gradients[gradientIndex];
    }
    
    // Fallback to calculated gradient for more than 5 options
    const baseHue = 120 + (ratio * 180);
    const saturation = 75;
    const lightColor = `hsl(${baseHue}, ${saturation}%, 70%)`;
    const darkColor = `hsl(${baseHue}, ${saturation}%, 50%)`;
    
    return `linear-gradient(135deg, ${lightColor} 0%, ${darkColor} 100%)`;
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
