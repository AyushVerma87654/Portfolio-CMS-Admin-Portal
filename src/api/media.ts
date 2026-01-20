import { AddMediaPayload, UpdateMediaPayload } from "../models/media";
import instance from "./axios";

export const getMedia = async () =>
  instance.get("/media").then((res) => res.data);

export const uploadMedia = async (media: AddMediaPayload) => {
  const formData = new FormData();
  formData.append("file", media.file);
  formData.append("fileName", media.fileName);
  return instance
    .post("/upload-media", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

export const updateMedia = async (media: UpdateMediaPayload) => {
  const formData = new FormData();
  formData.append("file", media.file);
  formData.append("fileName", media.fileName);
  formData.append("id", media.id);
  return instance
    .put(`/media/${media.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

export const deleteMedia = async (id: string) =>
  instance.delete(`/media/${id}`).then((res) => res.data);
