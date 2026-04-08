'use client';

import { useState } from 'react';
import { Rocket, Check, ExternalLink } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/button/Button';

type DeployState = 'idle' | 'deploying' | 'deployed';

export function DeployButton() {
  const [state, setState] = useState<DeployState>('idle');
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null);

  const handleDeploy = () => {
    setState('deploying');
    setTimeout(() => {
      setState('deployed');
      setDeployedUrl('https://username.foliofy.dev');
    }, 2000);
  };

  if (state === 'deployed' && deployedUrl) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
          <Check className="h-5 w-5 text-emerald-400" />
          <span className="text-sm font-medium text-zinc-100">배포 완료!</span>
        </div>
        <a
          href={deployedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          {deployedUrl}
        </a>
        <Button variant="outline" size="sm" onClick={() => setState('idle')}>
          다시 배포
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="primary"
      size="lg"
      isLoading={state === 'deploying'}
      onClick={handleDeploy}
      className="w-full"
    >
      {state !== 'deploying' && <Rocket className="h-5 w-5" />}
      {state === 'deploying' ? '배포 중...' : '배포하기'}
    </Button>
  );
}
