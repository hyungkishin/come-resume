# TRD: Foliofy — 기술 설계 문서

## 1. 기술 스택

| 영역 | 기술 | 선택 이유 |
|------|------|-----------|
| **Framework** | Next.js 16 (App Router) | RSC, SSG(포트폴리오), ISR |
| **Language** | TypeScript 5.x (strict) | 타입 안전성 |
| **Styling** | Tailwind CSS v4 | 유틸리티 퍼스트 |
| **Animation** | Framer Motion 12.x | 선언적 애니메이션 |
| **Editor** | Tiptap + dnd-kit | 리치 텍스트 + 드래그앤드롭 |
| **State** | Zustand 5.x | 경량, FSD 궁합 |
| **AI** | Claude API (Anthropic) | 이력서 폴리싱, 텍스트 생성 |
| **Auth** | Supabase Auth + GitHub OAuth | 소셜 로그인 + GitHub 데이터 |
| **DB** | Supabase (PostgreSQL) | 유저/포트폴리오/이력서 |
| **Storage** | Supabase Storage | 이미지, PDF |
| **PDF** | React-PDF / Puppeteer | 이력서 PDF 렌더링 |
| **Payment** | Stripe | 구독 + 일시불 결제 |
| **Deploy** | Vercel | Next.js 최적 배포, Edge |
| **Analytics** | Mixpanel + Vercel Analytics | 유저 행동 분석 |
| **Domain** | Vercel Domains API | 커스텀 도메인 연결 |

## 2. FSD 디렉토리 구조

