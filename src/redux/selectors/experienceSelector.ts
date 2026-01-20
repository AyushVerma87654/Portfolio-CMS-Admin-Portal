import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const experienceStateSelector = (state: AppState) => state.experience;

export const experiencesSelector = createSelector(
  [experienceStateSelector],
  (state) => state.experiences
);

export const experienceMapSelector = createSelector(
  [experiencesSelector],
  (items) => Object.values(items)
);

export const selectedExperienceIdSelector = createSelector(
  [experienceStateSelector],
  (state) => state.selectedExperienceId
);

export const selectedExperienceSelector = createSelector(
  [experiencesSelector, selectedExperienceIdSelector],
  (items, selectedId) => items[selectedId]
);

export const experienceLoadingSelector = createSelector(
  [experienceStateSelector],
  (state) => state.loading
);

export const experienceMessageSelector = createSelector(
  [experienceStateSelector],
  (state) => state.message
);
