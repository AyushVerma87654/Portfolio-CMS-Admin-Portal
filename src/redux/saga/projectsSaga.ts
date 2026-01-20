import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchProjectsInitiatedAction,
  createProjectInitiatedAction,
  updateProjectInitiatedAction,
  deleteProjectInitiatedAction,
  fetchProjectsCompletedAction,
  createProjectCompletedAction,
  updateProjectCompletedAction,
  deleteProjectCompletedAction,
  fetchProjectsErrorAction,
  createProjectErrorAction,
  updateProjectErrorAction,
  deleteProjectErrorAction,
} from "../slice/projectsSlice";
import { ResponsePayload } from "../../models/response";
import {
  AddProjectPayload,
  Project,
  UpdateProjectPayload,
} from "../../models/project";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../api/projects";
import { getErrorMessage } from "../../utils/getErrorMessage";

function* fetchProjectsSaga(): Generator {
  try {
    const response = (yield call(getProjects)) as ResponsePayload<{
      projects: Project[];
    }>;
    yield put(fetchProjectsCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(fetchProjectsErrorAction({ error: getErrorMessage(err) }));
  }
}

function* createProjectSaga(
  action: PayloadAction<{ project: AddProjectPayload }>
): Generator {
  try {
    const response = (yield call(
      createProject,
      action.payload.project
    )) as ResponsePayload<{ project: Project }>;
    yield put(createProjectCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(createProjectErrorAction({ error: getErrorMessage(err) }));
  }
}

function* updateProjectSaga(
  action: PayloadAction<{ project: UpdateProjectPayload }>
): Generator {
  try {
    const response = (yield call(
      updateProject,
      action.payload.project
    )) as ResponsePayload<{ project: Project }>;
    yield put(updateProjectCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(updateProjectErrorAction({ error: getErrorMessage(err) }));
  }
}

function* deleteProjectSaga(action: PayloadAction<{ id: string }>): Generator {
  try {
    const response = (yield call(
      deleteProject,
      action.payload.id
    )) as ResponsePayload<{ id: string }>;
    yield put(deleteProjectCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(deleteProjectErrorAction({ error: getErrorMessage(err) }));
  }
}

function* projectsSaga() {
  yield takeEvery(fetchProjectsInitiatedAction, fetchProjectsSaga);
  yield takeEvery(createProjectInitiatedAction, createProjectSaga);
  yield takeEvery(updateProjectInitiatedAction, updateProjectSaga);
  yield takeEvery(deleteProjectInitiatedAction, deleteProjectSaga);
}

export default projectsSaga;
