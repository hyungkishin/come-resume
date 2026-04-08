'use client';

import { motion } from 'framer-motion';
import { Card } from '@/shared/ui/card/Card';
import { Star } from '@/shared/ui/icons';

interface Testimonial {
  name: string;
  role: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: '김도현',
    role: '프론트엔드 개발자 3년차',
    text: 'GitHub 연결하고 5분 만에 포트폴리오가 완성됐어요. 디자인 감각이 없는 저한테 딱이었습니다.',
  },
  {
    name: '박서연',
    role: '백엔드 개발자',
    text: 'AI 이력서 폴리싱이 진짜 대박이에요. 두루뭉술하게 쓴 경력을 성과 중심으로 다듬어줘서 면접 통과율이 올랐습니다.',
  },
  {
    name: '최준혁',
    role: '풀스택 개발자 5년차',
    text: '이직할 때마다 포트폴리오 업데이트하는 게 귀찮았는데, GitHub 연동 덕분에 자동으로 최신 상태 유지됩니다.',
  },
];

export function TestimonialSection() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            개발자들이 선택한 이유
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card className="flex h-full flex-col justify-between">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <p className="mb-6 flex-grow text-sm leading-relaxed text-zinc-300">
                  {testimonial.text}
                </p>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-zinc-500">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
