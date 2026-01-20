export type Experience = {
  id: string;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string | null;
  currentlyWorking: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Experiences = Record<string, Experience>;
export type ExperienceMap = Experience[];

export type AddExperiencePayload = {
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string | null;
  currentlyWorking: boolean;
};

export type UpdateExperiencePayload = AddExperiencePayload & {
  id: string;
};