```
src/
├── app/                              # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx                      # 랜딩 페이지
│   ├── dashboard/
│   │   └── page.tsx                  # 대시보드
│   ├── editor/
│   │   └── page.tsx                  # 포트폴리오 에디터
│   ├── resume/
│   │   └── page.tsx                  # 이력서 폴리셔
│   ├── templates/
│   │   └── page.tsx                  # 템플릿 갤러리
│   ├── [username]/                   # 배포된 포트폴리오 (SSG)
│   │   └── page.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   └── github/route.ts      # GitHub OAuth 콜백
│   │   ├── github/
│   │   │   ├── repos/route.ts       # 레포 목록 조회
│   │   │   └── profile/route.ts     # 프로필 데이터
│   │   ├── ai/
│   │   │   ├── polish/route.ts      # 이력서 폴리싱
│   │   │   ├── suggest/route.ts     # 개선 제안
│   │   │   └── generate/route.ts    # 자기소개 생성
│   │   ├── portfolio/
│   │   │   └── route.ts             # 포트폴리오 CRUD
│   │   ├── deploy/
│   │   │   └── route.ts             # 배포 트리거
│   │   ├── export/
│   │   │   └── pdf/route.ts         # PDF 생성
│   │   └── stripe/
│   │       ├── checkout/route.ts
│   │       └── webhook/route.ts
│   └── og/
│       └── [username]/route.tsx      # 동적 OG 이미지 생성
│
├── pages/                            # FSD Pages Layer
│   ├── landing/
│   │   ├── ui/
│   │   │   ├── LandingPage.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeatureSection.tsx
│   │   │   ├── PricingSection.tsx
│   │   │   └── TestimonialSection.tsx
│   │   └── index.ts
│   ├── dashboard/
│   │   ├── ui/
│   │   │   └── DashboardPage.tsx
│   │   └── index.ts
│   ├── editor/
│   │   ├── ui/
│   │   │   └── EditorPage.tsx
│   │   └── index.ts
│   └── resume/
│       ├── ui/
│       │   └── ResumePage.tsx
│       └── index.ts
│
├── widgets/                          # 독립 UI 블록
│   ├── header/
│   │   ├── ui/
│   │   │   └── Header.tsx
│   │   └── index.ts
│   ├── sidebar/
│   │   ├── ui/
│   │   │   └── EditorSidebar.tsx
│   │   └── index.ts
│   ├── section-palette/
│   │   ├── ui/
│   │   │   └── SectionPalette.tsx   # 드래그 가능한 섹션 목록
│   │   └── index.ts
│   ├── preview-frame/
│   │   ├── ui/
│   │   │   └── PreviewFrame.tsx     # 실시간 미리보기 iframe
│   │   └── index.ts
│   └── ai-assistant/
│       ├── ui/
│       │   └── AiAssistant.tsx      # AI 사이드 패널
│       └── index.ts
│
├── features/                         # 유저 인터랙션
│   ├── github-import/                # GitHub 데이터 임포트
│   │   ├── ui/
│   │   │   ├── GitHubConnectButton.tsx
│   │   │   ├── RepoSelector.tsx
│   │   │   └── ImportPreview.tsx
│   │   ├── api/
│   │   │   └── github-client.ts
│   │   ├── model/
│   │   │   ├── store.ts
│   │   │   └── types.ts
│   │   ├── lib/
│   │   │   ├── parse-repos.ts
│   │   │   └── extract-skills.ts
│   │   └── index.ts
│   │
│   ├── portfolio-editor/             # 포트폴리오 편집
│   │   ├── ui/
│   │   │   ├── SectionEditor.tsx
│   │   │   ├── DragDropCanvas.tsx
│   │   │   ├── StylePanel.tsx
│   │   │   └── sections/
│   │   │       ├── HeroEditor.tsx
│   │   │       ├── ProjectEditor.tsx
│   │   │       ├── SkillEditor.tsx
│   │   │       ├── ExperienceEditor.tsx
│   │   │       └── ContactEditor.tsx
│   │   ├── model/
│   │   │   ├── store.ts             # 에디터 상태
│   │   │   ├── types.ts
│   │   │   └── section-registry.ts
│   │   ├── lib/
│   │   │   └── section-defaults.ts
│   │   └── index.ts
│   │
│   ├── resume-polish/                # AI 이력서 폴리싱
│   │   ├── ui/
│   │   │   ├── ResumeInput.tsx       # 텍스트 입력/PDF 업로드
│   │   │   ├── PolishResult.tsx      # Before/After 비교
│   │   │   ├── ScoreCard.tsx         # 이력서 점수
│   │   │   └── JdMatcher.tsx         # JD 매칭 분석
│   │   ├── api/
│   │   │   └── polish-client.ts
│   │   ├── model/
│   │   │   ├── store.ts
│   │   │   └── types.ts
│   │   ├── lib/
│   │   │   ├── parse-resume.ts
│   │   │   └── diff-utils.ts        # Before/After 비교 로직
│   │   └── index.ts
│   │
│   ├── template-select/              # 템플릿 선택
│   │   ├── ui/
│   │   │   ├── TemplateGallery.tsx
│   │   │   └── TemplatePreview.tsx
│   │   ├── model/
│   │   │   └── types.ts
│   │   └── index.ts
│   │
│   ├── deploy/                       # 배포
│   │   ├── ui/
│   │   │   ├── DeployButton.tsx
│   │   │   ├── DomainSettings.tsx
│   │   │   └── DeployStatus.tsx
│   │   ├── api/
│   │   │   └── deploy-client.ts
│   │   └── index.ts
│   │
│   ├── export-pdf/                   # PDF 내보내기
│   │   ├── ui/
│   │   │   └── ExportDialog.tsx
│   │   ├── lib/
│   │   │   └── pdf-generator.ts
│   │   └── index.ts
│   │
│   └── auth/                         # 인증
│       ├── ui/
│       │   ├── AuthButton.tsx
│       │   └── AuthGuard.tsx
│       ├── model/
│       │   └── store.ts
│       └── index.ts
│
├── entities/                         # 비즈니스 엔티티
│   ├── portfolio/
│   │   ├── ui/
│   │   │   └── PortfolioCard.tsx
│   │   ├── model/
│   │   │   ├── types.ts
│   │   │   └── schema.ts
│   │   ├── api/
│   │   │   └── portfolio-api.ts
│   │   └── index.ts
│   ├── resume/
│   │   ├── model/
│   │   │   ├── types.ts
│   │   │   └── schema.ts
│   │   └── index.ts
│   ├── project/
│   │   ├── ui/
│   │   │   └── ProjectCard.tsx
│   │   ├── model/
│   │   │   └── types.ts
│   │   └── index.ts
│   ├── template/
│   │   ├── ui/
│   │   │   └── TemplateCard.tsx
│   │   ├── model/
│   │   │   └── types.ts
│   │   └── index.ts
│   └── user/
│       ├── model/
│       │   └── types.ts
│       └── index.ts
│
└── shared/                           # 공용
    ├── ui/
    │   ├── button/
    │   │   └── Button.tsx
    │   ├── input/
    │   │   └── Input.tsx
    │   ├── textarea/
    │   │   └── Textarea.tsx
    │   ├── card/
    │   │   └── Card.tsx
    │   ├── badge/
    │   │   └── Badge.tsx
    │   ├── dialog/
    │   │   └── Dialog.tsx
    │   ├── tabs/
    │   │   └── Tabs.tsx
    │   ├── tooltip/
    │   │   └── Tooltip.tsx
    │   ├── skeleton/
    │   │   └── Skeleton.tsx
    │   └── icons/
    │       └── index.tsx
    ├── lib/
    │   ├── cn.ts                     # clsx + twMerge
    │   ├── supabase/
    │   │   ├── client.ts
    │   │   └── server.ts
    │   └── analytics.ts
    ├── api/
    │   └── fetch-client.ts
    ├── config/
    │   └── constants.ts
    └── types/
        └── index.ts
```

