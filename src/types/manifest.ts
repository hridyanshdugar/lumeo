export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone?: string;
  location?: string;
  bio: string;
  avatar?: string;
  links?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
    [key: string]: string | undefined;
  };
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements?: string[];
  technologies?: string[];
}

export interface Project {
  name: string;
  description: string;
  image?: string;
  technologies: string[];
  links?: {
    github?: string;
    demo?: string;
    [key: string]: string | undefined;
  };
  highlights?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  achievements?: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface PortfolioManifest {
  personalInfo: PersonalInfo;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  skills: Skill[];
}
