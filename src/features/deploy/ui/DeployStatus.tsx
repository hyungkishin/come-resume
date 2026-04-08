'use client';

import { Rocket, Check, X, Zap } from '@/shared/ui/icons';
import { Badge } from '@/shared/ui/badge/Badge';
import { cn } from '@/shared/lib/cn';

export type DeployStatusType = 'idle' | 'deploying' | 'deployed' | 'failed';

interface DeployStatusProps {
  status: DeployStatusType;
}

const STATUS_CONFIG: Record<
  DeployStatusType,
  { label: string; icon: React.ReactNode; badgeVariant: 'default' | 'blue' | 'green' | 'red' }
> = {
  idle: {
    label: '대기 중',
    icon: <Zap className="h-4 w-4" />,
    badgeVariant: 'default',
  },
  deploying: {
    label: '배포 중',
    icon: <Rocket className="h-4 w-4 animate-bounce" />,
    badgeVariant: 'blue',
  },
  deployed: {
    label: '배포 완료',
    icon: <Check className="h-4 w-4" />,
    badgeVariant: 'green',
  },
  failed: {
    label: '배포 실패',
    icon: <X className="h-4 w-4" />,
    badgeVariant: 'red',
  },
};

export function DeployStatus({ status }: DeployStatusProps) {
  const config = STATUS_CONFIG[status];

  return (
    <div className="flex items-center gap-2">
      <Badge
        variant={config.badgeVariant}
        className={cn(
          'flex items-center gap-1.5',
          status === 'deploying' && 'animate-pulse'
        )}
      >
        {config.icon}
        {config.label}
      </Badge>
    </div>
  );
}
