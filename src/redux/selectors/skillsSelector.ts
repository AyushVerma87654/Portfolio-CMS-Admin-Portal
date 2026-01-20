import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const skillsStateSelector = (state: AppState) => state.skills;

export const skillsSelector = createSelector(
  [skillsStateSelector],
  (state) => state.skills
);

export const skillsMapSelector = createSelector([skillsSelector], (skills) =>
  Object.values(skills)
);

export const selectedSkillIdSelector = createSelector(
  [skillsStateSelector],
  (state) => state.selectedSkillId
);

export const selectedSkillSelector = createSelector(
  [skillsSelector, selectedSkillIdSelector],
  (skills, selectedId) => skills[selectedId]
);

export const skillsLoadingSelector = createSelector(
  [skillsStateSelector],
  (state) => state.loading
);

export const skillsMessageSelector = createSelector(
  [skillsStateSelector],
  (state) => state.message
);
