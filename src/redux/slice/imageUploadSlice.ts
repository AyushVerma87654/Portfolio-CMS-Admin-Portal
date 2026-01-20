import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ImageUploadState = {
  url: string;
  loading: boolean;
  message: string;
};

const initialState: ImageUploadState = {
  url: "",
  loading: false,
  message: "",
};

const imageUploadSlice = createSlice({
  name: "imageUpload",
  initialState,
  reducers: {
    imageUploadInitiated,
    imageUploadCompleted,
    imageUploadError,
  },
});

const { actions, reducer: imageUploadReducer } = imageUploadSlice;

export const {
  imageUploadInitiated: imageUploadInitiatedAction,
  imageUploadCompleted: imageUploadCompletedAction,
  imageUploadError: imageUploadErrorAction,
} = actions;

export default imageUploadReducer;

function imageUploadInitiated(
  state: ImageUploadState,
  _action: PayloadAction<{ file: File }>
) {
  state.loading = true;
}

function imageUploadCompleted(
  state: ImageUploadState,
  action: PayloadAction<{ fileUrl: string }>
) {
  state.url = action.payload.fileUrl;
  state.loading = false;
}

function imageUploadError(
  state: ImageUploadState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading = false;
}
