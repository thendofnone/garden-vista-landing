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
          d="M0,80 C120,95 200,40 360,55 C520,70 580,100 720,85 C860,70 940,25 1080,45 C1220,65 1350,90 1440,70 L1440,120 L0,120 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
};

export default WaveDivider;
