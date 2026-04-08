'use client';

import { useRef, useEffect } from 'react';
import { Input } from '@/shared/ui/input/Input';

interface ProfileData {
  name: string;
  title: string;
  bio: string;
}

interface ProfileErrors {
  name?: string;
  title?: string;
  bio?: string;
}

interface Step1ProfileFormProps {
  profile: ProfileData;
  errors: ProfileErrors;
  onChange: (field: keyof ProfileData, value: string) => void;
  isFocusTarget: boolean;
}

export function Step1ProfileForm({ profile, errors, onChange, isFocusTarget }: Step1ProfileFormProps) {
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocusTarget) {
      firstInputRef.current?.focus();
    }
  }, [isFocusTarget]);

  return (
    <div className="space-y-4">
      <Input
        ref={firstInputRef}
        id="onboard-name"
        label="이름"
        placeholder="홍길동"
        value={profile.name}
        onChange={e => onChange('name', e.target.value)}
        error={errors.name}
        aria-invalid={!!errors.name}
        aria-describedby={errors.name ? 'onboard-name-error' : undefined}
        required
        autoComplete="name"
      />
      <Input
        id="onboard-title"
        label="직함"
        placeholder="프론트엔드 개발자"
        value={profile.title}
        onChange={e => onChange('title', e.target.value)}
        error={errors.title}
        aria-invalid={!!errors.title}
        aria-describedby={errors.title ? 'onboard-title-error' : undefined}
        autoComplete="organization-title"
      />
      <Input
        id="onboard-bio"
        label="한줄 소개"
        placeholder="저는 사용자 경험을 중시하는 개발자입니다"
        value={profile.bio}
        onChange={e => onChange('bio', e.target.value)}
        error={errors.bio}
        aria-invalid={!!errors.bio}
        aria-describedby={errors.bio ? 'onboard-bio-error' : undefined}
      />
    </div>
  );
}
