export interface ResumeSection {
  title: string;
  content: string;
}

export function parseResume(text: string): ResumeSection[] {
  const headerPattern = /^(#{1,3}\s+.+|【.+】|\[.+\]|[A-Z가-힣].{0,20}[:：])$/m;
  const lines = text.split('\n');
  const sections: ResumeSection[] = [];

  let currentTitle = '기본 정보';
  let currentLines: string[] = [];

  for (const line of lines) {
    if (headerPattern.test(line.trim()) && line.trim().length > 0) {
      if (currentLines.some((l) => l.trim().length > 0)) {
        sections.push({ title: currentTitle, content: currentLines.join('\n').trim() });
      }
      currentTitle = line.trim().replace(/^#{1,3}\s+/, '').replace(/[【】\[\]]/g, '');
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }

  if (currentLines.some((l) => l.trim().length > 0)) {
    sections.push({ title: currentTitle, content: currentLines.join('\n').trim() });
  }

  return sections;
}
