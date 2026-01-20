import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddProjectPayload,
  Project,
  ProjectMap,
  Projects,
  UpdateProjectPayload,
} from "../../models/project";

export type ProjectsState = {
  projects: Projects;
  selectedProjectId: string;
  loading: boolean;
  message: string;
};

const initialState: ProjectsState = {
  projects: {},
  selectedProjectId: "",
  loading: false,
  message: "",
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    fetchProjectsInitiated,
    fetchProjectsCompleted,
    fetchProjectsError,
    updateProjectInitiated,
    updateProjectCompleted,
    updateProjectError,
    createProjectInitiated,
    createProjectCompleted,
    createProjectError,
    deleteProjectInitiated,
    deleteProjectCompleted,
    deleteProjectError,
  },
});

const { actions, reducer: projectsReducer } = projectsSlice;

export const {
  fetchProjectsInitiated: fetchProjectsInitiatedAction,
  fetchProjectsCompleted: fetchProjectsCompletedAction,
  fetchProjectsError: fetchProjectsErrorAction,
  updateProjectInitiated: updateProjectInitiatedAction,
  updateProjectCompleted: updateProjectCompletedAction,
  updateProjectError: updateProjectErrorAction,
  createProjectInitiated: createProjectInitiatedAction,
  createProjectCompleted: createProjectCompletedAction,
  createProjectError: createProjectErrorAction,
  deleteProjectInitiated: deleteProjectInitiatedAction,
  deleteProjectCompleted: deleteProjectCompletedAction,
  deleteProjectError: deleteProjectErrorAction,
} = actions;

export default projectsReducer;

// ----------------------------
// Reducers
// ----------------------------
function fetchProjectsInitiated(state: ProjectsState) {
  state.loading = true;
}

function fetchProjectsCompleted(
  state: ProjectsState,
  action: PayloadAction<{ projects: ProjectMap }>
) {
  state.loading = false;
  action.payload.projects.forEach((project) => {
    state.projects[project.id] = project;
  });
}

function fetchProjectsError(
  state: ProjectsState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function updateProjectInitiated(
  state: ProjectsState,
  _action: PayloadAction<{ project: UpdateProjectPayload }>
) {
  state.loading = true;
}

function updateProjectCompleted(
  state: ProjectsState,
  action: PayloadAction<{ project: Project }>
) {
  state.loading = false;
  state.projects[action.payload.project.id] = action.payload.project;
}

function updateProjectError(
  state: ProjectsState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function createProjectInitiated(
  state: ProjectsState,
  _action: PayloadAction<{ project: AddProjectPayload }>
) {
  state.loading = true;
}

function createProjectCompleted(
  state: ProjectsState,
  action: PayloadAction<{ project: Project }>
) {
  state.projects[action.payload.project.id] = action.payload.project;
  state.loading = false;
}

function createProjectError(
  state: ProjectsState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading = false;
}

function deleteProjectInitiated(
  state: ProjectsState,
  _action: PayloadAction<{ id: string }>
) {
  state.loading = true;
}

function deleteProjectCompleted(
  state: ProjectsState,
  action: PayloadAction<{ id: string }>
) {
  delete state.projects[action.payload.id];
  state.loading = false;
}

function deleteProjectError(
  state: ProjectsState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
}
