import instance from "./axios";
import { AddBlogPayload, UpdateBlogPayload } from "../models/blog";

export const getBlogs = async () =>
  instance.get("/blogs").then((res) => res.data);

export const createBlog = async (payload: AddBlogPayload) =>
  instance.post("/blogs", payload).then((res) => res.data);

export const updateBlog = async (payload: UpdateBlogPayload) =>
  instance.put(`/blogs/${payload.id}`, payload).then((res) => res.data);

export const deleteBlog = async (id: string) =>
  instance.delete(`/blogs/${id}`).then((res) => res.data);
