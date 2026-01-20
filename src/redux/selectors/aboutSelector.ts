import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const aboutStateSelector = (state: AppState) => state.about;

export const aboutSelector = createSelector(
  [aboutStateSelector],
  (state) => state.about
);

export const aboutLoadingSelector = createSelector(
  [aboutStateSelector],
  (state) => state.loading
);

export const aboutMessageSelector = createSelector(
  [aboutStateSelector],
  (state) => state.message
);
