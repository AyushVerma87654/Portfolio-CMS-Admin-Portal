import instance from "./axios";
import { AddSkillPayload, UpdateSkillPayload } from "../models/skill";

export const getSkills = async () =>
  instance.get("/skills").then((res) => res.data);

export const createSkill = async (payload: AddSkillPayload) =>
  instance.post("/skills", payload).then((res) => res.data);

export const updateSkill = async (payload: UpdateSkillPayload) =>
  instance.put(`/skills/${payload.id}`, payload).then((res) => res.data);

export const deleteSkill = async (id: string) =>
  instance.delete(`/skills/${id}`).then((res) => res.data);
