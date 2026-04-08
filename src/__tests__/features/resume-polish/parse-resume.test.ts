import { describe, it, expect } from 'vitest';
import { parseResume } from '@/features/resume-polish/lib/parse-resume';
import type { ResumeSection } from '@/features/resume-polish/lib/parse-resume';

describe('parseResume', () => {
  describe('빈 입력 처리', () => {
    it('빈 문자열이면 빈 배열을 반환한다', () => {
      expect(parseResume('')).toEqual([]);
    });

    it('공백만 있는 문자열이면 빈 배열을 반환한다', () => {
      expect(parseResume('   \n   \n   ')).toEqual([]);
    });

    it('개행문자만 있으면 빈 배열을 반환한다', () => {
      expect(parseResume('\n\n\n')).toEqual([]);
    });
  });

  describe('마크다운 헤더(#) 파싱', () => {
    it('# 헤더로 섹션을 분리한다', () => {
      const text = '# 자기소개\n저는 개발자입니다.';
      const result = parseResume(text);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('자기소개');
      expect(result[0].content).toBe('저는 개발자입니다.');
    });

    it('## 헤더로 섹션을 분리한다', () => {
      const text = '## 경력사항\n회사A에서 3년 근무했습니다.';
      const result = parseResume(text);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('경력사항');
    });

    it('### 헤더로 섹션을 분리한다', () => {
      const text = '### 프로젝트\nNext.js 프로젝트를 개발했습니다.';
      const result = parseResume(text);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('프로젝트');
    });

    it('여러 개의 # 헤더를 각각 다른 섹션으로 분리한다', () => {
      const text = '# 자기소개\n저는 개발자입니다.\n## 경력\n3년 경력';
      const result = parseResume(text);
      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('자기소개');
      expect(result[1].title).toBe('경력');
    });

    it('헤더 앞의 # 기호를 제거하고 타이틀로 저장한다', () => {
      const text = '## 기술 스택\nReact, TypeScript';
      const result = parseResume(text);
      expect(result[0].title).toBe('기술 스택');
      expect(result[0].title).not.toContain('#');
    });
  });

  describe('【】 브라켓 헤더 파싱', () => {
    it('【】 형식의 헤더를 섹션 제목으로 파싱한다', () => {
      const text = '【학력】\n서울대학교 컴퓨터공학과';
      const result = parseResume(text);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('학력');
    });

    it('【】 기호를 제거하고 타이틀로 저장한다', () => {
      const text = '【경력사항】\n회사 근무';
      const result = parseResume(text);
      expect(result[0].title).not.toContain('【');
      expect(result[0].title).not.toContain('】');
    });
  });

  describe('[] 브라켓 헤더 파싱', () => {
    it('[] 형식의 헤더를 섹션 제목으로 파싱한다', () => {
      const text = '[기술스택]\nReact, Vue';
      const result = parseResume(text);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('기술스택');
    });

    it('[] 기호를 제거하고 타이틀로 저장한다', () => {
      const text = '[프로젝트]\n개인 프로젝트';
      const result = parseResume(text);
      expect(result[0].title).not.toContain('[');
      expect(result[0].title).not.toContain(']');
    });
  });

  describe('콜론(:) 패턴 헤더 파싱', () => {
    it('한글 단어 + 콜론 패턴을 헤더로 인식한다', () => {
      const text = '경력:\n회사A 3년';
      const result = parseResume(text);
      expect(result).toHaveLength(1);
    });

    it('영문 대문자 단어 + 콜론 패턴을 헤더로 인식한다', () => {
      const text = 'EXPERIENCE:\n3 years at Company';
      const result = parseResume(text);
      expect(result).toHaveLength(1);
    });

    it('전각 콜론(：)도 헤더로 인식한다', () => {
      const text = '학력：\n서울대학교';
      const result = parseResume(text);
      expect(result).toHaveLength(1);
    });
  });

  describe('헤더 없는 텍스트 처리', () => {
    it('헤더 없는 내용은 "기본 정보" 섹션으로 분류된다', () => {
      const text = '홍길동\n서울시 강남구\n010-1234-5678';
      const result = parseResume(text);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('기본 정보');
    });
  });

  describe('섹션 내용(content) 처리', () => {
    it('섹션 내용을 trim하여 저장한다', () => {
      const text = '# 소개\n\n  저는 개발자입니다.  \n\n';
      const result = parseResume(text);
      expect(result[0].content).toBe('저는 개발자입니다.');
    });

    it('여러 줄 내용을 하나의 content로 합친다', () => {
      const text = '# 경력\n회사A: 2020-2022\n회사B: 2022-현재';
      const result = parseResume(text);
      expect(result[0].content).toContain('회사A');
      expect(result[0].content).toContain('회사B');
    });

    it('내용이 없는 섹션(빈 줄만)은 섹션으로 저장하지 않는다', () => {
      const text = '# 빈섹션\n\n\n# 내용있는섹션\n실제 내용';
      const result = parseResume(text);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('내용있는섹션');
    });
  });

  describe('복합 이력서 파싱', () => {
    it('실제 이력서 형식의 텍스트를 올바르게 파싱한다', () => {
      const text = [
        '홍길동',
        'hong@example.com',
        '',
        '## 경력사항',
        '- 카카오 3년',
        '- 네이버 2년',
        '',
        '## 기술스택',
        'React, TypeScript, Node.js',
        '',
        '## 학력',
        '서울대학교 컴퓨터공학과 졸업',
      ].join('\n');

      const result = parseResume(text);
      expect(result.length).toBeGreaterThanOrEqual(3);

      const titles = result.map((s: ResumeSection) => s.title);
      expect(titles).toContain('경력사항');
      expect(titles).toContain('기술스택');
      expect(titles).toContain('학력');
    });

    it('각 섹션의 title과 content가 ResumeSection 인터페이스를 만족한다', () => {
      const text = '## 소개\n안녕하세요.';
      const result = parseResume(text);
      expect(result[0]).toHaveProperty('title');
      expect(result[0]).toHaveProperty('content');
      expect(typeof result[0].title).toBe('string');
      expect(typeof result[0].content).toBe('string');
    });
  });
});
