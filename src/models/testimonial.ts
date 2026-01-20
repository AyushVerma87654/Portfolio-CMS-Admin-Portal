export type Testimonial = {
  id: string;
  name: string;
  designation: string;
  message: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type Testimonials = Record<string, Testimonial>;
export type TestimonialMap = Testimonial[];

export type AddTestimonialPayload = {
  name: string;
  designation: string;
  message: string;
  imageUrl: string;
};

export type UpdateTestimonialPayload = AddTestimonialPayload & {
  id: string;
};
