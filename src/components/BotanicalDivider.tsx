import React from 'react';

interface BotanicalDividerProps {
  className?: string;
}

const BotanicalDivider = ({ className = '' }: BotanicalDividerProps) => {
  return (
    <div className={`flex items-center justify-center py-4 md:py-6 -my-px ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 400 50"
        className="w-[300px] md:w-[400px] h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left line */}
        <line x1="0" y1="25" x2="145" y2="25" stroke="#abbdb1" strokeWidth="1" opacity="0.5" />
        
        {/* Central leaf motif */}
        <g transform="translate(200, 25)" opacity="0.65">
          {/* Stem */}
          <line x1="-55" y1="0" x2="55" y2="0" stroke="#abbdb1" strokeWidth="1" />
          
          {/* Left leaves */}
          <path d="M-30,-2 Q-42,-18 -28,-21 Q-22,-10 -18,-2" fill="#abbdb1" opacity="0.7" />
          <path d="M-14,-2 Q-23,-15 -12,-17 Q-8,-8 -6,-2" fill="#abbdb1" opacity="0.6" />
          
          {/* Center leaf (upward) */}
          <path d="M-3,-2 Q0,-22 3,-2" fill="#E5B86E" opacity="0.6" />
          
          {/* Right leaves */}
          <path d="M14,-2 Q23,-15 12,-17 Q8,-8 6,-2" fill="#abbdb1" opacity="0.6" />
          <path d="M30,-2 Q42,-18 28,-21 Q22,-10 18,-2" fill="#abbdb1" opacity="0.7" />
        </g>

        {/* Right line */}
        <line x1="255" y1="25" x2="400" y2="25" stroke="#abbdb1" strokeWidth="1" opacity="0.5" />
      </svg>
    </div>
  );
};

export default BotanicalDivider;
