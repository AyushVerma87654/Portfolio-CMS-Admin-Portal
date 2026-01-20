import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddExperiencePayload,
  Experience,
  ExperienceMap,
  Experiences,
  UpdateExperiencePayload,
} from "../../models/experience";

export type ExperienceState = {
  experiences: Experiences;
  selectedExperienceId: string;
  loading: boolean;
  message: string;
};

const initialState: ExperienceState = {
  experiences: {},
  selectedExperienceId: "",
  loading: false,
  message: "",
};

const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    fetchExperiencesInitiated,
    fetchExperiencesCompleted,
    fetchExperiencesError,
    createExperienceInitiated,
    createExperienceCompleted,
    createExperienceError,
    updateExperienceInitiated,
    updateExperienceCompleted,
    updateExperienceError,
    deleteExperienceInitiated,
    deleteExperienceCompleted,
    deleteExperienceError,
  },
});

const { actions, reducer: experienceReducer } = experienceSlice;

export const {
  fetchExperiencesInitiated: fetchExperiencesInitiatedAction,
  fetchExperiencesCompleted: fetchExperiencesCompletedAction,
  fetchExperiencesError: fetchExperiencesErrorAction,
  createExperienceInitiated: createExperienceInitiatedAction,
  createExperienceCompleted: createExperienceCompletedAction,
  createExperienceError: createExperienceErrorAction,
  updateExperienceInitiated: updateExperienceInitiatedAction,
  updateExperienceCompleted: updateExperienceCompletedAction,
  updateExperienceError: updateExperienceErrorAction,
  deleteExperienceInitiated: deleteExperienceInitiatedAction,
  deleteExperienceCompleted: deleteExperienceCompletedAction,
  deleteExperienceError: deleteExperienceErrorAction,
} = actions;

export default experienceReducer;

// ----------------------------
// Reducers
// ----------------------------
function fetchExperiencesInitiated(state: ExperienceState) {
  state.loading = true;
}

function fetchExperiencesCompleted(
  state: ExperienceState,
  action: PayloadAction<{ experiences: ExperienceMap }>
) {
  state.loading = false;
  action.payload.experiences.forEach((experience) => {
    state.experiences[experience.id] = experience;
  });
}

function fetchExperiencesError(
  state: ExperienceState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function createExperienceInitiated(
  state: ExperienceState,
  _action: PayloadAction<{ experience: AddExperiencePayload }>
) {
  state.loading = true;
}

function createExperienceCompleted(
  state: ExperienceState,
  action: PayloadAction<{ experience: Experience }>
) {
  state.experiences[action.payload.experience.id] = action.payload.experience;
  state.loading = false;
}

function createExperienceError(
  state: ExperienceState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading = false;
}

function updateExperienceInitiated(
  state: ExperienceState,
  _action: PayloadAction<{ experience: UpdateExperiencePayload }>
) {
  state.loading = true;
}

function updateExperienceCompleted(
  state: ExperienceState,
  action: PayloadAction<{ experience: Experience }>
) {
  state.loading = false;
  state.experiences[action.payload.experience.id] = action.payload.experience;
}

function updateExperienceError(
  state: ExperienceState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function deleteExperienceInitiated(
  state: ExperienceState,
  _action: PayloadAction<{ id: string }>
) {
  state.loading = true;
}

function deleteExperienceCompleted(
  state: ExperienceState,
  action: PayloadAction<{ id: string }>
) {
  delete state.experiences[action.payload.id];
  state.loading = false;
}

function deleteExperienceError(
  state: ExperienceState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading = false;
}
