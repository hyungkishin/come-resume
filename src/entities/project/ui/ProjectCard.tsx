'use client';

import { Card } from '@/shared/ui/card/Card';
import { Badge } from '@/shared/ui/badge/Badge';
import { Code2, Star, ExternalLink } from '@/shared/ui/icons';
import { Github } from '@/shared/ui/icons';
import type { Project } from '@/shared/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, technologies, imageUrl, liveUrl, githubUrl, stars } = project;

  return (
    <Card hover className="flex flex-col gap-0 p-0 overflow-hidden">
      <div className="relative h-40 bg-zinc-800 flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <Code2 className="h-10 w-10 text-zinc-600" />
        )}
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-zinc-100 leading-snug">{title}</h3>
          {stars > 0 && (
            <div className="flex shrink-0 items-center gap-1 text-xs text-zinc-400">
              <Star className="h-3.5 w-3.5 text-amber-400" />
              <span>{stars}</span>
            </div>
          )}
        </div>

        {description && (
          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{description}</p>
        )}

        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <Badge key={tech} variant="blue">{tech}</Badge>
            ))}
          </div>
        )}

        {(githubUrl || liveUrl) && (
          <div className="flex items-center gap-3 pt-1">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>라이브</span>
              </a>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
