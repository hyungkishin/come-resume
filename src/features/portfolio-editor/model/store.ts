import { create } from 'zustand';
import type { PortfolioSection, PortfolioTheme, SectionType } from '@/shared/types';
import { getSectionDefaults } from '../lib/section-defaults';

interface EditorState {
  sections: PortfolioSection[];
  theme: PortfolioTheme;
  activeSection: string | null;
  isDirty: boolean;
  addSection: (type: SectionType) => void;
  removeSection: (id: string) => void;
  reorderSections: (activeId: string, overId: string) => void;
  updateSectionData: (id: string, data: Record<string, unknown>) => void;
  toggleSectionVisibility: (id: string) => void;
  setActiveSection: (id: string | null) => void;
  setTheme: (theme: Partial<PortfolioTheme>) => void;
  loadSections: (sections: PortfolioSection[]) => void;
}

const DEFAULT_THEME: PortfolioTheme = {
  templateId: 'minimal-dark',
  primaryColor: '#3b82f6',
  fontFamily: 'Geist Sans',
  darkMode: true,
  customCSS: null,
};

export const useEditorStore = create<EditorState>((set) => ({
  sections: [],
  theme: DEFAULT_THEME,
  activeSection: null,
  isDirty: false,

  addSection: (type) =>
    set((state) => {
      const newSection: PortfolioSection = {
        id: crypto.randomUUID(),
        type,
        order: state.sections.length,
        data: getSectionDefaults(type) as Record<string, unknown>,
        isVisible: true,
      };
      return {
        sections: [...state.sections, newSection],
        isDirty: true,
      };
    }),

  removeSection: (id) =>
    set((state) => ({
      sections: state.sections
        .filter((s) => s.id !== id)
        .map((s, i) => ({ ...s, order: i })),
      activeSection: state.activeSection === id ? null : state.activeSection,
      isDirty: true,
    })),

  reorderSections: (activeId, overId) =>
    set((state) => {
      const sections = [...state.sections];
      const activeIndex = sections.findIndex((s) => s.id === activeId);
      const overIndex = sections.findIndex((s) => s.id === overId);
      if (activeIndex === -1 || overIndex === -1) return state;
      const [moved] = sections.splice(activeIndex, 1);
      sections.splice(overIndex, 0, moved);
      return {
        sections: sections.map((s, i) => ({ ...s, order: i })),
        isDirty: true,
      };
    }),

  updateSectionData: (id, data) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === id ? { ...s, data: { ...s.data, ...data } } : s
      ),
      isDirty: true,
    })),

  toggleSectionVisibility: (id) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === id ? { ...s, isVisible: !s.isVisible } : s
      ),
      isDirty: true,
    })),

  setActiveSection: (id) => set({ activeSection: id }),

  setTheme: (partial) =>
    set((state) => ({
      theme: { ...state.theme, ...partial },
      isDirty: true,
    })),

  loadSections: (sections) =>
    set({
      sections,
      isDirty: false,
    }),
}));
