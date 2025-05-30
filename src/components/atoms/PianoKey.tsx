type PianoKeyProps = {
  note: string;
  type: 'white' | 'black';
  isActive?: boolean;
  onClick?: () => void;
  leftPercent?: number; // for black keys positioning
};

export default function PianoKey({ note, type, isActive, onClick, leftPercent }: PianoKeyProps) {
  const isBlack = type === 'black';

  const baseClasses = `
    flex items-end justify-center text-xs pb-1 rounded-sm
    border border-gray-700 active:scale-95 transition-transform
    ${isBlack ? 'bg-black text-white absolute z-20 w-[8%] h-[60%] top-0' : 'bg-white text-black flex-1 h-full relative'}
  `;

  const activeClasses = isActive
    ? isBlack
      ? 'scale-95'
      : 'scale-95'
    : '';

  const style = isBlack && leftPercent !== undefined
    ? { left: `${leftPercent}%` }
    : undefined;

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${activeClasses}`}
      style={style}
    >
      {note}
    </button>
  );
}
