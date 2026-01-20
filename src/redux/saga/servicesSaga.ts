import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchServicesInitiatedAction,
  createServiceInitiatedAction,
  updateServiceInitiatedAction,
  deleteServiceInitiatedAction,
  fetchServicesCompletedAction,
  createServiceCompletedAction,
  updateServiceCompletedAction,
  deleteServiceCompletedAction,
  fetchServicesErrorAction,
  createServiceErrorAction,
  updateServiceErrorAction,
  deleteServiceErrorAction,
} from "../slice/servicesSlice";
import { ResponsePayload } from "../../models/response";
import {
  AddServicePayload,
  Service,
  ServiceMap,
  UpdateServicePayload,
} from "../../models/service";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../../api/services";
import { getErrorMessage } from "../../utils/getErrorMessage";

function* fetchServicesSaga(): Generator {
  try {
    const response = (yield call(getServices)) as ResponsePayload<{
      services: ServiceMap;
    }>;
    yield put(fetchServicesCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(fetchServicesErrorAction({ error: getErrorMessage(err) }));
  }
}

function* createServiceSaga(
  action: PayloadAction<{ service: AddServicePayload }>
): Generator {
  try {
    const response = (yield call(
      createService,
      action.payload.service
    )) as ResponsePayload<{ service: Service }>;
    yield put(createServiceCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(createServiceErrorAction({ error: getErrorMessage(err) }));
  }
}

function* updateServiceSaga(
  action: PayloadAction<{ service: UpdateServicePayload }>
): Generator {
  try {
    const response = (yield call(
      updateService,
      action.payload.service
    )) as ResponsePayload<{ service: Service }>;
    yield put(updateServiceCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(updateServiceErrorAction({ error: getErrorMessage(err) }));
  }
}

function* deleteServiceSaga(action: PayloadAction<{ id: string }>): Generator {
  try {
    const response = (yield call(
      deleteService,
      action.payload.id
    )) as ResponsePayload<{ id: string }>;
    yield put(deleteServiceCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(deleteServiceErrorAction({ error: getErrorMessage(err) }));
  }
}

function* servicesSaga() {
  yield takeEvery(fetchServicesInitiatedAction, fetchServicesSaga);
  yield takeEvery(createServiceInitiatedAction, createServiceSaga);
  yield takeEvery(updateServiceInitiatedAction, updateServiceSaga);
  yield takeEvery(deleteServiceInitiatedAction, deleteServiceSaga);
}

export default servicesSaga;
