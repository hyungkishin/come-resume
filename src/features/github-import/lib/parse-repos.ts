import type { Project } from '@/shared/types';
import type { GitHubRepo } from '../model/types';

export function parsReposToProjects(repos: GitHubRepo[]): Project[] {
  return repos.map((repo) => {
    const technologies: string[] = [];
    if (repo.language) technologies.push(repo.language);
    repo.topics.forEach((topic) => {
      if (!technologies.includes(topic)) technologies.push(topic);
    });

    return {
      id: String(repo.id),
      portfolioId: '',
      githubRepoId: repo.id,
      title: repo.name,
      description: repo.description ?? '',
      longDescription: repo.description ?? '',
      technologies,
      imageUrl: null,
      liveUrl: repo.homepage,
      githubUrl: repo.htmlUrl,
      stars: repo.stars,
      order: 0,
    };
  });
}
