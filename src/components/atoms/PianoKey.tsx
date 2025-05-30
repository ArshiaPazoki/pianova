type PianoKeyProps = {
  note: string;
  type: 'white' | 'black';
  isActive?: boolean;
  onClick?: () => void;
  leftPercent?: number; // Only used for black keys on desktop
};

export default function PianoKey({
  note,
  type,
  isActive,
  onClick,
  leftPercent,
}: PianoKeyProps) {
  const isBlack = type === 'black';

  const activeStyle = isActive ? 'scale-95 brightness-110' : '';

  const baseClasses = `
    flex items-center justify-start sm:items-end sm:justify-center
    px-3 text-xs font-semibold rounded-sm border border-gray-700
    transition-transform duration-75
    ${activeStyle}
  `;

  if (isBlack) {
    return (
      <button
        onClick={onClick}
        style={
          leftPercent !== undefined
            ? { left: `${leftPercent}%` }
            : undefined
        }
        className={`
          ${baseClasses}
          bg-black text-white z-20
          absolute w-full h-[60%]
          sm:w-[6%] sm:h-[60%] sm:top-0
        `}
      >
        {note}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`
        ${baseClasses}
        bg-white text-black
        w-full h-[12vh]
        sm:relative sm:flex-1 sm:h-full
      `}
    >
      {note}
    </button>
  );
}
