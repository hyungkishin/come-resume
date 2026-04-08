import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file || file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'PDF 파일이 필요합니다' }, { status: 400 });
    }

    // 클라이언트 사이드 fallback 안내
    return NextResponse.json(
      { error: 'server_unsupported', message: '서버 PDF 파싱은 준비 중입니다. 클라이언트에서 처리합니다.' },
      { status: 501 }
    );
  } catch {
    return NextResponse.json({ error: 'PDF 파싱 실패' }, { status: 500 });
  }
}
