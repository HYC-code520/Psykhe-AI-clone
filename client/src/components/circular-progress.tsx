interface CircularProgressProps {
  progress: number;
  children: React.ReactNode;
}

export default function CircularProgress({ progress, children }: CircularProgressProps) {
  const radius = 200;
  const strokeWidth = 4;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={radius * 2}
        height={radius * 2}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="text-gray-200"
        />
        {/* Progress circle with gradient */}
        <circle
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{
            strokeDasharray,
            strokeDashoffset,
            transition: 'stroke-dashoffset 0.5s ease-in-out',
          }}
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--psykhe-purple)" />
            <stop offset="50%" stopColor="var(--psykhe-gradient-blue)" />
            <stop offset="100%" stopColor="var(--psykhe-green)" />
          </linearGradient>
        </defs>
        {/* Progress dots */}
        {Array.from({ length: 8 }).map((_, index) => {
          const angle = (index * 360) / 8;
          const dotRadius = normalizedRadius;
          const dotX = radius + dotRadius * Math.cos((angle * Math.PI) / 180);
          const dotY = radius + dotRadius * Math.sin((angle * Math.PI) / 180);
          const currentProgress = (progress / 100) * 8;
          const isActive = index < currentProgress;
          
          return (
            <circle
              key={index}
              cx={dotX}
              cy={dotY}
              r="3"
              fill={isActive ? "white" : "transparent"}
              stroke={isActive ? "currentColor" : "currentColor"}
              strokeWidth="1"
              className={isActive ? "text-gray-600" : "text-gray-300"}
            />
          );
        })}
      </svg>
      
      {/* Content in the center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-xs text-center px-8">
          {children}
        </div>
      </div>
    </div>
  );
}