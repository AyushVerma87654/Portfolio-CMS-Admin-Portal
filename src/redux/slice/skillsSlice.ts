import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddSkillPayload,
  Skill,
  SkillMap,
  Skills,
  UpdateSkillPayload,
} from "../../models/skill";

export type SkillsState = {
  skills: Skills;
  selectedSkillId: string;
  loading: boolean;
  message: string;
};

const initialState: SkillsState = {
  skills: {},
  selectedSkillId: "",
  loading: false,
  message: "",
};

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    fetchSkillsInitiated,
    fetchSkillsCompleted,
    fetchSkillsError,
    createSkillInitiated,
    createSkillCompleted,
    createSkillError,
    updateSkillInitiated,
    updateSkillCompleted,
    updateSkillError,
    deleteSkillInitiated,
    deleteSkillCompleted,
    deleteSkillError,
  },
});

const { actions, reducer: skillsReducer } = skillsSlice;

export const {
  fetchSkillsInitiated: fetchSkillsInitiatedAction,
  fetchSkillsCompleted: fetchSkillsCompletedAction,
  fetchSkillsError: fetchSkillsErrorAction,
  createSkillInitiated: createSkillInitiatedAction,
  createSkillCompleted: createSkillCompletedAction,
  createSkillError: createSkillErrorAction,
  updateSkillInitiated: updateSkillInitiatedAction,
  updateSkillCompleted: updateSkillCompletedAction,
  updateSkillError: updateSkillErrorAction,
  deleteSkillInitiated: deleteSkillInitiatedAction,
  deleteSkillCompleted: deleteSkillCompletedAction,
  deleteSkillError: deleteSkillErrorAction,
} = actions;

export default skillsReducer;

// ----------------------------
// Reducer functions
// ----------------------------
function fetchSkillsInitiated(state: SkillsState) {
  state.loading = true;
}

function fetchSkillsCompleted(
  state: SkillsState,
  action: PayloadAction<{ skills: SkillMap }>
) {
  state.loading = false;
  action.payload.skills.forEach((skill) => {
    state.skills[skill.id] = skill;
  });
}

function fetchSkillsError(
  state: SkillsState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function createSkillInitiated(
  state: SkillsState,
  _action: PayloadAction<{ skill: AddSkillPayload }>
) {
  state.loading = true;
}

function createSkillCompleted(
  state: SkillsState,
  action: PayloadAction<{ skill: Skill }>
) {
  state.skills[action.payload.skill.id] = action.payload.skill;
  state.loading = false;
}

function createSkillError(
  state: SkillsState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading = false;
}

function updateSkillInitiated(
  state: SkillsState,
  _action: PayloadAction<{ skill: UpdateSkillPayload }>
) {
  state.loading = true;
}

function updateSkillCompleted(
  state: SkillsState,
  action: PayloadAction<{ skill: Skill }>
) {
  state.loading = false;
  state.skills[action.payload.skill.id] = action.payload.skill;
}

function updateSkillError(
  state: SkillsState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function deleteSkillInitiated(
  state: SkillsState,
  _action: PayloadAction<{ id: string }>
) {
  state.loading = true;
}

function deleteSkillCompleted(
  state: SkillsState,
  action: PayloadAction<{ id: string }>
) {
  delete state.skills[action.payload.id];
  state.loading = false;
}

function deleteSkillError(
  state: SkillsState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading = false;
}
