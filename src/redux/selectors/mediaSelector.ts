import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const mediaStateSelector = (state: AppState) => state.media;

export const mediasSelector = createSelector(
  [mediaStateSelector],
  (state) => state.medias
);

export const mediaMapSelector = createSelector([mediasSelector], (media) =>
  Object.values(media)
);

export const selectedMediaIdSelector = createSelector(
  [mediaStateSelector],
  (state) => state.selectedMediaId
);

export const selectedMediaSelector = createSelector(
  [mediasSelector, selectedMediaIdSelector],
  (media, selectedId) => media[selectedId]
);

export const mediaLoadingSelector = createSelector(
  [mediaStateSelector],
  (state) => state.loading
);

export const mediaMessageSelector = createSelector(
  [mediaStateSelector],
  (state) => state.message
);
