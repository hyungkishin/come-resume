export interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
  htmlUrl: string;
  homepage: string | null;
  topics: string[];
  isPinned: boolean;
}
