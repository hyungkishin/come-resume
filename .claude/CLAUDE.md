# Foliofy — AI 포트폴리오 빌더 & 이력서 폴리셔

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Architecture**: Feature-Sliced Design (FSD)
- **Language**: TypeScript (strict mode)
- **Animation**: Framer Motion 12.x
- **State**: Zustand 5.x
- **Editor**: Tiptap (이력서 에디터) + 드래그앤드롭 빌더
- **AI**: Claude API (이력서 다듬기, 자기소개 생성)
- **DB/Auth/Storage**: Supabase
- **Payment**: Stripe
- **Deploy**: Vercel

## Architecture: FSD (Feature-Sliced Design)
```
src/
├── app/          # Next.js App Router (엔트리포인트, 레이아웃, 라우팅)
├── pages/        # FSD pages layer (페이지 컴포지션)
├── widgets/      # 독립적인 UI 블록 (헤더, 사이드바 등)
├── features/     # 사용자 인터랙션 (포트폴리오 편집, 이력서 폴리싱 등)
├── entities/     # 비즈니스 엔티티 (Portfolio, Resume, Project, User)
└── shared/       # 공통 유틸, UI 키트, API 클라이언트, 타입
    ├── ui/
    ├── lib/
    ├── api/
    └── config/
```

## Conventions
- 컴포넌트: PascalCase (`ResumeEditor.tsx`)
- 유틸/훅: camelCase (`useResumePolish.ts`)
- 상수: UPPER_SNAKE_CASE
- FSD slice 내부는 `index.ts`로 public API 노출
- 절대경로 import: `@/shared/ui`, `@/features/resume-editor` 등

## Design Principles
- 디자인 퀄리티 최우선 — 포트폴리오 빌더인 만큼 자체가 작품이어야 함
- 모바일 퍼스트 반응형
- 다크모드 기본 지원
- 애니메이션은 CSS + Framer Motion 활용
- 컬러 시스템, 타이포그래피, 스페이싱 일관성 유지

## Rules
- any 타입 사용 금지
- console.log 커밋 금지 (디버깅 후 제거)
- 컴포넌트당 200줄 이하
- FSD 레이어 간 의존성 규칙 엄수 (상위 → 하위만 import 가능)
- 커밋 메시지: conventional commits (feat, fix, refactor, style, docs)
