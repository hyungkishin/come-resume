'use client';

import { useState } from 'react';
import { Globe } from '@/shared/ui/icons';
import { Input } from '@/shared/ui/input/Input';
import { Badge } from '@/shared/ui/badge/Badge';
import { Button } from '@/shared/ui/button/Button';

interface DomainSettingsProps {
  username?: string;
}

export function DomainSettings({ username = 'username' }: DomainSettingsProps) {
  const [customDomain, setCustomDomain] = useState('');

  const defaultSubdomain = `${username}.foliofy.dev`;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-zinc-300">기본 서브도메인</span>
        <div className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5">
          <Globe className="h-4 w-4 shrink-0 text-zinc-500" />
          <span className="text-sm text-zinc-300">{defaultSubdomain}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-300">커스텀 도메인</span>
          <Badge variant="amber">Pro</Badge>
        </div>
        <Input
          placeholder="example.com"
          value={customDomain}
          onChange={(e) => setCustomDomain(e.target.value)}
        />
        <p className="text-xs text-zinc-500">
          DNS 설정에서 CNAME을 <code className="text-zinc-400">cname.foliofy.dev</code>로 지정하세요.
        </p>
        <Button variant="outline" size="sm" className="self-start">
          도메인 연결
        </Button>
      </div>
    </div>
  );
}
