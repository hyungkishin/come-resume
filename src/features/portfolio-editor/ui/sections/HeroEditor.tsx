'use client';

import { Input } from '@/shared/ui/input/Input';
import type { HeroData } from '../../model/types';

interface HeroEditorProps {
  data: HeroData;
  onChange: (data: HeroData) => void;
}

export function HeroEditor({ data, onChange }: HeroEditorProps) {
  const update = (field: keyof HeroData, value: string | null) =>
    onChange({ ...data, [field]: value });

  return (
    <div className="flex flex-col gap-4">
      <Input
        id="hero-name"
        label="이름"
        placeholder="홍길동"
        value={data.name}
        onChange={(e) => update('name', e.target.value)}
      />
      <Input
        id="hero-title"
        label="직함"
        placeholder="풀스택 개발자"
        value={data.title}
        onChange={(e) => update('title', e.target.value)}
      />
      <Input
        id="hero-subtitle"
        label="소개 문구"
        placeholder="한 줄 소개를 입력하세요"
        value={data.subtitle}
        onChange={(e) => update('subtitle', e.target.value)}
      />
      <Input
        id="hero-avatar"
        label="아바타 URL"
        placeholder="https://..."
        value={data.avatarUrl ?? ''}
        onChange={(e) => update('avatarUrl', e.target.value || null)}
      />
    </div>
  );
}
