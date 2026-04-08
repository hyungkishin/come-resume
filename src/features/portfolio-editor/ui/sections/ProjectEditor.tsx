'use client';

import { Button } from '@/shared/ui/button/Button';
import { Input } from '@/shared/ui/input/Input';
import { Plus, Trash2 } from '@/shared/ui/icons';
import type { ProjectsData } from '../../model/types';

interface ProjectEditorProps {
  data: ProjectsData;
  onChange: (data: ProjectsData) => void;
}

export function ProjectEditor({ data, onChange }: ProjectEditorProps) {
  const addProject = () => {
    onChange({ projectIds: [...data.projectIds, ''] });
  };

  const updateId = (index: number, value: string) => {
    const updated = [...data.projectIds];
    updated[index] = value;
    onChange({ projectIds: updated });
  };

  const removeProject = (index: number) => {
    onChange({ projectIds: data.projectIds.filter((_, i) => i !== index) });
  };

  return (
    <div className="flex flex-col gap-3">
      {data.projectIds.map((id, index) => (
        <div key={index} className="flex gap-2 items-end">
          <div className="flex-1">
            <Input
              id={`project-id-${index}`}
              label={index === 0 ? '프로젝트 ID' : undefined}
              placeholder="프로젝트 ID 입력"
              value={id}
              onChange={(e) => updateId(index, e.target.value)}
            />
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={() => removeProject(index)}
            className="mb-0.5"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addProject} className="self-start">
        <Plus className="h-3.5 w-3.5" />
        프로젝트 추가
      </Button>
    </div>
  );
}
