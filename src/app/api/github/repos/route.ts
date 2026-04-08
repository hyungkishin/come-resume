import { type NextRequest, NextResponse } from 'next/server';

const MOCK_REPOS = [
  {
    id: 'r1',
    name: 'foliofy',
    fullName: 'hyungkishin/foliofy',
    description: 'AI 포트폴리오 빌더 & 이력서 폴리셔',
    language: 'TypeScript',
    stars: 312,
    forks: 48,
    updatedAt: '2026-04-01T10:00:00Z',
    htmlUrl: 'https://github.com/hyungkishin/foliofy',
    homepage: 'https://foliofy.dev',
    topics: ['nextjs', 'ai', 'portfolio', 'resume'],
    isPinned: true,
  },
  {
    id: 'r2',
    name: 'react-hooks-toolkit',
    fullName: 'hyungkishin/react-hooks-toolkit',
    description: '재사용 가능한 React 커스텀 훅 모음',
    language: 'TypeScript',
    stars: 187,
    forks: 23,
    updatedAt: '2026-03-20T08:30:00Z',
    htmlUrl: 'https://github.com/hyungkishin/react-hooks-toolkit',
    homepage: '',
    topics: ['react', 'hooks', 'typescript'],
    isPinned: true,
  },
  {
    id: 'r3',
    name: 'go-api-boilerplate',
    fullName: 'hyungkishin/go-api-boilerplate',
    description: 'Go + Gin 기반 REST API 보일러플레이트',
    language: 'Go',
    stars: 95,
    forks: 31,
    updatedAt: '2026-02-14T15:20:00Z',
    htmlUrl: 'https://github.com/hyungkishin/go-api-boilerplate',
    homepage: '',
    topics: ['go', 'gin', 'rest-api', 'boilerplate'],
    isPinned: false,
  },
  {
    id: 'r4',
    name: 'data-visualizer',
    fullName: 'hyungkishin/data-visualizer',
    description: 'D3.js + Python으로 만든 데이터 시각화 도구',
    language: 'Python',
    stars: 64,
    forks: 12,
    updatedAt: '2026-01-05T09:45:00Z',
    htmlUrl: 'https://github.com/hyungkishin/data-visualizer',
    homepage: '',
    topics: ['python', 'd3js', 'data-visualization'],
    isPinned: false,
  },
  {
    id: 'r5',
    name: 'vue-dashboard',
    fullName: 'hyungkishin/vue-dashboard',
    description: 'Vue 3 + Vite 어드민 대시보드 템플릿',
    language: 'JavaScript',
    stars: 42,
    forks: 8,
    updatedAt: '2025-12-22T11:00:00Z',
    htmlUrl: 'https://github.com/hyungkishin/vue-dashboard',
    homepage: 'https://vue-dashboard-demo.vercel.app',
    topics: ['vue', 'vite', 'dashboard', 'admin'],
    isPinned: false,
  },
  {
    id: 'r6',
    name: 'terraform-aws-infra',
    fullName: 'hyungkishin/terraform-aws-infra',
    description: 'AWS ECS + RDS + CloudFront Terraform 인프라 코드',
    language: 'HCL',
    stars: 28,
    forks: 5,
    updatedAt: '2025-11-30T16:10:00Z',
    htmlUrl: 'https://github.com/hyungkishin/terraform-aws-infra',
    homepage: '',
    topics: ['terraform', 'aws', 'ecs', 'infrastructure'],
    isPinned: false,
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sort = searchParams.get('sort') ?? 'stars';
  const limit = parseInt(searchParams.get('limit') ?? '6', 10);

  let repos = [...MOCK_REPOS];

  if (sort === 'stars') {
    repos.sort((a, b) => b.stars - a.stars);
  } else if (sort === 'updated') {
    repos.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  return NextResponse.json(repos.slice(0, limit));
}
