import instance from "./axios";
import { AddServicePayload, UpdateServicePayload } from "../models/service";

export const getServices = async () =>
  instance.get("/services").then((res) => res.data);

export const createService = async (payload: AddServicePayload) =>
  instance.post("/services", payload).then((res) => res.data);

export const updateService = async (payload: UpdateServicePayload) =>
  instance.put(`/services/${payload.id}`, payload).then((res) => res.data);

export const deleteService = async (id: string) =>
  instance.delete(`/services/${id}`).then((res) => res.data);
