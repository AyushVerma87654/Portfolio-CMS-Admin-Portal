import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddTestimonialPayload,
  Testimonial,
  TestimonialMap,
  Testimonials,
  UpdateTestimonialPayload,
} from "../../models/testimonial";

export type TestimonialsState = {
  testimonials: Testimonials;
  selectedTestimonialId: string;
  loading: boolean;
  message: string;
};

const initialState: TestimonialsState = {
  testimonials: {},
  selectedTestimonialId: "",
  loading: false,
  message: "",
};

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {
    fetchTestimonialsInitiated,
    fetchTestimonialsCompleted,
    fetchTestimonialsError,
    createTestimonialInitiated,
    createTestimonialCompleted,
    createTestimonialError,
    updateTestimonialInitiated,
    updateTestimonialCompleted,
    updateTestimonialError,
    deleteTestimonialInitiated,
    deleteTestimonialCompleted,
    deleteTestimonialError,
  },
});

const { actions, reducer: testimonialsReducer } = testimonialsSlice;

export const {
  fetchTestimonialsInitiated: fetchTestimonialsInitiatedAction,
  fetchTestimonialsCompleted: fetchTestimonialsCompletedAction,
  fetchTestimonialsError: fetchTestimonialsErrorAction,
  createTestimonialInitiated: createTestimonialInitiatedAction,
  createTestimonialCompleted: createTestimonialCompletedAction,
  createTestimonialError: createTestimonialErrorAction,
  updateTestimonialInitiated: updateTestimonialInitiatedAction,
  updateTestimonialCompleted: updateTestimonialCompletedAction,
  updateTestimonialError: updateTestimonialErrorAction,
  deleteTestimonialInitiated: deleteTestimonialInitiatedAction,
  deleteTestimonialCompleted: deleteTestimonialCompletedAction,
  deleteTestimonialError: deleteTestimonialErrorAction,
} = actions;

export default testimonialsReducer;

// ----------------------------
// Reducers
// ----------------------------
function fetchTestimonialsInitiated(state: TestimonialsState) {
  state.loading = true;
}

function fetchTestimonialsCompleted(
  state: TestimonialsState,
  action: PayloadAction<{ testimonials: TestimonialMap }>
) {
  state.loading = false;
  action.payload.testimonials.forEach((testimonial) => {
    state.testimonials[testimonial.id] = testimonial;
  });
}

function fetchTestimonialsError(
  state: TestimonialsState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function createTestimonialInitiated(
  state: TestimonialsState,
  _action: PayloadAction<{ testimonial: AddTestimonialPayload }>
) {
  state.loading = true;
}

function createTestimonialCompleted(
  state: TestimonialsState,
  action: PayloadAction<{ testimonial: Testimonial }>
) {
  state.testimonials[action.payload.testimonial.id] =
    action.payload.testimonial;
  state.loading = false;
}

function createTestimonialError(
  state: TestimonialsState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading = false;
}

function updateTestimonialInitiated(
  state: TestimonialsState,
  _action: PayloadAction<{ testimonial: UpdateTestimonialPayload }>
) {
  state.loading = true;
}

function updateTestimonialCompleted(
  state: TestimonialsState,
  action: PayloadAction<{ testimonial: Testimonial }>
) {
  state.loading = false;
  state.testimonials[action.payload.testimonial.id] =
    action.payload.testimonial;
}

function updateTestimonialError(
  state: TestimonialsState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function deleteTestimonialInitiated(
  state: TestimonialsState,
  _action: PayloadAction<{ id: string }>
) {
  state.loading = true;
}

function deleteTestimonialCompleted(
  state: TestimonialsState,
  action: PayloadAction<{ id: string }>
) {
  delete state.testimonials[action.payload.id];
  state.loading = false;
}

function deleteTestimonialError(
  state: TestimonialsState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading = false;
}
