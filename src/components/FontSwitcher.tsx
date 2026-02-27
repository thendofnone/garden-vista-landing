import { useState } from 'react';
import logoOriginal from '@/assets/logo.svg';
import logoA from '@/assets/logo-testA.svg';
import logoB from '@/assets/logo-testB.svg';

const fonts = ['Alumni Sans', 'Rubik', 'Roboto'] as const;

const logos = [
  { label: 'Attuale', src: logoOriginal },
  { label: 'Test A', src: logoA },
  { label: 'Test B', src: logoB },
] as const;

const FontSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [currentFont, setCurrentFont] = useState<string>('Alumni Sans');
  const [currentLogo, setCurrentLogo] = useState<string>('Attuale');

  const applyFont = (font: string) => {
    setCurrentFont(font);
    document.documentElement.style.setProperty('--font-sans', `'${font}', sans-serif`);
    document.body.style.fontFamily = `'${font}', sans-serif`;
  };

  const applyLogo = (logo: typeof logos[number]) => {
    setCurrentLogo(logo.label);
    // Update all logo images on the page
    document.querySelectorAll<HTMLImageElement>('img[alt="Forme Verdi"]').forEach(img => {
      img.src = logo.src;
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {open && (
        <div className="mb-2 bg-white rounded-lg shadow-xl p-3 space-y-3 border border-gray-200 max-h-[80vh] overflow-y-auto">
          {/* Font section */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Font</p>
            {fonts.map(f => (
              <button
                key={f}
                onClick={() => applyFont(f)}
                className={`block w-full text-left px-3 py-1.5 rounded text-sm ${currentFont === f ? 'bg-green-100 font-bold' : 'hover:bg-gray-100'}`}
                style={{ fontFamily: `'${f}', sans-serif` }}
              >
                {f} {currentFont === f && '✓'}
              </button>
            ))}
          </div>

          {/* Logo section */}
          <div className="border-t border-gray-200 pt-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Logo</p>
            {logos.map(l => (
              <button
                key={l.label}
                onClick={() => applyLogo(l)}
                className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded text-sm ${currentLogo === l.label ? 'bg-green-100 font-bold' : 'hover:bg-gray-100'}`}
              >
                <img src={l.src} alt={l.label} style={{ height: '76px', width: 'auto' }} />
                <span>{l.label} {currentLogo === l.label && '✓'}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="bg-black text-white text-xs px-3 py-2 rounded-full shadow-lg hover:bg-gray-800"
      >
        🔤 Debug
      </button>
    </div>
  );
};

export default FontSwitcher;
