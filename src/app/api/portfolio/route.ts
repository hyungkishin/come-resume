import { type NextRequest, NextResponse } from 'next/server';

const MOCK_PORTFOLIO = {
  id: 'p1',
  userId: 'u1',
  title: '신형기 포트폴리오',
  slug: 'hyungki',
  templateId: 'minimal-dark',
  publishedUrl: 'https://hyungki.foliofy.dev',
  isPublished: true,
  createdAt: '2026-01-15T09:00:00Z',
  updatedAt: '2026-04-01T12:00:00Z',
  sections: [
    { id: 'sec1', type: 'hero', order: 1 },
    { id: 'sec2', type: 'about', order: 2 },
    { id: 'sec3', type: 'projects', order: 3 },
    { id: 'sec4', type: 'skills', order: 4 },
    { id: 'sec5', type: 'contact', order: 5 },
  ],
};

export async function GET() {
  return NextResponse.json(MOCK_PORTFOLIO);
}

export async function POST(request: NextRequest) {
  const body = await request.json() as Record<string, unknown>;

  const created = {
    id: `p_${Date.now()}`,
    ...body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return NextResponse.json(created, { status: 201 });
}
