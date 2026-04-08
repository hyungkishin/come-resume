'use client';

import { Rocket, Github, ExternalLink } from '@/shared/ui/icons';
import { Badge } from '@/shared/ui/badge/Badge';
import { Button } from '@/shared/ui/button/Button';
import { Card } from '@/shared/ui/card/Card';
import { useGitHubImportStore } from '../model/store';
import { parsReposToProjects } from '../lib/parse-repos';

export function ImportPreview() {
  const { repos, selectedRepoIds, setStep } = useGitHubImportStore();

  const selectedRepos = repos.filter((r) => selectedRepoIds.includes(r.id));
  const projects = parsReposToProjects(selectedRepos);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-zinc-100">
          프로젝트 미리보기 ({projects.length}개)
        </h3>
        <Button variant="ghost" size="sm" onClick={() => setStep('select')}>
          뒤로
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto pr-1 sm:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.id} className="p-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-semibold text-zinc-100">{project.title}</span>
                <div className="flex gap-1">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
              {project.description && (
                <p className="text-xs text-zinc-400 line-clamp-2">{project.description}</p>
              )}
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 4).map((tech) => (
                  <Badge key={tech} variant="default">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 4 && (
                  <Badge variant="default">+{project.technologies.length - 4}</Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={() => {}}
      >
        <Rocket className="h-5 w-5" />
        포트폴리오 생성
      </Button>
    </div>
  );
}
