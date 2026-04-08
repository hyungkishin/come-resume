'use client';

import { HeroSection } from './HeroSection';
import { FeatureSection } from './FeatureSection';
import { TestimonialSection } from './TestimonialSection';
import { PricingSection } from './PricingSection';

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <TestimonialSection />
      <PricingSection />

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-zinc-500">
            &copy; 2026 Foliofy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="/terms" className="text-sm text-zinc-500 transition-colors hover:text-zinc-300">
              이용약관
            </a>
            <a href="/privacy" className="text-sm text-zinc-500 transition-colors hover:text-zinc-300">
              개인정보처리방침
            </a>
            <a href="mailto:hello@foliofy.dev" className="text-sm text-zinc-500 transition-colors hover:text-zinc-300">
              문의하기
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
