import React from 'react';

interface BotanicalDividerProps {
  className?: string;
}

const BotanicalDivider = ({ className = '' }: BotanicalDividerProps) => {
  return (
    <div className={`flex items-center justify-center py-10 md:py-14 ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 400 40"
        className="w-[280px] md:w-[360px] h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left line */}
        <line x1="0" y1="20" x2="150" y2="20" stroke="#abbdb1" strokeWidth="1" opacity="0.4" />
        
        {/* Central leaf motif */}
        <g transform="translate(200, 20)" opacity="0.5">
          {/* Stem */}
          <line x1="-50" y1="0" x2="50" y2="0" stroke="#abbdb1" strokeWidth="1" />
          
          {/* Left leaves */}
          <path d="M-20,-1 Q-28,-12 -18,-14 Q-14,-6 -12,-1" fill="#abbdb1" opacity="0.6" />
          <path d="M-10,-1 Q-16,-10 -8,-12 Q-5,-5 -4,-1" fill="#abbdb1" opacity="0.5" />
          
          {/* Center leaf (upward) */}
          <path d="M-2,-1 Q0,-16 2,-1" fill="#E5B86E" opacity="0.5" />
          
          {/* Right leaves */}
          <path d="M10,-1 Q16,-10 8,-12 Q5,-5 4,-1" fill="#abbdb1" opacity="0.5" />
          <path d="M20,-1 Q28,-12 18,-14 Q14,-6 12,-1" fill="#abbdb1" opacity="0.6" />
        </g>

        {/* Right line */}
        <line x1="250" y1="20" x2="400" y2="20" stroke="#abbdb1" strokeWidth="1" opacity="0.4" />
      </svg>
    </div>
  );
};

export default BotanicalDivider;
