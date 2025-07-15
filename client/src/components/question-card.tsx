import { cn } from "@/lib/utils";

interface Option {
  id: string;
  text: string;
  color: string;
  trait: string;
  score: number;
  image?: string;
}

interface QuestionCardProps {
  option: Option;
  isSelected: boolean;
  onToggle: () => void;
  index: number;
  totalOptions: number;
  isMultiSelect?: boolean;
}

export default function QuestionCard({ option, isSelected, onToggle, index, totalOptions, isMultiSelect }: QuestionCardProps) {
  return (
    <div
      className={cn(
        "card-hover cursor-pointer px-8 py-4 rounded-none text-black w-full flex items-center justify-center transition-all duration-200 border border-black bg-white hover:bg-gray-50 max-w-4xl mx-auto",
        isSelected && "text-white border-none"
      )}
      style={{ 
        backgroundImage: isSelected ? "url('/attached_assets/button-background.png')" : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "all 0.2s ease"
      }}
      onClick={onToggle}
    >
      {/* Render image if present */}
      {option.image && (
        <img
          src={option.image}
          alt="option visual"
          className="w-14 h-14 rounded-full object-cover mr-4 select-none border-0 bg-transparent"
          style={{ boxShadow: 'none' }}
        />
      )}
      {/* Render checkbox for multi-select */}
      {isMultiSelect && (
        <input
          type="checkbox"
          checked={isSelected}
          readOnly
          className="mr-4 w-6 h-6 flex-shrink-0 accent-blue-500 cursor-pointer"
          tabIndex={-1}
        />
      )}
      <span className={cn(
        "text-lg leading-relaxed text-center uppercase tracking-wider",
        !isSelected && "font-normal",
        isSelected && "font-medium"
      )}>
        {option.text}
      </span>
    </div>
  );
}
