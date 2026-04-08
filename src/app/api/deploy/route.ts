import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json() as { portfolioId: string };
  const { portfolioId } = body;

  return NextResponse.json({
    status: 'deployed',
    portfolioId,
    url: 'hyungki.foliofy.dev',
    deployedAt: new Date().toISOString(),
  });
}
