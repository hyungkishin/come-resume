'use client';

import { Input } from '@/shared/ui/input/Input';
import type { ContactData } from '../../model/types';

interface ContactEditorProps {
  data: ContactData;
  onChange: (data: ContactData) => void;
}

export function ContactEditor({ data, onChange }: ContactEditorProps) {
  const update = (field: keyof ContactData, value: string) =>
    onChange({ ...data, [field]: value });

  return (
    <div className="flex flex-col gap-4">
      <Input
        id="contact-email"
        label="이메일"
        type="email"
        placeholder="hello@example.com"
        value={data.email}
        onChange={(e) => update('email', e.target.value)}
      />
      <Input
        id="contact-github"
        label="GitHub"
        placeholder="https://github.com/username"
        value={data.github}
        onChange={(e) => update('github', e.target.value)}
      />
      <Input
        id="contact-linkedin"
        label="LinkedIn"
        placeholder="https://linkedin.com/in/username"
        value={data.linkedin}
        onChange={(e) => update('linkedin', e.target.value)}
      />
      <Input
        id="contact-website"
        label="웹사이트"
        placeholder="https://yoursite.com"
        value={data.website}
        onChange={(e) => update('website', e.target.value)}
      />
    </div>
  );
}
