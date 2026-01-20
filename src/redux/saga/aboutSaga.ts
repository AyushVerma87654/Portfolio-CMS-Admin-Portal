import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchAboutInitiatedAction,
  updateAboutInitiatedAction,
  fetchAboutCompletedAction,
  updateAboutCompletedAction,
  fetchAboutErrorAction,
  updateAboutErrorAction,
} from "../slice/aboutSlice";
import { About, UpdateAboutPayload } from "../../models/about";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { ResponsePayload } from "../../models/response";
import { getAbout, updateAbout } from "../../api/about";

function* fetchAboutSaga(): Generator {
  try {
    const response = (yield call(getAbout)) as ResponsePayload<{
      about: About;
    }>;
    yield put(fetchAboutCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(fetchAboutErrorAction({ error: getErrorMessage(err) }));
  }
}

function* updateAboutSaga(
  action: PayloadAction<{ about: UpdateAboutPayload }>
): Generator {
  try {
    const response = (yield call(
      updateAbout,
      action.payload.about
    )) as ResponsePayload<{ about: About }>;
    yield put(updateAboutCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(updateAboutErrorAction({ error: getErrorMessage(err) }));
  }
}

function* aboutSaga() {
  yield takeEvery(fetchAboutInitiatedAction, fetchAboutSaga);
  yield takeEvery(updateAboutInitiatedAction, updateAboutSaga);
}

export default aboutSaga;
