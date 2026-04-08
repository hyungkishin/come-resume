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

const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3);

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: easeOut },
  }),
};

const PROJECT_ACCENTS = [
  'from-blue-500/20 to-cyan-500/20',
  'from-violet-500/20 to-purple-500/20',
  'from-emerald-500/20 to-teal-500/20',
  'from-orange-500/20 to-amber-500/20',
  'from-rose-500/20 to-pink-500/20',
  'from-indigo-500/20 to-blue-500/20',
];

const SECTION_LABEL = 'mb-10 flex items-center gap-3';
const SECTION_BADGE =
  'rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest';
const SECTION_LINE = 'h-px flex-1 bg-gradient-to-r from-zinc-700 to-transparent';

function SectionHeader({ label }: { label: string }) {
  return (
    <div className={SECTION_LABEL}>
      <span className={SECTION_BADGE} style={{ borderColor: 'var(--accent-30)', backgroundColor: 'var(--accent-10)', color: 'var(--accent)' }}>{label}</span>
      <div className={SECTION_LINE} />
    </div>
  );
}

function HeroPreview({ data }: { data: Record<string, unknown> }) {
  const name = data.name as string | undefined;
  const title = data.title as string | undefined;
  const subtitle = data.subtitle as string | undefined;
  const email = data.email as string | undefined;
  const github = data.github as string | undefined;
  const website = data.website as string | undefined;
  const initial = (name || 'U').charAt(0).toUpperCase();

  return (
    <section className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(96,165,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(59,130,246,0.12),transparent)]" />

      {/* Avatar */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative mb-6"
      >
        <div className="absolute -inset-1 rounded-full opacity-60 blur-[6px]" style={{ background: `var(--accent)` }} />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white" style={{ background: `var(--accent)`, boxShadow: `0 0 0 3px var(--accent-30)` }}>
          {initial}
        </div>
      </motion.div>

      <motion.h1
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl"
      >
        {name || 'Your Name'}
      </motion.h1>

      <motion.p
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mt-3 text-lg font-medium" style={{ color: 'var(--accent)' }}
      >
        {title || 'Your Title'}
      </motion.p>

      {subtitle && (
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-4 max-w-lg text-base leading-relaxed text-zinc-400"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Social links */}
      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mt-8 flex items-center gap-3"
      >
        {email && (
          <a
            href={`mailto:${email}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800/60 text-zinc-400 transition-all hover:border-zinc-500 hover:bg-zinc-700/50 hover:text-zinc-200"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
        )}
        {github && (
          <a
            href={`https://github.com/${github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800/60 text-zinc-400 transition-all hover:border-zinc-500 hover:bg-zinc-700/50 hover:text-zinc-200"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
        )}
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800/60 text-zinc-400 transition-all hover:border-zinc-500 hover:bg-zinc-700/50 hover:text-zinc-200"
            aria-label="Website"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 flex flex-col items-center gap-1.5"
      >
        <span className="text-[10px] uppercase tracking-widest text-zinc-600">scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="h-4 w-px bg-gradient-to-b from-zinc-600 to-transparent"
        />
      </motion.div>
    </section>
  );
}

function AboutPreview({ data }: { data: Record<string, unknown> }) {
  const bio = data.bio as string | undefined;
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeader label="About" />
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="sm:col-span-2"
        >
          <p className="text-lg leading-relaxed text-zinc-300">{bio || ''}</p>
        </motion.div>
        <motion.div
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          {[
            { value: '3+', label: 'Years Experience' },
            { value: '10+', label: 'Projects Built' },
            { value: '5+', label: 'Technologies' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4"
            >
              <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>{stat.value}</div>
              <div className="mt-0.5 text-sm text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SkillsPreview({ data }: { data: Record<string, unknown> }) {
  const categories = (data.categories as Array<{ name: string; skills: string[] }>) || [];
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeader label="Skills" />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            variants={fadeUp}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              {cat.name}
            </p>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-zinc-700/60 bg-zinc-800/40 px-3 py-1.5 text-sm text-zinc-300 transition-all hover:border-zinc-500 hover:text-zinc-100"
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

type TimelineItem = {
  company?: string;
  school?: string;
  role?: string;
  degree?: string;
  period: string;
  description?: string;
};

function TimelinePreview({
  data,
  label,
}: {
  data: Record<string, unknown>;
  label: string;
}) {
  const items = (data.items as TimelineItem[]) || [];
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeader label={label} />
      <div className="space-y-8">
        {items.map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative pl-7"
          >
            <div className="absolute left-0 top-1.5 h-full w-px bg-zinc-800">
              <div className="absolute -left-[3px] top-0 h-[7px] w-[7px] rounded-full" style={{ border: '1px solid var(--accent)', background: 'var(--accent-30)', boxShadow: `0 0 6px var(--accent-60)` }} />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold text-zinc-100">
                {item.role || item.degree || ''}
              </h3>
              <span className="rounded-full border border-zinc-700 bg-zinc-800/60 px-2.5 py-0.5 text-xs text-zinc-400">
                {item.period}
              </span>
            </div>
            <p className="mt-1 text-sm font-medium" style={{ color: 'var(--accent)' }}>
              {item.company || item.school || ''}
            </p>
            {item.description && (
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">{item.description}</p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

type ProjectItem = {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
};

function ProjectsPreview({ data }: { data: Record<string, unknown> }) {
  const items = (data.items as ProjectItem[]) || [];
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeader label="Projects" />
      {items.length === 0 ? (
        <p className="text-sm text-zinc-600">프로젝트를 추가해주세요</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
              {/* Top accent bar */}
              <div
                className={cn(
                  'h-1 w-full bg-gradient-to-r',
                  PROJECT_ACCENTS[i % PROJECT_ACCENTS.length]
                )}
              />
              <div className="p-6">
                <h3 className="text-base font-bold text-zinc-100">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {(item.technologies || []).map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-zinc-700/60 bg-zinc-800/60 px-2 py-0.5 text-xs text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {item.githubUrl && (
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-200"
                  >
                    <Github className="h-3.5 w-3.5" />
                    View on GitHub
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

function ContactPreview({ data }: { data: Record<string, unknown> }) {
  const email = data.email as string | undefined;
  const github = data.github as string | undefined;
  const linkedin = data.linkedin as string | undefined;
  const website = data.website as string | undefined;

  type Link = { href: string; icon: React.ReactNode; label: string };
  const links: Link[] = [];
  if (email) links.push({ href: `mailto:${email}`, icon: <Mail className="h-4 w-4" />, label: email });
  if (github) links.push({ href: `https://github.com/${github}`, icon: <Github className="h-4 w-4" />, label: github });
  if (linkedin) links.push({ href: `https://linkedin.com/in/${linkedin}`, icon: <ExternalLink className="h-4 w-4" />, label: linkedin });
  if (website) links.push({ href: website, icon: <ExternalLink className="h-4 w-4" />, label: '웹사이트' });

  return (
    <section className="relative mx-auto max-w-4xl overflow-hidden px-6 py-20 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(59,130,246,0.07),transparent)]" />
      <motion.div
        variants={fadeUp}
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SectionHeader label="Contact" />
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
          Let&apos;s Connect
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base text-zinc-400">
          함께 일하고 싶으시다면 언제든지 연락주세요.
        </p>
      </motion.div>
      <motion.div
        variants={fadeUp}
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/50 px-5 py-3 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-500 hover:bg-zinc-700/50 hover:text-zinc-100"
          >
            {link.icon}
            {link.label}
          </a>
        ))}
      </motion.div>
    </section>
  );
}

function CustomPreview({ data }: { data: Record<string, unknown> }) {
  const title = data.title as string | undefined;
  const content = data.content as string | undefined;
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeader label={title || '커스텀'} />
      <p className="text-base leading-relaxed text-zinc-300">{content || ''}</p>
    </section>
  );
}

function renderSection(section: PortfolioSection) {
  if (!section.isVisible) return null;
  const data = section.data as Record<string, unknown>;
  switch (section.type) {
    case 'hero':       return <HeroPreview data={data} />;
    case 'about':      return <AboutPreview data={data} />;
    case 'skills':     return <SkillsPreview data={data} />;
    case 'experience': return <TimelinePreview data={data} label="Experience" />;
    case 'education':  return <TimelinePreview data={data} label="Education" />;
    case 'projects':   return <ProjectsPreview data={data} />;
    case 'contact':    return <ContactPreview data={data} />;
    case 'custom':     return <CustomPreview data={data} />;
    default:           return null;
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
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ background: theme.darkMode ? '#09090b' : '#ffffff' }}
        >
          {/* Browser chrome bar */}
          <div className="flex h-11 shrink-0 items-center justify-between border-b border-zinc-800/80 bg-zinc-950/90 px-4 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
              </div>
              <div className="flex h-6 items-center gap-1.5 rounded-md border border-zinc-700/60 bg-zinc-800/60 px-3">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500/60" />
                <span className="text-[11px] text-zinc-400">username.foliofy.dev</span>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close preview"
              className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800">
            <div
              className={cn(
                'min-h-full divide-y divide-zinc-800/40',
                theme.darkMode ? 'bg-[#09090b] text-zinc-50' : 'bg-white text-zinc-900'
              )}
              style={{
                fontFamily: theme.fontFamily,
                '--accent': theme.primaryColor,
                '--accent-10': `${theme.primaryColor}1a`,
                '--accent-20': `${theme.primaryColor}33`,
                '--accent-30': `${theme.primaryColor}4d`,
                '--accent-60': `${theme.primaryColor}99`,
              } as React.CSSProperties}
            >
              {sections.map((section) => (
                <div key={section.id}>{renderSection(section)}</div>
              ))}

              <footer className="py-8 text-center">
                <p className="text-xs text-zinc-700">
                  Built with{' '}
                  <span className="font-medium text-zinc-500">Foliofy</span>{' '}
                  &middot; {new Date().getFullYear()}
                </p>
              </footer>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
