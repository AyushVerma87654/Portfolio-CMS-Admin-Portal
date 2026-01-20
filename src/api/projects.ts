import instance from "./axios";
import { AddProjectPayload, UpdateProjectPayload } from "../models/project";

export const getProjects = async () =>
  instance.get("/projects").then((res) => res.data);

export const createProject = async (payload: AddProjectPayload) =>
  instance.post("/projects", payload).then((res) => res.data);

export const updateProject = async (payload: UpdateProjectPayload) =>
  instance.put(`/projects/${payload.id}`, payload).then((res) => res.data);

export const deleteProject = async (id: string) =>
  instance.delete(`/projects/${id}`).then((res) => res.data);
