import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { ResponsePayload } from "../../models/response";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { uploadImage } from "../../api/image";
import {
  imageUploadCompletedAction,
  imageUploadErrorAction,
  imageUploadInitiatedAction,
} from "../slice/imageUploadSlice";

function* uploadImageSaga(action: PayloadAction<{ file: File }>): Generator {
  try {
    const response = (yield call(
      uploadImage,
      action.payload.file
    )) as ResponsePayload<{ fileUrl: string }>;
    yield put(imageUploadCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(imageUploadErrorAction({ error: getErrorMessage(err) }));
  }
}

function* imageUploadSaga() {
  yield takeEvery(imageUploadInitiatedAction, uploadImageSaga);
}

export default imageUploadSaga;
