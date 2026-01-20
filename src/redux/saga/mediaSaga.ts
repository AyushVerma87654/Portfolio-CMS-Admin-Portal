import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchMediaInitiatedAction,
  uploadMediaInitiatedAction,
  updateMediaInitiatedAction,
  deleteMediaInitiatedAction,
  fetchMediaCompletedAction,
  uploadMediaCompletedAction,
  updateMediaCompletedAction,
  deleteMediaCompletedAction,
  fetchMediaErrorAction,
  uploadMediaErrorAction,
  updateMediaErrorAction,
  deleteMediaErrorAction,
} from "../slice/mediaSlice";
import { ResponsePayload } from "../../models/response";
import {
  AddMediaPayload,
  Media,
  MediaMap,
  UpdateMediaPayload,
} from "../../models/media";
import { getErrorMessage } from "../../utils/getErrorMessage";
import {
  deleteMedia,
  getMedia,
  updateMedia,
  uploadMedia,
} from "../../api/media";

function* fetchMediaSaga(): Generator {
  try {
    const response = (yield call(getMedia)) as ResponsePayload<{
      medias: MediaMap;
    }>;
    yield put(fetchMediaCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(fetchMediaErrorAction({ error: getErrorMessage(err) }));
  }
}

function* uploadMediaSaga(
  action: PayloadAction<{ media: AddMediaPayload }>
): Generator {
  try {
    const response = (yield call(
      uploadMedia,
      action.payload.media
    )) as ResponsePayload<{ media: Media }>;
    yield put(uploadMediaCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(uploadMediaErrorAction({ error: getErrorMessage(err) }));
  }
}

function* updateMediaSaga(
  action: PayloadAction<{ media: UpdateMediaPayload }>
): Generator {
  try {
    const response = (yield call(
      updateMedia,
      action.payload.media
    )) as ResponsePayload<{ media: Media }>;
    yield put(updateMediaCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(updateMediaErrorAction({ error: getErrorMessage(err) }));
  }
}

function* deleteMediaSaga(action: PayloadAction<{ id: string }>): Generator {
  try {
    const response = (yield call(
      deleteMedia,
      action.payload.id
    )) as ResponsePayload<{ id: string }>;
    yield put(deleteMediaCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(deleteMediaErrorAction({ error: getErrorMessage(err) }));
  }
}

function* mediaSaga() {
  yield takeEvery(fetchMediaInitiatedAction, fetchMediaSaga);
  yield takeEvery(uploadMediaInitiatedAction, uploadMediaSaga);
  yield takeEvery(updateMediaInitiatedAction, updateMediaSaga);
  yield takeEvery(deleteMediaInitiatedAction, deleteMediaSaga);
}

export default mediaSaga;
