'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

interface TooltipProps {
  content: string;
  children: ReactNode;
  side?: 'top' | 'bottom';
  className?: string;
}

export function Tooltip({ content, children, side = 'top', className }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={cn(
            'absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-800 px-2.5 py-1 text-xs text-zinc-200 shadow-lg border border-zinc-700',
            side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2',
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
