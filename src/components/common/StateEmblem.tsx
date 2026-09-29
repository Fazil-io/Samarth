import React from 'react';

interface EmblemProps {
  className?: string;
  size?: number;
}

export const StateEmblem: React.FC<EmblemProps> = ({ className = '', size = 48 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Government of Maharashtra Official Emblem"
    >
      {/* Outer circular gold border */}
      <circle cx="50" cy="50" r="47" stroke="#b45309" strokeWidth="2.5" fill="#fef3c7" fillOpacity="0.3" />
      <circle cx="50" cy="50" r="43" stroke="#b45309" strokeWidth="1" strokeDasharray="2 2" />

      {/* Decorative sunburst rays */}
      <path
        d="M50 10 L50 16 M50 84 L50 90 M10 50 L16 50 M84 50 L90 50 M22 22 L26 26 M74 74 L78 78 M22 78 L26 74 M74 26 L78 22"
        stroke="#b45309"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Deep maroon / saffron central octagon / shield (Rajmudra shape) */}
      <polygon
        points="50,18 76,29 82,50 76,71 50,82 24,71 18,50 24,29"
        fill="#831843"
        stroke="#f59e0b"
        strokeWidth="1.5"
      />

      {/* Inner gold circular motif */}
      <circle cx="50" cy="50" r="23" stroke="#fbbf24" strokeWidth="1.2" fill="#9d174d" />

      {/* Stylized Lamp / Diya of Knowledge (Maharashtra State Innovation motif) */}
      <path
        d="M40 56 Q50 63 60 56 Q55 60 50 60 Q45 60 40 56 Z"
        fill="#fef08a"
        stroke="#f59e0b"
        strokeWidth="0.8"
      />
      {/* Flame */}
      <path
        d="M50 40 Q53 46 50 51 Q47 46 50 40 Z"
        fill="#f97316"
      />
      <circle cx="50" cy="48" r="1.5" fill="#fef08a" />

      {/* Star / Chakra rays in inner circle */}
      <circle cx="50" cy="33" r="1.5" fill="#fbbf24" />
      <circle cx="50" cy="67" r="1.5" fill="#fbbf24" />
      <circle cx="33" cy="50" r="1.5" fill="#fbbf24" />
      <circle cx="67" cy="50" r="1.5" fill="#fbbf24" />

      {/* Devanagari arch representation */}
      <path
        d="M32 42 Q50 35 68 42"
        stroke="#fbbf24"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M32 60 Q50 66 68 60"
        stroke="#fbbf24"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
};

export const NationalEmblemAshoka: React.FC<EmblemProps> = ({ className = '', size = 48 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Lion Capital of Ashoka Emblem"
    >
      {/* Three Lions stylized outline in official bronze/gold */}
      <path
        d="M30 45 C30 25 40 15 50 15 C60 15 70 25 70 45 C70 55 65 65 50 68 C35 65 30 55 30 45 Z"
        fill="#854d0e"
        opacity="0.9"
      />
      {/* Left Lion head profile */}
      <path
        d="M20 40 C20 30 26 22 34 22 C34 32 32 45 22 50 Z"
        fill="#a16207"
      />
      {/* Right Lion head profile */}
      <path
        d="M80 40 C80 30 74 22 66 22 C66 32 68 45 78 50 Z"
        fill="#a16207"
      />
      {/* Center Lion mane details */}
      <path
        d="M42 30 C45 25 55 25 58 30 C60 40 58 52 50 56 C42 52 40 40 42 30 Z"
        fill="#ca8a04"
      />
      {/* Pedestal / Abacus */}
      <rect x="22" y="70" width="56" height="12" rx="2" fill="#713f12" />
      {/* Ashoka Chakra */}
      <circle cx="50" cy="76" r="4.5" stroke="#fef08a" strokeWidth="1" fill="#1e3a8a" />
      {/* Horse on left */}
      <circle cx="32" cy="76" r="2.5" fill="#ca8a04" />
      {/* Bull on right */}
      <circle cx="68" cy="76" r="2.5" fill="#ca8a04" />
      {/* Base Bell Lotus */}
      <path
        d="M26 84 C34 94 66 94 74 84 L78 90 C68 102 32 102 22 90 Z"
        fill="#854d0e"
      />
      {/* Satyameva Jayate banner */}
      <rect x="15" y="104" width="70" height="12" rx="2" fill="#fef3c7" stroke="#b45309" strokeWidth="0.8" />
      <text
        x="50"
        y="113"
        textAnchor="middle"
        fontSize="6.5"
        fontWeight="bold"
        fill="#78350f"
        fontFamily="serif"
      >
        सत्यमेव जयते
      </text>
    </svg>
  );
};
