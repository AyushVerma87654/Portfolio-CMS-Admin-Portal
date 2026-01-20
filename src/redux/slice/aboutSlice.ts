import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { About, UpdateAboutPayload } from "../../models/about";

export type AboutState = {
  about: About;
  loading: boolean;
  message: string;
};

const initialState: AboutState = {
  about: {
    id: "",
    content: "",
    createdAt: "",
    updatedAt: "",
  },
  loading: false,
  message: "",
};

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    fetchAboutInitiated,
    fetchAboutCompleted,
    fetchAboutError,
    updateAboutInitiated,
    updateAboutCompleted,
    updateAboutError,
  },
});

const { actions, reducer: aboutReducer } = aboutSlice;

export const {
  fetchAboutInitiated: fetchAboutInitiatedAction,
  fetchAboutCompleted: fetchAboutCompletedAction,
  fetchAboutError: fetchAboutErrorAction,
  updateAboutInitiated: updateAboutInitiatedAction,
  updateAboutCompleted: updateAboutCompletedAction,
  updateAboutError: updateAboutErrorAction,
} = actions;

export default aboutReducer;

// ----------------------------
// Reducer functions
// ----------------------------
function fetchAboutInitiated(state: AboutState) {
  state.loading = true;
}

function fetchAboutCompleted(
  state: AboutState,
  action: PayloadAction<{ about: About }>
) {
  state.loading = false;
  state.about = action.payload.about;
}

function fetchAboutError(
  state: AboutState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function updateAboutInitiated(
  state: AboutState,
  _action: PayloadAction<{ about: UpdateAboutPayload }>
) {
  state.loading = true;
}

function updateAboutCompleted(
  state: AboutState,
  action: PayloadAction<{ about: About }>
) {
  state.loading = false;
  state.about = action.payload.about;
}

function updateAboutError(
  state: AboutState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}