## 3. 시스템 아키텍처

```
┌──────────────────────────────────────────────────────┐
│                      Client                           │
│                                                       │
│  ┌──────────┐  ┌───────────┐  ┌──────────────────┐  │
│  │Portfolio │  │  Resume   │  │    Template      │  │
│  │ Editor   │  │  Polisher │  │    Gallery       │  │
│  │(dnd-kit) │  │ (Tiptap)  │  │                  │  │
│  └────┬─────┘  └─────┬─────┘  └────────┬─────────┘  │
│       │               │                 │            │
│  ┌────┴───────────────┴─────────────────┴─────────┐  │
│  │              Zustand Stores                     │  │
│  └───────────────────┬─────────────────────────────┘  │
└──────────────────────┼───────────────────────────────┘
                       │
              ┌────────┴────────┐
              │  Next.js API    │
              │  Route Handlers │
              └──┬──┬──┬──┬──┬─┘
                 │  │  │  │  │
     ┌───────────┘  │  │  │  └───────────┐
     ▼              ▼  │  ▼              ▼
┌─────────┐  ┌──────┐ │ ┌──────┐  ┌──────────┐
│ GitHub  │  │Claude│ │ │Stripe│  │ Vercel   │
│  API    │  │ API  │ │ │      │  │Domains API│
└─────────┘  └──────┘ │ └──────┘  └──────────┘
                       │
                ┌──────┴──────┐
                │  Supabase   │
                │ Auth+DB+    │
                │  Storage    │
                └─────────────┘

배포된 포트폴리오:
┌──────────────────────────────┐
│  username.foliofy.dev        │
│  ┌────────────────────────┐  │
│  │  Next.js SSG           │  │  ← ISR로 빌드, CDN 캐싱
│  │  (정적 생성된 페이지)    │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

## 4. 핵심 데이터 모델

### 4.1 User

```typescript
interface User {
  id: string;
  email: string;
  username: string;                // foliofy.dev/username
  githubId: string;
  githubUsername: string;
  githubAvatarUrl: string;
  plan: 'free' | 'pro' | 'lifetime';
  stripeCustomerId: string | null;
  createdAt: string;
  updatedAt: string;
}
```

### 4.2 Portfolio

```typescript
interface Portfolio {
  id: string;
  userId: string;
  slug: string;                    // URL 슬러그
  title: string;
  sections: PortfolioSection[];
  theme: PortfolioTheme;
  customDomain: string | null;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface PortfolioSection {
  id: string;
  type: SectionType;
  order: number;
  data: SectionData;
  isVisible: boolean;
}

type SectionType =
  | 'hero'
  | 'about'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'education'
  | 'contact'
  | 'custom';

interface PortfolioTheme {
  templateId: string;
  primaryColor: string;
  fontFamily: string;
  darkMode: boolean;
  customCSS: string | null;
}
```

### 4.3 Project (GitHub 연동)

```typescript
interface Project {
  id: string;
  portfolioId: string;
  githubRepoId: number | null;
  title: string;
  description: string;
  longDescription: string;         // AI 생성 가능
  technologies: string[];
  imageUrl: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  stars: number;
  order: number;
}
```

### 4.4 Resume

```typescript
interface Resume {
  id: string;
  userId: string;
  originalText: string;
  polishedText: string;
  score: ResumeScore;
  suggestions: ResumeSuggestion[];
  templateId: string;
  createdAt: string;
}

interface ResumeScore {
  overall: number;                 // 0-100
  impact: number;                  // 성과 중심 표현
  clarity: number;                 // 명확성
  keywords: number;                // 키워드 최적화
  formatting: number;              // 구조/포맷
}

interface ResumeSuggestion {
  section: string;
  original: string;
  improved: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}
```

## 5. API 설계

### 5.1 GitHub 연동

```
GET  /api/github/profile           # GitHub 프로필 데이터
GET  /api/github/repos             # 레포지토리 목록 (정렬/필터)
  Query: sort=stars|updated, limit=20
POST /api/github/repos/import      # 선택한 레포 → 프로젝트로 변환
  Body: { repoIds: number[] }
```

### 5.2 AI 이력서

```
POST /api/ai/polish                # 이력서 전체 폴리싱
  Body: { text: string, language: 'ko' | 'en' }
  Response: { polished: string, score: ResumeScore, suggestions: ResumeSuggestion[] }

POST /api/ai/suggest               # 섹션별 개선 제안
  Body: { section: string, text: string }
  Response: { suggestions: ResumeSuggestion[] }

POST /api/ai/generate              # AI 텍스트 생성
  Body: { type: 'intro' | 'project-desc' | 'cover-letter', context: object }
  Response: { text: string, alternatives: string[] }

POST /api/ai/jd-match              # JD 매칭 분석
  Body: { resume: string, jobDescription: string }
  Response: { matchScore: number, missingKeywords: string[], suggestions: string[] }
```

### 5.3 포트폴리오

```
GET    /api/portfolio               # 내 포트폴리오 목록
POST   /api/portfolio               # 생성
GET    /api/portfolio/:id           # 상세
PATCH  /api/portfolio/:id           # 수정 (섹션/테마 변경)
DELETE /api/portfolio/:id           # 삭제
POST   /api/portfolio/:id/publish   # 배포
```

### 5.4 PDF 내보내기

```
POST /api/export/pdf                # 이력서 PDF 생성
  Body: { resumeId: string, templateId: string, format: 'a4' | 'letter' }
  Response: { pdfUrl: string }
```

## 6. 포트폴리오 렌더링 전략

배포된 포트폴리오는 **성능이 생명**이다. 채용 담당자가 느리면 바로 닫는다.

```
빌드 시점:
  Portfolio 데이터 → SSG 페이지 생성 → Vercel CDN 캐싱

업데이트 시:
  유저가 "배포" 클릭 → ISR revalidate → 새 정적 페이지 빌드

성능 목표:
  - LCP < 1.5s
  - CLS < 0.05
  - FCP < 0.8s
  - Lighthouse 95+
```

## 7. 디자인 시스템

### 7.1 컬러 토큰

```css
/* 앱 UI (다크 기반) */
--color-bg-primary: #09090b;         /* zinc-950 */
--color-bg-secondary: #18181b;       /* zinc-900 */
--color-bg-elevated: #27272a;        /* zinc-800 */
--color-border: #3f3f46;             /* zinc-700 */

--color-accent: #3b82f6;             /* blue-500 — 신뢰/테크 */
--color-accent-hover: #2563eb;       /* blue-600 */
--color-accent-subtle: #1e3a5f;      /* 배경 하이라이트 */

--color-success: #10b981;            /* emerald-500 */
--color-warning: #f59e0b;            /* amber-500 */
--color-error: #ef4444;              /* red-500 */

--color-text-primary: #fafafa;       /* zinc-50 */
--color-text-secondary: #a1a1aa;     /* zinc-400 */
--color-text-muted: #71717a;         /* zinc-500 */
```

### 7.2 타이포그래피

```
Heading:  Geist Sans (Bold 700) — Vercel 스타일, 모던
Body:     Geist Sans (Regular 400)
Mono:     Geist Mono — 코드/기술스택 표시
```

### 7.3 애니메이션

```typescript
const motion = {
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  stagger: {
    animate: { transition: { staggerChildren: 0.08 } }
  },
  spring: {
    type: 'spring', stiffness: 300, damping: 30
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }
  }
};
```

### 7.4 컴포넌트 스타일 가이드

```
Button:    rounded-lg, h-10/h-12, font-medium, 트랜지션 150ms
Card:      rounded-xl, border border-zinc-800, bg-zinc-900, p-6
Input:     rounded-lg, h-10, border border-zinc-700, focus:ring-2 ring-blue-500
Badge:     rounded-full, px-3 py-1, text-xs, font-medium
Dialog:    rounded-2xl, backdrop-blur, 스프링 애니메이션으로 등장
```

## 8. 보안

- GitHub 토큰: 서버사이드에서만 사용, 클라이언트 노출 금지
- Supabase RLS: 모든 테이블에 Row Level Security 적용
- API Rate Limiting: AI 엔드포인트 분당 10회 제한 (Free), 60회 (Pro)
- PDF 생성: 서버사이드 샌드박스에서 실행
- Stripe Webhook: 시그니처 검증 필수
- CSP 헤더: XSS 방지

## 9. 환경변수

```env
# GitHub
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# AI
ANTHROPIC_API_KEY=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# App
NEXT_PUBLIC_APP_URL=https://foliofy.dev
NEXT_PUBLIC_MIXPANEL_TOKEN=
```

## 10. Phase 1 구현 순서

1. Next.js 16 프로젝트 초기화 + Tailwind v4 + FSD 구조
2. `shared/ui` 디자인 시스템 (Button, Card, Input, Badge 등)
3. Supabase 셋업 (Auth + DB 스키마)
4. GitHub OAuth 로그인
5. GitHub 레포 데이터 fetch + 파싱
6. 포트폴리오 자동 생성 로직
7. 랜딩 페이지 (히어로, 피쳐, 프라이싱)
8. 대시보드 (내 포트폴리오 관리)
9. 포트폴리오 에디터 (섹션 추가/편집/정렬)
10. 실시간 미리보기
