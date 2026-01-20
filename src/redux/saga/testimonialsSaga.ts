import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchTestimonialsInitiatedAction,
  createTestimonialInitiatedAction,
  updateTestimonialInitiatedAction,
  deleteTestimonialInitiatedAction,
  fetchTestimonialsCompletedAction,
  createTestimonialCompletedAction,
  updateTestimonialCompletedAction,
  deleteTestimonialCompletedAction,
  fetchTestimonialsErrorAction,
  createTestimonialErrorAction,
  updateTestimonialErrorAction,
  deleteTestimonialErrorAction,
} from "../slice/testimonialsSlice";
import { ResponsePayload } from "../../models/response";
import {
  AddTestimonialPayload,
  Testimonial,
  TestimonialMap,
  UpdateTestimonialPayload,
} from "../../models/testimonial";
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../../api/testimonials";
import { getErrorMessage } from "../../utils/getErrorMessage";

function* fetchTestimonialsSaga(): Generator {
  try {
    const response = (yield call(getTestimonials)) as ResponsePayload<{
      testimonials: TestimonialMap;
    }>;
    yield put(fetchTestimonialsCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(fetchTestimonialsErrorAction({ error: getErrorMessage(err) }));
  }
}

function* createTestimonialSaga(
  action: PayloadAction<{ testimonial: AddTestimonialPayload }>
): Generator {
  try {
    const response = (yield call(
      createTestimonial,
      action.payload.testimonial
    )) as ResponsePayload<{ testimonial: Testimonial }>;
    yield put(createTestimonialCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(createTestimonialErrorAction({ error: getErrorMessage(err) }));
  }
}

function* updateTestimonialSaga(
  action: PayloadAction<{ testimonial: UpdateTestimonialPayload }>
): Generator {
  try {
    const response = (yield call(
      updateTestimonial,
      action.payload.testimonial
    )) as ResponsePayload<{ testimonial: Testimonial }>;
    yield put(updateTestimonialCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(updateTestimonialErrorAction({ error: getErrorMessage(err) }));
  }
}

function* deleteTestimonialSaga(
  action: PayloadAction<{ id: string }>
): Generator {
  try {
    const response = (yield call(
      deleteTestimonial,
      action.payload.id
    )) as ResponsePayload<{ id: string }>;
    yield put(deleteTestimonialCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(deleteTestimonialErrorAction({ error: getErrorMessage(err) }));
  }
}

function* testimonialsSaga() {
  yield takeEvery(fetchTestimonialsInitiatedAction, fetchTestimonialsSaga);
  yield takeEvery(createTestimonialInitiatedAction, createTestimonialSaga);
  yield takeEvery(updateTestimonialInitiatedAction, updateTestimonialSaga);
  yield takeEvery(deleteTestimonialInitiatedAction, deleteTestimonialSaga);
}

export default testimonialsSaga;
