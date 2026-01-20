import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddMediaPayload,
  Media,
  MediaMap,
  Medias,
  UpdateMediaPayload,
} from "../../models/media";

export type MediaState = {
  medias: Medias;
  selectedMediaId: string;
  loading: boolean;
  message: string;
};

const initialState: MediaState = {
  medias: {},
  selectedMediaId: "",
  loading: false,
  message: "",
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    fetchMediaInitiated,
    fetchMediaCompleted,
    fetchMediaError,
    uploadMediaInitiated,
    uploadMediaCompleted,
    uploadMediaError,
    updateMediaInitiated,
    updateMediaCompleted,
    updateMediaError,
    deleteMediaInitiated,
    deleteMediaCompleted,
    deleteMediaError,
  },
});

const { actions, reducer: mediaReducer } = mediaSlice;

export const {
  fetchMediaInitiated: fetchMediaInitiatedAction,
  fetchMediaCompleted: fetchMediaCompletedAction,
  fetchMediaError: fetchMediaErrorAction,
  uploadMediaInitiated: uploadMediaInitiatedAction,
  uploadMediaCompleted: uploadMediaCompletedAction,
  uploadMediaError: uploadMediaErrorAction,
  updateMediaInitiated: updateMediaInitiatedAction,
  updateMediaCompleted: updateMediaCompletedAction,
  updateMediaError: updateMediaErrorAction,
  deleteMediaInitiated: deleteMediaInitiatedAction,
  deleteMediaCompleted: deleteMediaCompletedAction,
  deleteMediaError: deleteMediaErrorAction,
} = actions;

export default mediaReducer;

// ----------------------------
// Reducers
// ----------------------------
function fetchMediaInitiated(state: MediaState) {
  state.loading = true;
}

function fetchMediaCompleted(
  state: MediaState,
  action: PayloadAction<{ medias: MediaMap }>
) {
  state.loading = false;
  action.payload.medias.forEach((media) => {
    state.medias[media.id] = media;
  });
}

function fetchMediaError(
  state: MediaState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function uploadMediaInitiated(
  state: MediaState,
  _action: PayloadAction<{ media: AddMediaPayload }>
) {
  state.loading = true;
}

function uploadMediaCompleted(
  state: MediaState,
  action: PayloadAction<{ media: Media }>
) {
  state.loading = false;
  state.medias[action.payload.media.id] = action.payload.media;
}

function uploadMediaError(
  state: MediaState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function updateMediaInitiated(
  state: MediaState,
  _action: PayloadAction<{ media: UpdateMediaPayload }>
) {
  state.loading = true;
}

function updateMediaCompleted(
  state: MediaState,
  action: PayloadAction<{ media: Media }>
) {
  state.medias[action.payload.media.id] = action.payload.media;
  state.loading = false;
}

function updateMediaError(
  state: MediaState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading = false;
}

function deleteMediaInitiated(
  state: MediaState,
  _action: PayloadAction<{ id: string }>
) {
  state.loading = true;
}

function deleteMediaCompleted(
  state: MediaState,
  action: PayloadAction<{ id: string }>
) {
  delete state.medias[action.payload.id];
  state.loading = false;
}

function deleteMediaError(
  state: MediaState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading = false;
}
