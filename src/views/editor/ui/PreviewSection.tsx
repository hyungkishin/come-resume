'use client';

import { Mail, Code2, ExternalLink } from '@/shared/ui/icons';
import type { PortfolioSection } from '@/shared/types';

interface PreviewSectionProps {
  section: PortfolioSection;
}

export function PreviewSection({ section }: PreviewSectionProps) {
  if (!section.isVisible) return null;
  const data = section.data as Record<string, unknown>;

  if (section.type === 'hero') {
    return (
      <div className="flex flex-col items-center rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-950 px-8 py-16 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-3xl font-bold text-white">
          {((data.name as string) || 'U').charAt(0)}
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-50">{(data.name as string) || '이름'}</h2>
        <p className="mt-2 text-lg font-medium text-blue-400">{(data.title as string) || '직함'}</p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400">{(data.subtitle as string) || '소개를 입력하세요'}</p>
      </div>
    );
  }

  if (section.type === 'about') {
    return (
      <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 px-8 py-8">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-blue-400">About</h3>
        <p className="text-sm leading-relaxed text-zinc-300">{(data.bio as string) || '자기소개를 입력하세요'}</p>
      </div>
    );
  }

  if (section.type === 'projects') {
    const items = (data.items as Array<{ title: string; description: string; technologies: string[]; githubUrl: string }>) || [];
    return (
      <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 px-8 py-8">
        <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-blue-400">Projects</h3>
        {items.length === 0 && <p className="text-sm text-zinc-500">프로젝트를 추가하세요</p>}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {items.map((item, i) => (
            <div key={i} className="rounded-lg border border-zinc-800 bg-zinc-800/30 p-4">
              <p className="font-medium text-zinc-100">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400">{item.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {(item.technologies || []).map(t => (
                  <span key={t} className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs text-blue-400">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (section.type === 'skills') {
    const categories = (data.categories as Array<{ name: string; skills: string[] }>) || [];
    return (
      <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 px-8 py-8">
        <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-blue-400">Skills</h3>
        <div className="grid grid-cols-2 gap-4">
          {categories.map(cat => (
            <div key={cat.name}>
              <p className="mb-2 text-xs font-medium text-zinc-300">{cat.name}</p>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map(s => (
                  <span key={s} className="rounded-full border border-zinc-700 bg-zinc-800/50 px-2.5 py-1 text-xs text-zinc-300">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (section.type === 'experience') {
    const items = (data.items as Array<{ company: string; role: string; period: string; description: string }>) || [];
    return (
      <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 px-8 py-8">
        <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-blue-400">Experience</h3>
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="relative border-l-2 border-zinc-700 pl-4">
              <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-blue-500" />
              <p className="font-medium text-zinc-100">{item.role}</p>
              <p className="text-xs text-zinc-400">{item.company} · {item.period}</p>
              {item.description && <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">{item.description}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (section.type === 'education') {
    const items = (data.items as Array<{ school: string; degree: string; period: string; description: string }>) || [];
    return (
      <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 px-8 py-8">
        <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-blue-400">Education</h3>
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="relative border-l-2 border-zinc-700 pl-4">
              <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-blue-500" />
              <p className="font-medium text-zinc-100">{item.degree}</p>
              <p className="text-xs text-zinc-400">{item.school} · {item.period}</p>
              {item.description && <p className="mt-1.5 text-xs text-zinc-400">{item.description}</p>}
            </div>
          ))}
          {!items.length && <p className="text-sm text-zinc-500">학력을 추가하세요</p>}
        </div>
      </div>
    );
  }

  if (section.type === 'contact') {
    return (
      <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 px-8 py-8 text-center">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-blue-400">Contact</h3>
        <p className="mb-4 text-sm text-zinc-300">함께 일하고 싶으시다면 연락주세요</p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {(data.email as string) && (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-1.5 text-xs text-zinc-300">
              <Mail className="h-3 w-3" /> {data.email as string}
            </span>
          )}
          {(data.github as string) && (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-1.5 text-xs text-zinc-300">
              <Code2 className="h-3 w-3" /> {data.github as string}
            </span>
          )}
          {(data.website as string) && (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-1.5 text-xs text-zinc-300">
              <ExternalLink className="h-3 w-3" /> 웹사이트
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 px-8 py-8">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-blue-400">
        {(data.title as string) || '커스텀'}
      </h3>
      <p className="text-sm leading-relaxed text-zinc-300">{(data.content as string) || '내용을 입력하세요'}</p>
    </div>
  );
}
