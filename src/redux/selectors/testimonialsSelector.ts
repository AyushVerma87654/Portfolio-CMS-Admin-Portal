import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const testimonialsStateSelector = (state: AppState) =>
  state.testimonials;

export const testimonialsSelector = createSelector(
  [testimonialsStateSelector],
  (state) => state.testimonials
);

export const testimonialsMapSelector = createSelector(
  [testimonialsSelector],
  (items) => Object.values(items)
);

export const selectedTestimonialIdSelector = createSelector(
  [testimonialsStateSelector],
  (state) => state.selectedTestimonialId
);

export const selectedTestimonialSelector = createSelector(
  [testimonialsSelector, selectedTestimonialIdSelector],
  (items, selectedId) => items[selectedId]
);

export const testimonialsLoadingSelector = createSelector(
  [testimonialsStateSelector],
  (state) => state.loading
);

export const testimonialsMessageSelector = createSelector(
  [testimonialsStateSelector],
  (state) => state.message
);
