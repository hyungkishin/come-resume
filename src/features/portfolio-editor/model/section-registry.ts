import type { SectionType } from '@/shared/types';

interface SectionMeta {
  type: SectionType;
  label: string;
  icon: string;
  description: string;
  maxCount: number;
}

export const SECTION_REGISTRY: SectionMeta[] = [
  { type: 'hero', label: '히어로', icon: 'Zap', description: '메인 소개 영역', maxCount: 1 },
  { type: 'about', label: '소개', icon: 'FileText', description: '자기소개', maxCount: 1 },
  { type: 'projects', label: '프로젝트', icon: 'Code2', description: '프로젝트 쇼케이스', maxCount: 1 },
  { type: 'skills', label: '기술 스택', icon: 'Zap', description: '보유 기술', maxCount: 1 },
  { type: 'experience', label: '경력', icon: 'Briefcase', description: '경력 사항', maxCount: 1 },
  { type: 'education', label: '학력', icon: 'GraduationCap', description: '학력 사항', maxCount: 1 },
  { type: 'contact', label: '연락처', icon: 'Mail', description: '연락처 정보', maxCount: 1 },
  { type: 'custom', label: '커스텀', icon: 'Plus', description: '자유 섹션', maxCount: 5 },
];
