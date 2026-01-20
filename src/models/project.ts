export type GitHubLinks = {
  name: string;
  url: string;
}[];

export type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubLinks: GitHubLinks;
  coverImageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type Projects = Record<string, Project>;
export type ProjectMap = Project[];

export type AddProjectPayload = {
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubLinks: GitHubLinks;
  coverImageUrl: string;
};

export type UpdateProjectPayload = AddProjectPayload & {
  id: string;
};
