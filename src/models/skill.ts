export type Skill = {
  id: string;
  name: string;
  category: string;
  createdAt: string;
  updatedAt: string;
};

export type Skills = Record<string, Skill>;
export type SkillMap = Skill[];

export type AddSkillPayload = { name: string; category: string };

export type UpdateSkillPayload = AddSkillPayload & {
  id: string;
};
