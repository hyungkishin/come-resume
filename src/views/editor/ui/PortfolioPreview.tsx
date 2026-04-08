'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Mail, Github } from '@/shared/ui/icons';
import { cn } from '@/shared/lib/cn';
import type { PortfolioSection, PortfolioTheme } from '@/shared/types';

interface PortfolioPreviewProps {
  open: boolean;
  onClose: () => void;
  sections: PortfolioSection[];
  theme: PortfolioTheme;
}

function HeroPreview({ data }: { data: Record<string, unknown> }) {
  const avatarUrl = data.avatarUrl as string | null;
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      {avatarUrl && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 h-28 w-28 overflow-hidden rounded-full border-2 border-zinc-700 bg-gradient-to-br from-blue-500 to-purple-500"
        />
      )}
      {!avatarUrl && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-4xl font-bold text-white"
        >
          {((data.name as string) || 'U').charAt(0)}
        </motion.div>
      )}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl"
      >
        {(data.name as string) || '이름'}
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-3 text-xl text-blue-400"
      >
        {(data.title as string) || '직함'}
      </motion.p>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-4 max-w-lg text-base leading-relaxed text-zinc-400"
      >
        {(data.subtitle as string) || ''}
      </motion.p>
    </section>
  );
}

function AboutPreview({ data }: { data: Record<string, unknown> }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-blue-400">About</h2>
      <p className="text-lg leading-relaxed text-zinc-300">
        {(data.bio as string) || ''}
      </p>
    </section>
  );
}

function SkillsPreview({ data }: { data: Record<string, unknown> }) {
  const categories = (data.categories as Array<{ name: string; skills: string[] }>) || [];
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h2 className="mb-8 text-sm font-semibold uppercase tracking-widest text-blue-400">Skills</h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <h3 className="mb-3 text-sm font-medium text-zinc-200">{cat.name}</h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map(skill => (
                <span
                  key={skill}
                  className="rounded-full border border-zinc-700 bg-zinc-800/50 px-3 py-1 text-sm text-zinc-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ExperiencePreview({ data, title }: { data: Record<string, unknown>; title: string }) {
  const items = (data.items as Array<{ company?: string; school?: string; role?: string; degree?: string; period: string; description: string }>) || [];
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h2 className="mb-8 text-sm font-semibold uppercase tracking-widest text-blue-400">{title}</h2>
      <div className="space-y-8">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="relative border-l-2 border-zinc-700 pl-6"
          >
            <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-blue-500" />
            <h3 className="text-base font-semibold text-zinc-100">
              {item.role || item.degree || ''}
            </h3>
            <p className="mt-0.5 text-sm text-zinc-400">
              {item.company || item.school || ''} · {item.period}
            </p>
            {item.description && (
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProjectsPreview({ data }: { data: Record<string, unknown> }) {
  const items = (data.items as Array<{ title: string; description: string; technologies: string[]; githubUrl: string }>) || [];
  if (!items.length) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="mb-8 text-sm font-semibold uppercase tracking-widest text-blue-400">Projects</h2>
        <p className="text-sm text-zinc-500">프로젝트를 추가해주세요</p>
      </section>
    );
  }
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <h2 className="mb-8 text-sm font-semibold uppercase tracking-widest text-blue-400">Projects</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-700"
          >
            <h3 className="text-base font-semibold text-zinc-100">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {(item.technologies || []).map(t => (
                <span key={t} className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs text-blue-400">
                  {t}
                </span>
              ))}
            </div>
            {item.githubUrl && (
              <a
                href={item.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-300"
              >
                <ExternalLink className="h-3 w-3" />
                GitHub
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ContactPreview({ data }: { data: Record<string, unknown> }) {
  const email = data.email as string | undefined;
  const github = data.github as string | undefined;
  const linkedin = data.linkedin as string | undefined;
  const website = data.website as string | undefined;
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-400">Contact</h2>
      <p className="mb-8 text-lg text-zinc-300">함께 일하고 싶으시다면 연락주세요.</p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {email && (
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:border-zinc-600 hover:text-zinc-100"
          >
            <Mail className="h-4 w-4" />
            {email}
          </a>
        )}
        {github && (
          <a
            href={`https://github.com/${github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:border-zinc-600 hover:text-zinc-100"
          >
            <Github className="h-4 w-4" />
            {github}
          </a>
        )}
        {linkedin && (
          <a
            href={`https://linkedin.com/in/${linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:border-zinc-600 hover:text-zinc-100"
          >
            LinkedIn
          </a>
        )}
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:border-zinc-600 hover:text-zinc-100"
          >
            <ExternalLink className="h-4 w-4" />
            웹사이트
          </a>
        )}
      </div>
    </section>
  );
}

function CustomPreview({ data }: { data: Record<string, unknown> }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-blue-400">
        {(data.title as string) || '커스텀'}
      </h2>
      <p className="text-base leading-relaxed text-zinc-300">
        {(data.content as string) || ''}
      </p>
    </section>
  );
}

function renderSection(section: PortfolioSection) {
  if (!section.isVisible) return null;
  const data = section.data as Record<string, unknown>;

  switch (section.type) {
    case 'hero':
      return <HeroPreview data={data} />;
    case 'about':
      return <AboutPreview data={data} />;
    case 'skills':
      return <SkillsPreview data={data} />;
    case 'experience':
      return <ExperiencePreview data={data} title="Experience" />;
    case 'education':
      return <ExperiencePreview data={data} title="Education" />;
    case 'projects':
      return <ProjectsPreview data={data} />;
    case 'contact':
      return <ContactPreview data={data} />;
    case 'custom':
      return <CustomPreview data={data} />;
    default:
      return null;
  }
}

export function PortfolioPreview({ open, onClose, sections, theme }: PortfolioPreviewProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ background: theme.darkMode ? '#09090b' : '#ffffff' }}
        >
          {/* 상단 바 */}
          <div className="flex h-12 items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-zinc-700" />
                <div className="h-3 w-3 rounded-full bg-zinc-700" />
                <div className="h-3 w-3 rounded-full bg-zinc-700" />
              </div>
              <div className="ml-4 flex h-7 items-center rounded-md bg-zinc-800 px-3 text-xs text-zinc-400">
                username.foliofy.dev
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
            >
              <X className="h-3.5 w-3.5" />
              닫기
            </button>
          </div>

          {/* 포트폴리오 콘텐츠 */}
          <div className="flex-1 overflow-y-auto">
            <div
              className={cn('min-h-full', theme.darkMode ? 'bg-[#09090b] text-zinc-50' : 'bg-white text-zinc-900')}
              style={{ fontFamily: theme.fontFamily }}
            >
              {sections.map((section) => (
                <div key={section.id}>{renderSection(section)}</div>
              ))}

              {/* 푸터 */}
              <footer className="border-t border-zinc-800/50 py-8 text-center">
                <p className="text-xs text-zinc-600">
                  Built with Foliofy
                </p>
              </footer>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
