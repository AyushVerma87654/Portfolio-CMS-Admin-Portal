import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchSkillsInitiatedAction,
  createSkillInitiatedAction,
  updateSkillInitiatedAction,
  deleteSkillInitiatedAction,
  fetchSkillsCompletedAction,
  createSkillCompletedAction,
  updateSkillCompletedAction,
  deleteSkillCompletedAction,
  fetchSkillsErrorAction,
  createSkillErrorAction,
  updateSkillErrorAction,
  deleteSkillErrorAction,
} from "../slice/skillsSlice";
import {
  AddSkillPayload,
  Skill,
  SkillMap,
  UpdateSkillPayload,
} from "../../models/skill";
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../../api/skills";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { ResponsePayload } from "../../models/response";

function* fetchSkillsSaga(): Generator {
  try {
    const response = (yield call(getSkills)) as ResponsePayload<{
      skills: SkillMap;
    }>;
    yield put(fetchSkillsCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(fetchSkillsErrorAction({ error: getErrorMessage(err) }));
  }
}

function* createSkillSaga(
  action: PayloadAction<{ skill: AddSkillPayload }>
): Generator {
  try {
    const response = (yield call(
      createSkill,
      action.payload.skill
    )) as ResponsePayload<{ skill: Skill }>;
    yield put(createSkillCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(createSkillErrorAction({ error: getErrorMessage(err) }));
  }
}

function* updateSkillSaga(
  action: PayloadAction<{ skill: UpdateSkillPayload }>
): Generator {
  try {
    const response = (yield call(
      updateSkill,
      action.payload.skill
    )) as ResponsePayload<{ skill: Skill }>;
    yield put(updateSkillCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(updateSkillErrorAction({ error: getErrorMessage(err) }));
  }
}

function* deleteSkillSaga(action: PayloadAction<{ id: string }>): Generator {
  try {
    const response = (yield call(
      deleteSkill,
      action.payload.id
    )) as ResponsePayload<{ id: string }>;
    yield put(deleteSkillCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(deleteSkillErrorAction({ error: getErrorMessage(err) }));
  }
}

function* skillsSaga() {
  yield takeEvery(fetchSkillsInitiatedAction, fetchSkillsSaga);
  yield takeEvery(createSkillInitiatedAction, createSkillSaga);
  yield takeEvery(updateSkillInitiatedAction, updateSkillSaga);
  yield takeEvery(deleteSkillInitiatedAction, deleteSkillSaga);
}

export default skillsSaga;
