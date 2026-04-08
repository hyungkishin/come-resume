import type { GitHubRepo } from '../model/types';

export function extractSkills(repos: GitHubRepo[]): string[] {
  const frequency: Record<string, number> = {};

  for (const repo of repos) {
    if (repo.language) {
      frequency[repo.language] = (frequency[repo.language] ?? 0) + 1;
    }
    for (const topic of repo.topics) {
      frequency[topic] = (frequency[topic] ?? 0) + 1;
    }
  }

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .map(([skill]) => skill);
}
