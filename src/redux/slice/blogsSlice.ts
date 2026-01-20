import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddBlogPayload,
  Blog,
  BlogMap,
  Blogs,
  UpdateBlogPayload,
} from "../../models/blog";

export type BlogsState = {
  blogs: Blogs;
  selectedBlogId: string;
  loading: boolean;
  message: string;
};

const initialState: BlogsState = {
  blogs: {},
  selectedBlogId: "",
  loading: false,
  message: "",
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    fetchBlogsInitiated,
    fetchBlogsCompleted,
    fetchBlogsError,
    createBlogInitiated,
    createBlogCompleted,
    createBlogError,
    updateBlogInitiated,
    updateBlogCompleted,
    updateBlogError,
    deleteBlogInitiated,
    deleteBlogCompleted,
    deleteBlogError,
  },
});

const { actions, reducer: blogsReducer } = blogsSlice;

export const {
  fetchBlogsInitiated: fetchBlogsInitiatedAction,
  fetchBlogsCompleted: fetchBlogsCompletedAction,
  fetchBlogsError: fetchBlogsErrorAction,
  createBlogInitiated: createBlogInitiatedAction,
  createBlogCompleted: createBlogCompletedAction,
  createBlogError: createBlogErrorAction,
  updateBlogInitiated: updateBlogInitiatedAction,
  updateBlogCompleted: updateBlogCompletedAction,
  updateBlogError: updateBlogErrorAction,
  deleteBlogInitiated: deleteBlogInitiatedAction,
  deleteBlogCompleted: deleteBlogCompletedAction,
  deleteBlogError: deleteBlogErrorAction,
} = actions;

export default blogsReducer;

// ----------------------------
// Reducers
// ----------------------------
function fetchBlogsInitiated(state: BlogsState) {
  state.loading = true;
}

function fetchBlogsCompleted(
  state: BlogsState,
  action: PayloadAction<{ blogs: BlogMap }>
) {
  state.loading = false;
  action.payload.blogs.forEach((blog) => {
    state.blogs[blog.id] = blog;
  });
}

function fetchBlogsError(
  state: BlogsState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function createBlogInitiated(
  state: BlogsState,
  _action: PayloadAction<{ blog: AddBlogPayload }>
) {
  state.loading = true;
}

function createBlogCompleted(
  state: BlogsState,
  action: PayloadAction<{ blog: Blog }>
) {
  state.blogs[action.payload.blog.id] = action.payload.blog;
  state.loading = false;
}

function createBlogError(
  state: BlogsState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading = false;
}

function updateBlogInitiated(
  state: BlogsState,
  _action: PayloadAction<{ blog: UpdateBlogPayload }>
) {
  state.loading = true;
}

function updateBlogCompleted(
  state: BlogsState,
  action: PayloadAction<{ blog: Blog }>
) {
  state.loading = false;
  state.blogs[action.payload.blog.id] = action.payload.blog;
}

function updateBlogError(
  state: BlogsState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function deleteBlogInitiated(
  state: BlogsState,
  _action: PayloadAction<{ id: string }>
) {
  state.loading = true;
}

function deleteBlogCompleted(
  state: BlogsState,
  action: PayloadAction<{ id: string }>
) {
  state.loading = false;
  delete state.blogs[action.payload.id];
}

function deleteBlogError(
  state: BlogsState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading = false;
}
