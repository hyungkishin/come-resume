import type { Template } from '@/entities/template';

export const MOCK_TEMPLATES: Template[] = [
  { id: 'minimal-dark', name: 'Minimal Dark', description: '깔끔한 다크 테마', previewUrl: '', category: 'minimal', isPremium: false, colors: ['#09090b', '#3b82f6'] },
  { id: 'developer-pro', name: 'Developer Pro', description: '개발자를 위한 프로 템플릿', previewUrl: '', category: 'developer', isPremium: false, colors: ['#0f172a', '#22d3ee'] },
  { id: 'creative-gradient', name: 'Creative Gradient', description: '크리에이티브 그래디언트', previewUrl: '', category: 'creative', isPremium: true, colors: ['#1e1b4b', '#7c3aed', '#ec4899'] },
  { id: 'clean-white', name: 'Clean White', description: '심플한 화이트 테마', previewUrl: '', category: 'minimal', isPremium: true, colors: ['#ffffff', '#3b82f6'] },
  { id: 'neon-nights', name: 'Neon Nights', description: '네온 감성 다크 테마', previewUrl: '', category: 'creative', isPremium: true, colors: ['#0a0a0a', '#22d3ee', '#a855f7'] },
  { id: 'corporate', name: 'Corporate', description: '프로페셔널 비즈니스', previewUrl: '', category: 'professional', isPremium: true, colors: ['#1e293b', '#0ea5e9'] },
  { id: 'portfolio-plus', name: 'Portfolio Plus', description: '포트폴리오 특화', previewUrl: '', category: 'developer', isPremium: true, colors: ['#18181b', '#f97316'] },
  { id: 'modern-stack', name: 'Modern Stack', description: '모던 스택 쇼케이스', previewUrl: '', category: 'developer', isPremium: false, colors: ['#020617', '#10b981'] },
  { id: 'elegant', name: 'Elegant', description: '우아한 디자인', previewUrl: '', category: 'professional', isPremium: true, colors: ['#1c1917', '#d97706'] },
  { id: 'starter', name: 'Starter', description: '빠르게 시작하기', previewUrl: '', category: 'minimal', isPremium: false, colors: ['#09090b', '#6366f1'] },
];
