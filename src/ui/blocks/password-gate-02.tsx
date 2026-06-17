import { useState, type ReactNode } from 'react';
import { Lock, ArrowRight } from 'lucide-react';

// Soft, client-side gate. This is NOT real security — it only keeps the
// dashboard out of view for casual visitors. The password is in the bundle.
const PASSWORD = import.meta.env.VITE_DASHBOARD_PASSWORD ?? 'monofly';
const STORAGE_KEY = 'monofly.dashboard.unlocked';

export function PasswordGate02({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(STORAGE_KEY) === '1'
  );
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  if (unlocked) return <>{children}</>;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, '1');
      setUnlocked(true);
    } else {
      setError(true);
      setValue('');
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-6rem)] flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 3px, transparent 4px)',
          backgroundSize: '16px 16px',
        }}
      ></div>

      {/* Container */}
      <form
        onSubmit={submit}
        className={`relative z-10 w-full max-w-md bg-white border-8 border-black shadow-[16px_16px_0px_0px_#000] p-8 pb-10 ${
          error ? 'animate-[wiggle_0.3s_ease-in-out]' : ''
        }`}
      >
        {/* Lock badge */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-black text-white border-4 border-black flex items-center justify-center shadow-[8px_8px_0px_0px_#000] -rotate-3 mb-6">
            <Lock className="w-10 h-10" strokeWidth={3} />
          </div>
          <h1 className="font-['Bebas_Neue'] text-5xl tracking-tight leading-none uppercase text-center">
            Restricted
          </h1>
          <p className="font-bold text-sm mt-3 bg-black text-white inline-block px-3 py-1 -rotate-1">
            DASHBOARD ACCESS ONLY
          </p>
        </div>

        {/* Password Input */}
        <label className="block font-['Bebas_Neue'] text-2xl tracking-wide mb-2">
          ENTER PASSWORD
        </label>
        <input
          type="password"
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(false);
          }}
          placeholder="••••••••"
          className="w-full bg-white border-4 border-black p-4 font-['Space_Mono'] text-lg outline-none focus:shadow-[6px_6px_0px_0px_#000] focus:-translate-x-1 focus:-translate-y-1 transition-all placeholder:text-gray-400"
        />

        {/* Error message */}
        {error && (
          <p className="mt-3 font-bold text-sm bg-black text-white inline-block px-3 py-1 rotate-1">
            WRONG PASSWORD. TRY AGAIN.
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="group mt-8 w-full flex items-center justify-center gap-3 bg-black text-white px-4 py-4 border-4 border-black font-['Bebas_Neue'] text-2xl tracking-widest hover:bg-white hover:text-black transition-all active:translate-y-1 active:translate-x-1 shadow-[8px_8px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] active:shadow-none"
        >
          UNLOCK
          <ArrowRight
            className="w-6 h-6 group-hover:translate-x-1 transition-transform"
            strokeWidth={3}
          />
        </button>

        <p className="mt-6 text-center text-xs font-bold text-gray-500">
          The linkinbio stays public. This only guards the OS.
        </p>
      </form>
    </div>
  );
}