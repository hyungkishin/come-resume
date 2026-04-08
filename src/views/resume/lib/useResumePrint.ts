type PageFormat = 'A4' | 'Letter';

export function useResumePrint(format: PageFormat) {
  const handlePrint = () => {
    const printContent = document.getElementById('resume-print-area');
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <title>이력서 — Foliofy</title>
        <link rel="preconnect" href="https://cdn.jsdelivr.net">
        <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" rel="stylesheet">
        <style>
          @page {
            size: ${format};
            margin: 18mm 20mm;
          }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Pretendard', 'Apple SD Gothic Neo', -apple-system, BlinkMacSystemFont, sans-serif;
            color: #1a1a1a;
            line-height: 1.65;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          h1 { font-size: 28px; font-weight: 700; letter-spacing: -0.3px; color: #111; margin: 0; }
          .subtitle { font-size: 15px; color: #2563eb; font-weight: 500; margin: 6px 0 0; }
          .contact { font-size: 12px; color: #666; margin: 8px 0 0; letter-spacing: 0.3px; }
          .header-block { margin-bottom: 28px; padding-bottom: 20px; border-bottom: 2px solid #111; }
          .section-title {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2.5px;
            color: #2563eb;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 6px;
            margin-top: 24px;
            margin-bottom: 12px;
          }
          .section-title:first-of-type { margin-top: 0; }
          h3 { font-size: 14px; font-weight: 600; color: #1a1a1a; margin: 14px 0 6px; }
          ul { padding-left: 18px; margin: 6px 0 10px; list-style: none; }
          li {
            font-size: 13px;
            margin: 4px 0;
            padding-left: 12px;
            position: relative;
            color: #374151;
            line-height: 1.7;
          }
          li::before {
            content: '';
            position: absolute;
            left: 0;
            top: 10px;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #2563eb;
          }
          p { margin: 6px 0; font-size: 13px; color: #4b5563; line-height: 1.7; }
          .footer {
            margin-top: 32px;
            padding-top: 12px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            font-size: 9px;
            color: #9ca3af;
            letter-spacing: 0.5px;
          }
        </style>
      </head>
      <body>
        ${printContent.innerHTML}
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return { handlePrint };
}
