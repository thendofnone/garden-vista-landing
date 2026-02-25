import React from 'react';

interface WaveDividerProps {
  fromColor?: string;
  toColor?: string;
  flip?: boolean;
}

const WaveDivider = ({ fromColor = '#F8F5F0', toColor = '#ffffff', flip = false }: WaveDividerProps) => {
  return (
    <div
      className="w-full overflow-hidden leading-[0] -mt-px"
      style={{
        backgroundColor: fromColor,
        transform: flip ? 'scaleY(-1)' : undefined,
      }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-[60px] md:h-[80px] lg:h-[100px] block"
      >
        <path
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
};

export default WaveDivider;
