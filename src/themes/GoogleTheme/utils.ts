import { Project, Experience, Skill, Education } from '../../types/manifest';

export const calculateItemsPerPage = (
  currentSection: number,
  projects: Project[],
  experience: Experience[],
  skills: Skill[],
  education: Education[]
): number => {
  let items: any[] = [];

  switch (currentSection) {
    case 0:
      items = projects || [];
      break;
    case 1:
      items = experience || [];
      break;
    case 2:
      items = skills || [];
      break;
    case 3:
      items = education || [];
      break;
  }

  if (items.length === 0) return 3;

  const avgLength = items.reduce((sum, item) => {
    const desc = item.description || '';
    const achievements = item.achievements?.join('') || '';
    const highlights = item.highlights?.join('') || '';
    return sum + desc.length + achievements.length + highlights.length;
  }, 0) / items.length;

  if (avgLength > 500) return 2;
  if (avgLength > 300) return 2;
  return 3;
};

export const getCurrentItems = (
  currentSection: number,
  currentPage: number,
  itemsPerPage: number,
  projects: Project[],
  experience: Experience[],
  skills: Skill[],
  education: Education[]
) => {
  let items: any[] = [];

  switch (currentSection) {
    case 0:
      items = projects || [];
      break;
    case 1:
      items = experience || [];
      break;
    case 2:
      items = skills || [];
      break;
    case 3:
      items = education || [];
      break;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    items: items.slice(startIndex, endIndex),
    totalPages: Math.ceil(items.length / itemsPerPage),
    totalItems: items.length
  };
};
