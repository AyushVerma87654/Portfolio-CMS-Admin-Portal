import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const imageUploadStateSelector = (state: AppState) => state.imageUpload;

export const uploadedImageUrlSelector = createSelector(
  [imageUploadStateSelector],
  (state) => state.url
);

export const imageUploadLoadingSelector = createSelector(
  [imageUploadStateSelector],
  (state) => state.loading
);

export const imageUploadMessageSelector = createSelector(
  [imageUploadStateSelector],
  (state) => state.message
);
