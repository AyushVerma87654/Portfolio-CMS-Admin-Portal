import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchBlogsInitiatedAction,
  createBlogInitiatedAction,
  updateBlogInitiatedAction,
  deleteBlogInitiatedAction,
  fetchBlogsCompletedAction,
  createBlogCompletedAction,
  updateBlogCompletedAction,
  deleteBlogCompletedAction,
  fetchBlogsErrorAction,
  createBlogErrorAction,
  updateBlogErrorAction,
  deleteBlogErrorAction,
} from "../slice/blogsSlice";
import { ResponsePayload } from "../../models/response";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { createBlog, deleteBlog, getBlogs, updateBlog } from "../../api/blogs";
import {
  AddBlogPayload,
  Blog,
  BlogMap,
  UpdateBlogPayload,
} from "../../models/blog";

function* fetchBlogsSaga(): Generator {
  try {
    const response = (yield call(getBlogs)) as ResponsePayload<{
      blogs: BlogMap;
    }>;
    yield put(fetchBlogsCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(fetchBlogsErrorAction({ error: getErrorMessage(err) }));
  }
}

function* createBlogSaga(
  action: PayloadAction<{ blog: AddBlogPayload }>
): Generator {
  try {
    const response = (yield call(
      createBlog,
      action.payload.blog
    )) as ResponsePayload<{ blog: Blog }>;
    yield put(createBlogCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(createBlogErrorAction({ error: getErrorMessage(err) }));
  }
}

function* updateBlogSaga(
  action: PayloadAction<{ blog: UpdateBlogPayload }>
): Generator {
  try {
    const response = (yield call(
      updateBlog,
      action.payload.blog
    )) as ResponsePayload<{ blog: Blog }>;
    yield put(updateBlogCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(updateBlogErrorAction({ error: getErrorMessage(err) }));
  }
}

function* deleteBlogSaga(action: PayloadAction<{ id: string }>): Generator {
  try {
    const response = (yield call(
      deleteBlog,
      action.payload.id
    )) as ResponsePayload<{ id: string }>;
    yield put(deleteBlogCompletedAction(response.responseDetails));
  } catch (err: any) {
    yield put(deleteBlogErrorAction({ error: getErrorMessage(err) }));
  }
}

function* blogsSaga() {
  yield takeEvery(fetchBlogsInitiatedAction, fetchBlogsSaga);
  yield takeEvery(createBlogInitiatedAction, createBlogSaga);
  yield takeEvery(updateBlogInitiatedAction, updateBlogSaga);
  yield takeEvery(deleteBlogInitiatedAction, deleteBlogSaga);
}

export default blogsSaga;
