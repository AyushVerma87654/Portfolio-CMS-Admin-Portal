import {
  AddExperiencePayload,
  Experience,
  ExperienceMap,
  UpdateExperiencePayload,
} from "./../../models/experience";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchExperiencesInitiatedAction,
  createExperienceInitiatedAction,
  updateExperienceInitiatedAction,
  deleteExperienceInitiatedAction,
  fetchExperiencesCompletedAction,
  createExperienceCompletedAction,
  updateExperienceCompletedAction,
  deleteExperienceCompletedAction,
  fetchExperiencesErrorAction,
  createExperienceErrorAction,
  updateExperienceErrorAction,
  deleteExperienceErrorAction,
} from "../slice/experienceSlice";
import { ResponsePayload } from "../../models/response";
import { getErrorMessage } from "../../utils/getErrorMessage";
import {
  createExperience,
  deleteExperience,
  getExperience,
  updateExperience,
} from "../../api/experience";

function* fetchExperienceSaga(): Generator {
  try {
    const response = (yield call(getExperience)) as ResponsePayload<{
      experiences: ExperienceMap;
    }>;
    yield put(fetchExperiencesCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(fetchExperiencesErrorAction({ error: getErrorMessage(err) }));
  }
}

function* createExperienceSaga(
  action: PayloadAction<{ experience: AddExperiencePayload }>
): Generator {
  try {
    const response = (yield call(
      createExperience,
      action.payload.experience
    )) as ResponsePayload<{ experience: Experience }>;
    yield put(createExperienceCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(createExperienceErrorAction({ error: getErrorMessage(err) }));
  }
}

function* updateExperienceSaga(
  action: PayloadAction<{ experience: UpdateExperiencePayload }>
): Generator {
  try {
    const response = (yield call(
      updateExperience,
      action.payload.experience
    )) as ResponsePayload<{ experience: Experience }>;
    yield put(updateExperienceCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(updateExperienceErrorAction({ error: getErrorMessage(err) }));
  }
}

function* deleteExperienceSaga(
  action: PayloadAction<{ id: string }>
): Generator {
  try {
    const response = (yield call(
      deleteExperience,
      action.payload.id
    )) as ResponsePayload<{ id: string }>;
    yield put(deleteExperienceCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(deleteExperienceErrorAction({ error: getErrorMessage(err) }));
  }
}

function* experienceSaga() {
  yield takeEvery(fetchExperiencesInitiatedAction, fetchExperienceSaga);
  yield takeEvery(createExperienceInitiatedAction, createExperienceSaga);
  yield takeEvery(updateExperienceInitiatedAction, updateExperienceSaga);
  yield takeEvery(deleteExperienceInitiatedAction, deleteExperienceSaga);
}

export default experienceSaga;
