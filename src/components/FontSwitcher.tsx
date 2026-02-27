import { useState } from 'react';

const fonts = ['Alumni Sans', 'Rubik', 'Roboto'] as const;

const FontSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string>('Alumni Sans');

  const apply = (font: string) => {
    setCurrent(font);
    document.documentElement.style.setProperty('--font-sans', `'${font}', sans-serif`);
    document.body.style.fontFamily = `'${font}', sans-serif`;
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {open && (
        <div className="mb-2 bg-white rounded-lg shadow-xl p-3 space-y-2 border border-gray-200">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Debug: Font</p>
          {fonts.map(f => (
            <button
              key={f}
              onClick={() => apply(f)}
              className={`block w-full text-left px-3 py-1.5 rounded text-sm ${current === f ? 'bg-green-100 font-bold' : 'hover:bg-gray-100'}`}
              style={{ fontFamily: `'${f}', sans-serif` }}
            >
              {f} {current === f && '✓'}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="bg-black text-white text-xs px-3 py-2 rounded-full shadow-lg hover:bg-gray-800"
      >
        🔤 Font
      </button>
    </div>
  );
};

export default FontSwitcher;
