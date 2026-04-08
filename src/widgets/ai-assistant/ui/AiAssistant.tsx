'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/shared/lib/cn';
import { Input } from '@/shared/ui/input/Input';
import { Button } from '@/shared/ui/button/Button';
import { Sparkles, X, ArrowRight } from '@/shared/ui/icons';

interface Message {
  id: string;
  role: 'ai' | 'user';
  text: string;
}

interface AiAssistantProps {
  open: boolean;
  onClose: () => void;
}

const INITIAL_MESSAGE: Message = {
  id: 'init',
  role: 'ai',
  text: '안녕하세요! 포트폴리오나 이력서에 대해 물어보세요.',
};

export function AiAssistant({ open, onClose }: AiAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: 'ai',
        text: 'AI 응답이 여기에 표시됩니다.',
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex h-full w-80 flex-col border-l border-zinc-800 bg-zinc-900/95 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <h2 className="text-sm font-semibold text-zinc-100">AI 어시스턴트</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-md p-1 text-zinc-400 transition-colors hover:text-zinc-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed',
                    message.role === 'ai'
                      ? 'bg-zinc-800 text-zinc-200'
                      : 'bg-blue-500/10 text-zinc-200 border border-blue-500/20'
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-xl bg-zinc-800 px-3 py-2">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:0ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="flex items-center gap-2 border-t border-zinc-800 px-4 py-3">
            <div className="flex-1">
              <Input
                placeholder="메시지를 입력하세요..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="h-9 text-xs"
              />
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="h-9 w-9 shrink-0 p-0"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
