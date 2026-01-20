import instance from "./axios";
import {
  AddExperiencePayload,
  UpdateExperiencePayload,
} from "../models/experience";

export const getExperience = async () =>
  instance.get("/experience").then((res) => res.data);

export const createExperience = async (payload: AddExperiencePayload) =>
  instance.post("/experience", payload).then((res) => res.data);

export const updateExperience = async (payload: UpdateExperiencePayload) =>
  instance.put(`/experience/${payload.id}`, payload).then((res) => res.data);

export const deleteExperience = async (id: string) =>
  instance.delete(`/experience/${id}`).then((res) => res.data);
