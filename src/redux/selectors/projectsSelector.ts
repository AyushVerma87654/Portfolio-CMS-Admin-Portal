import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const projectsStateSelector = (state: AppState) => state.projects;

export const projectsSelector = createSelector(
  [projectsStateSelector],
  (state) => state.projects
);

export const projectsMapSelector = createSelector(
  [projectsSelector],
  (projects) => Object.values(projects)
);

export const selectedProjectIdSelector = createSelector(
  [projectsStateSelector],
  (state) => state.selectedProjectId
);

export const selectedProjectSelector = createSelector(
  [projectsSelector, selectedProjectIdSelector],
  (projects, selectedId) => projects[selectedId]
);

export const projectsLoadingSelector = createSelector(
  [projectsStateSelector],
  (state) => state.loading
);

export const projectsMessageSelector = createSelector(
  [projectsStateSelector],
  (state) => state.message
);
