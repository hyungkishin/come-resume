export interface DiffSegment {
  type: 'unchanged' | 'added' | 'removed';
  text: string;
}

export function computeDiff(original: string, polished: string): DiffSegment[] {
  const originalLines = original.split('\n');
  const polishedLines = polished.split('\n');

  const originalSet = new Set(originalLines);
  const polishedSet = new Set(polishedLines);

  const segments: DiffSegment[] = [];

  const allLines = [...originalLines];
  for (const line of polishedLines) {
    if (!originalSet.has(line)) {
      allLines.push(line);
    }
  }

  for (const line of originalLines) {
    if (polishedSet.has(line)) {
      segments.push({ type: 'unchanged', text: line });
    } else {
      segments.push({ type: 'removed', text: line });
    }
  }

  for (const line of polishedLines) {
    if (!originalSet.has(line)) {
      segments.push({ type: 'added', text: line });
    }
  }

  return segments;
}
