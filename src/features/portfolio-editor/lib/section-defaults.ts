import type { SectionType } from '@/shared/types';
import type { SectionDataMap } from '../model/types';

export function getSectionDefaults<T extends SectionType>(type: T): SectionDataMap[T] {
  const defaults: SectionDataMap = {
    hero: {
      name: '',
      title: '',
      subtitle: '',
      avatarUrl: null,
    },
    about: {
      bio: '',
      highlights: [],
    },
    projects: {
      projectIds: [],
    },
    skills: {
      categories: [],
    },
    experience: {
      items: [],
    },
    education: {
      items: [],
    },
    contact: {
      email: '',
      github: '',
      linkedin: '',
      website: '',
    },
    custom: {
      title: '',
      content: '',
    },
  };

  return defaults[type];
}
