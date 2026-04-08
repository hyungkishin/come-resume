import { create } from 'zustand';
import type { GitHubRepo } from './types';

interface GitHubImportState {
  repos: GitHubRepo[];
  selectedRepoIds: number[];
  isLoading: boolean;
  step: 'connect' | 'select' | 'preview';
  setRepos: (repos: GitHubRepo[]) => void;
  toggleRepo: (id: number) => void;
  selectAll: () => void;
  deselectAll: () => void;
  setStep: (step: GitHubImportState['step']) => void;
  setLoading: (loading: boolean) => void;
}

export const useGitHubImportStore = create<GitHubImportState>((set, get) => ({
  repos: [],
  selectedRepoIds: [],
  isLoading: false,
  step: 'connect',
  setRepos: (repos) => set({ repos }),
  toggleRepo: (id) => {
    const { selectedRepoIds } = get();
    const isSelected = selectedRepoIds.includes(id);
    set({
      selectedRepoIds: isSelected
        ? selectedRepoIds.filter((rid) => rid !== id)
        : [...selectedRepoIds, id],
    });
  },
  selectAll: () => set((state) => ({ selectedRepoIds: state.repos.map((r) => r.id) })),
  deselectAll: () => set({ selectedRepoIds: [] }),
  setStep: (step) => set({ step }),
  setLoading: (isLoading) => set({ isLoading }),
}));
