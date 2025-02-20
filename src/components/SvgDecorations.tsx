import React from "react";

const SvgDecorations: React.FC = () => {
  return (
    <>
      <div className="hidden z-[200] md:block absolute top-0 end-0 -translate-y-12 translate-x-20">
        <svg
          className="w-16 h-auto text-green-500"
          width="121"
          height="135"
          viewBox="0 0 121 135"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </>
  );
};

export default SvgDecorations;
