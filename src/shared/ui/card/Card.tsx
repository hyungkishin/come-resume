'use client';

import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/shared/lib/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl border border-zinc-800 bg-zinc-900 p-6',
          hover && 'transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-800/80 hover:shadow-lg hover:shadow-zinc-950/50',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';
