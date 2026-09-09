import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 40 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
    >
      <rect width="48" height="48" rx="12" fill="#0F172A" />
      <path
        d="M12 24H18L21 16L27 32L30 24H36"
        stroke="#EF4444"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="2.5" fill="#38BDF8" className="animate-pulse" />
      <path
        d="M24 10C16 10 10 16 10 23C10 31 24 38 24 38C24 38 38 31 38 23C38 16 32 10 24 10Z"
        stroke="#EF4444"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
    </svg>
  );
};
