export interface AlgeriaCityRaw {
  id: number;
  commune_name_ascii: string;
  commune_name: string;
  daira_name_ascii: string;
  daira_name: string;
  wilaya_code: string;
  wilaya_name_ascii: string;
  wilaya_name: string;
}

export interface Commune {
  id: number;
  name: string;
  nameAscii: string;
  dairaName: string;
}

export interface Wilaya {
  code: string;
  name: string;
  nameAscii: string;
  communes: Commune[];
}

export interface RegisterFormValues {
  // Step 1: Personal Data
  fullName: string;
  phone: string;
  email: string;
  wilaya: string;
  commune: string;
  birthDate: string;
  gender: 'male' | 'female';
  address?: string;

  // Step 2: Interests
  interests: string[];
  otherInterests?: string;

  // Step 3: Hobbies
  hobbies: string[];
  otherHobbies?: string;

  // Step 4: Skills
  skills: string[];
  otherSkills?: string;

  // Step 5: Availability
  hoursPerWeek: number;
  availableDays: string[];
  preferredTime: 'morning' | 'afternoon' | 'evening' | 'flexible';

  // Step 6: Volunteer Experience
  hasPreviousExperience: boolean;
  experienceDetails?: string;
  preferredRoles: string[];

  // Step 7: Goals & Motivation
  motivation: string;
  shortTermGoals: string;
  longTermGoals?: string;
  expectations?: string;
}

export interface ProgramItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'educational' | 'social' | 'leadership' | 'tech' | 'culture';
  featured?: boolean;
}

export interface ActivityItem {
  id: string;
  title: string;
  date: string;
  location: string;
  image?: string;
  summary: string;
}

export interface PartnerItem {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

export interface NavItem {
  label: string;
  href: string;
  isCTA?: boolean;
}

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  badge?: string;
}
