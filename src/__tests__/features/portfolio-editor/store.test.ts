import { describe, it, expect, beforeEach } from 'vitest';
import { useEditorStore } from '@/features/portfolio-editor/model/store';
import type { SectionType } from '@/shared/types';

// 각 테스트 전 스토어를 초기 상태로 리셋
beforeEach(() => {
  useEditorStore.setState({
    sections: [],
    theme: {
      templateId: 'minimal-dark',
      primaryColor: '#3b82f6',
      fontFamily: 'Geist Sans',
      darkMode: true,
      customCSS: null,
    },
    activeSection: null,
    isDirty: false,
  });
});

describe('useEditorStore', () => {
  describe('초기 상태', () => {
    it('섹션 목록이 빈 배열로 초기화된다', () => {
      const { sections } = useEditorStore.getState();
      expect(sections).toEqual([]);
    });

    it('isDirty가 false로 초기화된다', () => {
      const { isDirty } = useEditorStore.getState();
      expect(isDirty).toBe(false);
    });

    it('activeSection이 null로 초기화된다', () => {
      const { activeSection } = useEditorStore.getState();
      expect(activeSection).toBeNull();
    });

    it('기본 테마가 올바르게 설정된다', () => {
      const { theme } = useEditorStore.getState();
      expect(theme.templateId).toBe('minimal-dark');
      expect(theme.primaryColor).toBe('#3b82f6');
      expect(theme.darkMode).toBe(true);
    });
  });

  describe('addSection', () => {
    it('섹션을 추가하면 sections 배열에 추가된다', () => {
      const { addSection } = useEditorStore.getState();
      addSection('hero');
      const { sections } = useEditorStore.getState();
      expect(sections).toHaveLength(1);
      expect(sections[0].type).toBe('hero');
    });

    it('추가된 섹션은 고유한 id를 가진다', () => {
      const { addSection } = useEditorStore.getState();
      addSection('hero');
      addSection('about');
      const { sections } = useEditorStore.getState();
      expect(sections[0].id).not.toBe(sections[1].id);
    });

    it('추가된 섹션은 isVisible이 true로 설정된다', () => {
      const { addSection } = useEditorStore.getState();
      addSection('projects');
      const { sections } = useEditorStore.getState();
      expect(sections[0].isVisible).toBe(true);
    });

    it('섹션 추가 후 isDirty가 true가 된다', () => {
      const { addSection } = useEditorStore.getState();
      addSection('skills');
      const { isDirty } = useEditorStore.getState();
      expect(isDirty).toBe(true);
    });

    it('여러 섹션 추가 시 order가 순서대로 설정된다', () => {
      const { addSection } = useEditorStore.getState();
      addSection('hero');
      addSection('about');
      addSection('projects');
      const { sections } = useEditorStore.getState();
      expect(sections[0].order).toBe(0);
      expect(sections[1].order).toBe(1);
      expect(sections[2].order).toBe(2);
    });

    it('모든 SectionType을 추가할 수 있다', () => {
      const { addSection } = useEditorStore.getState();
      const types: SectionType[] = ['hero', 'about', 'projects', 'skills', 'experience', 'education', 'contact', 'custom'];
      types.forEach((type) => addSection(type));
      const { sections } = useEditorStore.getState();
      expect(sections).toHaveLength(8);
    });
  });

  describe('removeSection', () => {
    it('id로 섹션을 삭제한다', () => {
      const { addSection } = useEditorStore.getState();
      addSection('hero');
      const { sections: beforeSections } = useEditorStore.getState();
      const targetId = beforeSections[0].id;

      useEditorStore.getState().removeSection(targetId);
      const { sections } = useEditorStore.getState();
      expect(sections).toHaveLength(0);
    });

    it('삭제 후 남은 섹션들의 order가 재정렬된다', () => {
      const { addSection } = useEditorStore.getState();
      addSection('hero');
      addSection('about');
      addSection('projects');
      const { sections: before } = useEditorStore.getState();
      const middleId = before[1].id;

      useEditorStore.getState().removeSection(middleId);
      const { sections } = useEditorStore.getState();
      expect(sections).toHaveLength(2);
      expect(sections[0].order).toBe(0);
      expect(sections[1].order).toBe(1);
    });

    it('삭제 후 isDirty가 true가 된다', () => {
      const { addSection } = useEditorStore.getState();
      addSection('hero');
      const { sections } = useEditorStore.getState();
      useEditorStore.setState({ isDirty: false });

      useEditorStore.getState().removeSection(sections[0].id);
      expect(useEditorStore.getState().isDirty).toBe(true);
    });

    it('activeSection으로 선택된 섹션 삭제 시 activeSection이 null이 된다', () => {
      const { addSection } = useEditorStore.getState();
      addSection('hero');
      const { sections } = useEditorStore.getState();
      const id = sections[0].id;

      useEditorStore.setState({ activeSection: id });
      useEditorStore.getState().removeSection(id);
      expect(useEditorStore.getState().activeSection).toBeNull();
    });

    it('activeSection이 아닌 섹션 삭제 시 activeSection은 변경되지 않는다', () => {
      const { addSection } = useEditorStore.getState();
      addSection('hero');
      addSection('about');
      const { sections } = useEditorStore.getState();

      useEditorStore.setState({ activeSection: sections[0].id });
      useEditorStore.getState().removeSection(sections[1].id);
      expect(useEditorStore.getState().activeSection).toBe(sections[0].id);
    });

    it('존재하지 않는 id로 삭제해도 오류가 발생하지 않는다', () => {
      const { addSection } = useEditorStore.getState();
      addSection('hero');
      expect(() => {
        useEditorStore.getState().removeSection('non-existent-id');
      }).not.toThrow();
      expect(useEditorStore.getState().sections).toHaveLength(1);
    });
  });

  describe('reorderSections', () => {
    it('두 섹션의 순서를 교체한다', () => {
      const { addSection } = useEditorStore.getState();
      addSection('hero');
      addSection('about');
      const { sections: before } = useEditorStore.getState();
      const heroId = before[0].id;
      const aboutId = before[1].id;

      useEditorStore.getState().reorderSections(heroId, aboutId);
      const { sections: after } = useEditorStore.getState();
      expect(after[0].type).toBe('about');
      expect(after[1].type).toBe('hero');
    });

    it('순서 변경 후 order 값이 인덱스와 일치한다', () => {
      const { addSection } = useEditorStore.getState();
      addSection('hero');
      addSection('about');
      addSection('projects');
      const { sections: before } = useEditorStore.getState();

      useEditorStore.getState().reorderSections(before[2].id, before[0].id);
      const { sections: after } = useEditorStore.getState();
      after.forEach((s, i) => {
        expect(s.order).toBe(i);
      });
    });

    it('순서 변경 후 isDirty가 true가 된다', () => {
      const { addSection } = useEditorStore.getState();
      addSection('hero');
      addSection('about');
      const { sections } = useEditorStore.getState();
      useEditorStore.setState({ isDirty: false });

      useEditorStore.getState().reorderSections(sections[0].id, sections[1].id);
      expect(useEditorStore.getState().isDirty).toBe(true);
    });

    it('존재하지 않는 id로 reorder 시 상태가 변경되지 않는다', () => {
      const { addSection } = useEditorStore.getState();
      addSection('hero');
      addSection('about');
      const before = useEditorStore.getState().sections;

      useEditorStore.getState().reorderSections('bad-id', before[0].id);
      const after = useEditorStore.getState().sections;
      expect(after[0].id).toBe(before[0].id);
      expect(after[1].id).toBe(before[1].id);
    });
  });

  describe('updateSectionData', () => {
    it('섹션의 data를 업데이트한다', () => {
      const { addSection } = useEditorStore.getState();
      addSection('hero');
      const { sections } = useEditorStore.getState();
      const id = sections[0].id;

      useEditorStore.getState().updateSectionData(id, { title: '안녕하세요' });
      const updated = useEditorStore.getState().sections.find((s) => s.id === id);
      expect(updated?.data.title).toBe('안녕하세요');
    });

    it('기존 data를 병합하여 업데이트한다 (덮어쓰기 아님)', () => {
      const { addSection } = useEditorStore.getState();
      addSection('hero');
      const { sections } = useEditorStore.getState();
      const id = sections[0].id;

      useEditorStore.getState().updateSectionData(id, { title: '제목' });
      useEditorStore.getState().updateSectionData(id, { subtitle: '부제목' });
      const updated = useEditorStore.getState().sections.find((s) => s.id === id);
      expect(updated?.data.title).toBe('제목');
      expect(updated?.data.subtitle).toBe('부제목');
    });

    it('data 업데이트 후 isDirty가 true가 된다', () => {
      const { addSection } = useEditorStore.getState();
      addSection('hero');
      const { sections } = useEditorStore.getState();
      useEditorStore.setState({ isDirty: false });

      useEditorStore.getState().updateSectionData(sections[0].id, { title: '변경' });
      expect(useEditorStore.getState().isDirty).toBe(true);
    });
  });

  describe('toggleSectionVisibility', () => {
    it('섹션 가시성을 토글한다 (true -> false)', () => {
      const { addSection } = useEditorStore.getState();
      addSection('hero');
      const { sections } = useEditorStore.getState();
      const id = sections[0].id;
      expect(sections[0].isVisible).toBe(true);

      useEditorStore.getState().toggleSectionVisibility(id);
      const after = useEditorStore.getState().sections.find((s) => s.id === id);
      expect(after?.isVisible).toBe(false);
    });

    it('섹션 가시성을 다시 토글하면 원래대로 돌아온다 (false -> true)', () => {
      const { addSection } = useEditorStore.getState();
      addSection('hero');
      const { sections } = useEditorStore.getState();
      const id = sections[0].id;

      useEditorStore.getState().toggleSectionVisibility(id);
      useEditorStore.getState().toggleSectionVisibility(id);
      const after = useEditorStore.getState().sections.find((s) => s.id === id);
      expect(after?.isVisible).toBe(true);
    });

    it('토글 후 isDirty가 true가 된다', () => {
      const { addSection } = useEditorStore.getState();
      addSection('hero');
      const { sections } = useEditorStore.getState();
      useEditorStore.setState({ isDirty: false });

      useEditorStore.getState().toggleSectionVisibility(sections[0].id);
      expect(useEditorStore.getState().isDirty).toBe(true);
    });
  });

  describe('setActiveSection', () => {
    it('activeSection을 특정 id로 설정한다', () => {
      const { addSection } = useEditorStore.getState();
      addSection('hero');
      const { sections } = useEditorStore.getState();
      const id = sections[0].id;

      useEditorStore.getState().setActiveSection(id);
      expect(useEditorStore.getState().activeSection).toBe(id);
    });

    it('activeSection을 null로 설정할 수 있다', () => {
      useEditorStore.setState({ activeSection: 'some-id' });
      useEditorStore.getState().setActiveSection(null);
      expect(useEditorStore.getState().activeSection).toBeNull();
    });

    it('setActiveSection은 isDirty를 변경하지 않는다', () => {
      useEditorStore.setState({ isDirty: false });
      useEditorStore.getState().setActiveSection('some-id');
      expect(useEditorStore.getState().isDirty).toBe(false);
    });
  });

  describe('setTheme', () => {
    it('테마의 일부 속성만 업데이트한다', () => {
      useEditorStore.getState().setTheme({ primaryColor: '#ff0000' });
      const { theme } = useEditorStore.getState();
      expect(theme.primaryColor).toBe('#ff0000');
      expect(theme.templateId).toBe('minimal-dark');
    });

    it('테마 업데이트 후 isDirty가 true가 된다', () => {
      useEditorStore.setState({ isDirty: false });
      useEditorStore.getState().setTheme({ darkMode: false });
      expect(useEditorStore.getState().isDirty).toBe(true);
    });

    it('여러 테마 속성을 동시에 업데이트한다', () => {
      useEditorStore.getState().setTheme({
        primaryColor: '#00ff00',
        fontFamily: 'Inter',
        darkMode: false,
      });
      const { theme } = useEditorStore.getState();
      expect(theme.primaryColor).toBe('#00ff00');
      expect(theme.fontFamily).toBe('Inter');
      expect(theme.darkMode).toBe(false);
    });
  });

  describe('loadSections', () => {
    it('섹션 목록을 로드하면 기존 섹션을 교체한다', () => {
      const { addSection } = useEditorStore.getState();
      addSection('hero');

      const newSections = [
        { id: 'test-id', type: 'about' as SectionType, order: 0, data: {}, isVisible: true },
      ];
      useEditorStore.getState().loadSections(newSections);
      const { sections } = useEditorStore.getState();
      expect(sections).toHaveLength(1);
      expect(sections[0].id).toBe('test-id');
    });

    it('섹션 로드 후 isDirty가 false로 설정된다', () => {
      useEditorStore.setState({ isDirty: true });
      useEditorStore.getState().loadSections([]);
      expect(useEditorStore.getState().isDirty).toBe(false);
    });

    it('빈 배열을 로드하면 섹션이 비워진다', () => {
      const { addSection } = useEditorStore.getState();
      addSection('hero');
      addSection('about');

      useEditorStore.getState().loadSections([]);
      expect(useEditorStore.getState().sections).toHaveLength(0);
    });
  });
});
