'use client';

import { cn } from '@/shared/lib/cn';
import { useEditorStore } from '../model/store';

const FONT_OPTIONS = [
  { value: 'Geist Sans', label: 'Geist Sans' },
  { value: 'Inter', label: 'Inter' },
  { value: 'Pretendard', label: 'Pretendard' },
  { value: 'Noto Sans KR', label: 'Noto Sans KR' },
];

export function StylePanel() {
  const { theme, setTheme } = useEditorStore();

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-300">주 색상</label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={theme.primaryColor}
            onChange={(e) => setTheme({ primaryColor: e.target.value })}
            className="h-9 w-14 cursor-pointer rounded-lg border border-zinc-700 bg-zinc-900 p-0.5"
          />
          <span className="text-sm text-zinc-400 font-mono">{theme.primaryColor}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="font-family" className="text-sm font-medium text-zinc-300">
          폰트
        </label>
        <select
          id="font-family"
          value={theme.fontFamily}
          onChange={(e) => setTheme({ fontFamily: e.target.value })}
          className={cn(
            'h-10 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 text-sm text-zinc-100',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-950',
            'hover:border-zinc-600 transition-colors duration-150'
          )}
        >
          {FONT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-300">다크모드</span>
        <button
          role="switch"
          aria-checked={theme.darkMode}
          onClick={() => setTheme({ darkMode: !theme.darkMode })}
          className={cn(
            'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent',
            'transition-colors duration-200 ease-in-out',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
            theme.darkMode ? 'bg-blue-500' : 'bg-zinc-700'
          )}
        >
          <span
            className={cn(
              'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg',
              'transform transition duration-200 ease-in-out',
              theme.darkMode ? 'translate-x-5' : 'translate-x-0'
            )}
          />
        </button>
      </div>
    </div>
  );
}
