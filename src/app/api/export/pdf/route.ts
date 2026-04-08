import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json() as {
    resumeId: string;
    templateId: string;
    format: string;
  };

  const { resumeId, templateId } = body;

  return NextResponse.json({
    pdfUrl: `/mock-resume.pdf`,
    resumeId,
    templateId,
    message: 'PDF 생성 완료',
    generatedAt: new Date().toISOString(),
  });
}
