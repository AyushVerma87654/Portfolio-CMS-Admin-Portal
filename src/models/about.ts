export type About = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateAboutPayload = {
  id: string;
  content: string;
};
