import instance from "./axios";
import { UpdateAboutPayload } from "../models/about";

export const getAbout = async () =>
  instance.get("/about").then((res) => res.data);

export const updateAbout = async (payload: UpdateAboutPayload) =>
  instance.put("/about", payload).then((res) => res.data);
