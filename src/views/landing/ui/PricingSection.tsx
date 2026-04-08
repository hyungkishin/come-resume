'use client';

import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/button/Button';
import { Badge } from '@/shared/ui/badge/Badge';
import { Check } from '@/shared/ui/icons';
import { PLANS } from '@/shared/config/constants';
import { cn } from '@/shared/lib/cn';

interface PricingCardProps {
  name: string;
  price: number;
  period?: string;
  features: readonly string[];
  highlighted?: boolean;
  cta: string;
  badge?: string;
}

function PricingCard({
  name,
  price,
  period,
  features,
  highlighted,
  cta,
  badge,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl border p-8',
        highlighted
          ? 'border-blue-500/30 bg-zinc-900 shadow-lg shadow-blue-500/5'
          : 'border-zinc-800 bg-zinc-900/50'
      )}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="blue">{badge}</Badge>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-100">{name}</h3>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-4xl font-bold text-zinc-50">
            ${price}
          </span>
          {period && (
            <span className="text-sm text-zinc-500">/{period}</span>
          )}
        </div>
      </div>

      <ul className="mb-8 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
            <span className="text-sm text-zinc-300">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={highlighted ? 'primary' : 'outline'}
        size="lg"
        className="w-full"
      >
        {cta}
      </Button>
    </div>
  );
}

export function PricingSection() {
  return (
    <section id="pricing" className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            심플한 가격, 확실한 가치
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            무료로 시작하고, 필요할 때 업그레이드하세요.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0 }}
          >
            <PricingCard
              name={PLANS.FREE.name}
              price={PLANS.FREE.price}
              features={PLANS.FREE.features}
              cta="무료로 시작"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <PricingCard
              name={PLANS.PRO.name}
              price={PLANS.PRO.price}
              period="월"
              features={PLANS.PRO.features}
              highlighted
              cta="Pro 시작하기"
              badge="추천"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <PricingCard
              name={PLANS.LIFETIME.name}
              price={PLANS.LIFETIME.price}
              features={PLANS.LIFETIME.features}
              cta="얼리버드 구매"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
