import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  authCompletedAction,
  authErrorAction,
  fetchMeInitiatedAction,
  loginInitiatedAction,
  logoutCompletedAction,
  logoutErrorAction,
  logoutInitiatedAction,
} from "../slice/userSlice";
import { AuthCompletedResponse, LoginPayload } from "../../models/user";
import { fetchMe, loginUser, logoutUser } from "../../api/user";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { ResponsePayload } from "../../models/response";

function* login(action: PayloadAction<LoginPayload>): Generator {
  try {
    const response = (yield call(
      loginUser,
      action.payload
    )) as ResponsePayload<AuthCompletedResponse>;
    yield put(authCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(authErrorAction({ error }));
  }
}

function* fetchme(): Generator {
  try {
    const response = (yield call(
      fetchMe
    )) as ResponsePayload<AuthCompletedResponse>;
    yield put(authCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(authErrorAction({ error }));
  }
}

function* logout(): Generator {
  try {
    const response = (yield call(logoutUser)) as ResponsePayload<{
      message: string;
    }>;
    yield put(logoutCompletedAction(response.responseDetails));
  } catch (err: any) {
    const error = getErrorMessage(err);
    yield put(logoutErrorAction({ error }));
  }
}

function* userSaga() {
  yield takeEvery(loginInitiatedAction, login);
  yield takeEvery(fetchMeInitiatedAction, fetchme);
  yield takeEvery(logoutInitiatedAction, logout);
}

export default userSaga;
