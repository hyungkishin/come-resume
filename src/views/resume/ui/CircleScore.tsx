'use client';

interface CircleScoreProps {
  score: number;
  size?: number;
  label?: string;
}

export function CircleScore({ score, size = 96, label }: CircleScoreProps) {
  const stroke =
    score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';
  const circumference = 2 * Math.PI * 40;
  const dashArray = `${score * 2.51} 251`;

  return (
    <div className="flex flex-col items-center">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        aria-label={label ? `${label}: ${score}점` : `점수: ${score}점`}
        role="img"
      >
        <title>{label ? `${label}: ${score}점` : `점수: ${score}점`}</title>
        <circle cx="50" cy="50" r="40" fill="none" stroke="#27272a" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={stroke}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={dashArray}
          transform="rotate(-90 50 50)"
        />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-zinc-50"
          fontSize="24"
          fontWeight="bold"
        >
          {score}
        </text>
      </svg>
      {label && <p className="mt-1 text-xs text-zinc-400">{label}</p>}
    </div>
  );
}
