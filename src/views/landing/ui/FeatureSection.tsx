'use client';

import { motion } from 'framer-motion';
import { Github, FileText, Sparkles, Rocket, Palette, Globe } from '@/shared/ui/icons';
import { cn } from '@/shared/lib/cn';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: <Github className="h-5 w-5" />,
    title: 'GitHub 자동 연동',
    description:
      'GitHub 계정 연결하면 레포지토리 분석, 기술 스택 추출, 프로젝트 카드 자동 생성.',
    color: 'blue',
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: 'AI 이력서 폴리싱',
    description:
      '두루뭉술한 이력서를 STAR 포맷으로 재구성. 성과 중심 문장으로 자동 변환.',
    color: 'purple',
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: 'JD 매칭 분석',
    description:
      '채용공고 붙여넣으면 이력서와 매칭률 분석. 부족한 키워드 자동 추천.',
    color: 'amber',
  },
  {
    icon: <Palette className="h-5 w-5" />,
    title: '프리미엄 템플릿',
    description:
      '디자이너가 만든 프로페셔널 템플릿. 드래그앤드롭으로 자유롭게 커스텀.',
    color: 'green',
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    title: '원클릭 배포',
    description:
      'username.foliofy.dev로 즉시 배포. 커스텀 도메인 연결도 클릭 한 번.',
    color: 'red',
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: 'PDF 이력서 익스포트',
    description:
      'ATS 호환 이력서 PDF 자동 생성. 깔끔한 템플릿으로 바로 지원.',
    color: 'blue',
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'group-hover:border-blue-500/30' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'group-hover:border-purple-500/30' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'group-hover:border-amber-500/30' },
  green: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'group-hover:border-emerald-500/30' },
  red: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'group-hover:border-red-500/30' },
};

export function FeatureSection() {
  return (
    <section id="features" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            이직 준비, 이제 5분이면 끝
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            GitHub 연결부터 이력서 폴리싱, 배포까지 한 곳에서.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const colors = colorMap[feature.color];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={cn(
                  'group rounded-xl border border-zinc-800 bg-zinc-900/50 p-6',
                  'transition-all duration-300 hover:bg-zinc-900',
                  colors.border
                )}
              >
                <div
                  className={cn(
                    'mb-4 flex h-10 w-10 items-center justify-center rounded-lg',
                    colors.bg,
                    colors.text
                  )}
                >
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-base font-semibold text-zinc-100">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
