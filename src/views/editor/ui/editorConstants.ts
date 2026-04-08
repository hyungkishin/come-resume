import type { PortfolioSection, PortfolioTheme } from '@/shared/types';

export const DEFAULT_SECTIONS: PortfolioSection[] = [
  { id: '1', type: 'hero', order: 0, data: { name: '홍길동', title: 'Frontend Developer', subtitle: '사용자 중심의 인터페이스를 설계하고, 성능과 접근성을 모두 챙기는 3년차 프론트엔드 개발자입니다.', avatarUrl: null }, isVisible: true },
  { id: '2', type: 'about', order: 1, data: { bio: 'React와 TypeScript를 주력으로 사용하며, 디자인 시스템 구축과 성능 최적화에 강점이 있습니다. B2B SaaS 대시보드와 이커머스 플랫폼을 개발한 경험이 있으며, 사용자 경험을 최우선으로 생각합니다. 최근에는 Next.js App Router와 서버 컴포넌트에 깊은 관심을 가지고 있습니다.' }, isVisible: true },
  { id: '3', type: 'projects', order: 2, data: { items: [
    { title: 'Foliofy', description: 'GitHub 연동 AI 포트폴리오 빌더. 5분 만에 프로페셔널한 포트폴리오 생성.', technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'], githubUrl: 'https://github.com/user/foliofy' },
    { title: 'Dashboard Pro', description: 'B2B SaaS 대시보드. 실시간 데이터 시각화와 팀 협업 기능 제공.', technologies: ['React', 'D3.js', 'PostgreSQL', 'WebSocket'], githubUrl: 'https://github.com/user/dashboard-pro' },
    { title: 'EcoMarket', description: '친환경 이커머스 플랫폼. 일 주문량 500건 처리, 페이지 로딩 40% 개선.', technologies: ['Next.js', 'Stripe', 'Prisma', 'Redis'], githubUrl: 'https://github.com/user/ecomarket' },
  ] }, isVisible: true },
  { id: '4', type: 'skills', order: 3, data: { categories: [
    { name: 'Frontend', skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'] },
    { name: 'Backend', skills: ['Node.js', 'PostgreSQL', 'Redis', 'Prisma'] },
    { name: 'DevOps', skills: ['Docker', 'GitHub Actions', 'Vercel', 'AWS'] },
    { name: 'Tools', skills: ['Figma', 'Git', 'Jira', 'Notion'] },
  ] }, isVisible: true },
  { id: '5', type: 'experience', order: 4, data: { items: [
    { company: '테크스타트업 A', role: 'Senior Frontend Developer', period: '2024.01 - 현재', description: 'React/TypeScript 기반 B2B SaaS 대시보드 설계·개발. 디자인 시스템 구축으로 개발 생산성 30% 향상.' },
    { company: '프리랜서', role: 'Fullstack Developer', period: '2022.06 - 2023.12', description: 'Next.js 기반 이커머스 플랫폼 구축. Stripe 결제 연동 및 주문 관리 시스템 개발.' },
  ] }, isVisible: true },
  { id: '7', type: 'education', order: 5, data: { items: [{ school: '한국대학교', degree: '컴퓨터공학과 학사', period: '2018.03 - 2022.02', description: '학점 3.9/4.5 · 소프트웨어 공학 캡스톤 우수상' }] }, isVisible: true },
  { id: '6', type: 'contact', order: 6, data: { email: 'gildong@example.com', github: 'gildong-dev', linkedin: 'gildong', website: 'https://gildong.dev' }, isVisible: true },
];

export const DEFAULT_THEME: PortfolioTheme = {
  templateId: 'minimal-dark',
  primaryColor: '#3b82f6',
  fontFamily: 'Geist Sans',
  darkMode: true,
  customCSS: null,
};

export const TEMPLATE_THEMES: Record<string, Partial<PortfolioTheme>> = {
  'minimal-dark': { primaryColor: '#3b82f6', darkMode: true },
  'developer-pro': { primaryColor: '#22d3ee', darkMode: true },
  'creative-gradient': { primaryColor: '#7c3aed', darkMode: true },
  'clean-white': { primaryColor: '#3b82f6', darkMode: false },
  'neon-nights': { primaryColor: '#a855f7', darkMode: true },
  'corporate': { primaryColor: '#0ea5e9', darkMode: true },
  'portfolio-plus': { primaryColor: '#f97316', darkMode: true },
  'modern-stack': { primaryColor: '#10b981', darkMode: true },
  'elegant': { primaryColor: '#d97706', darkMode: true },
  'starter': { primaryColor: '#6366f1', darkMode: true },
};
