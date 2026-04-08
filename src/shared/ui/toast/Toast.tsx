'use client';

import { create } from 'zustand';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle, Sparkles, X } from '@/shared/ui/icons';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastState {
  toasts: Toast[];
  addToast: (type: ToastType, message: string) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (type, message) => {
    const id = crypto.randomUUID();
    set((state) => ({ toasts: [...state.toasts, { id, type, message }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 3000);
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

const toastStyles: Record<ToastType, string> = {
  success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  error: 'border-red-500/30 bg-red-500/10 text-red-400',
  warning: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
  info: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
};

function ToastIcon({ type }: { type: ToastType }) {
  const cls = 'h-4 w-4 shrink-0';
  if (type === 'success') return <CheckCircle2 className={cls} />;
  if (type === 'error') return <XCircle className={cls} />;
  if (type === 'warning') return <AlertTriangle className={cls} />;
  return <Sparkles className={cls} />;
}

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div
      className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      role="status"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`pointer-events-auto flex items-center gap-3 rounded-lg border px-4 py-3 text-sm shadow-lg backdrop-blur-sm min-w-[240px] max-w-[360px] ${toastStyles[toast.type]}`}
          >
            <ToastIcon type={toast.type} />
            <span className="flex-1 leading-snug">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
              aria-label="닫기"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
