interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full h-2 bg-gray-200">
      <div 
        className="h-full progress-fill transition-all duration-300 ease-out" 
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </div>
  );
}
