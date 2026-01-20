import instance from "./axios";
import {
  AddTestimonialPayload,
  UpdateTestimonialPayload,
} from "../models/testimonial";

export const getTestimonials = async () =>
  instance.get("/testimonials").then((res) => res.data);

export const createTestimonial = async (payload: AddTestimonialPayload) =>
  instance.post("/testimonials", payload).then((res) => res.data);

export const updateTestimonial = async (payload: UpdateTestimonialPayload) =>
  instance.put(`/testimonials/${payload.id}`, payload).then((res) => res.data);

export const deleteTestimonial = async (id: string) =>
  instance.delete(`/testimonials/${id}`).then((res) => res.data);
