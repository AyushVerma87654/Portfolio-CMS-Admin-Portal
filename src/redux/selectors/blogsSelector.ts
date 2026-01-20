import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const blogsStateSelector = (state: AppState) => state.blogs;

export const blogsSelector = createSelector(
  [blogsStateSelector],
  (state) => state.blogs
);

export const blogsMapSelector = createSelector([blogsSelector], (blogs) =>
  Object.values(blogs)
);

export const selectedBlogIdSelector = createSelector(
  [blogsStateSelector],
  (state) => state.selectedBlogId
);

export const selectedBlogSelector = createSelector(
  [blogsSelector, selectedBlogIdSelector],
  (blogs, selectedId) => blogs[selectedId]
);

export const blogsLoadingSelector = createSelector(
  [blogsStateSelector],
  (state) => state.loading
);

export const blogsMessageSelector = createSelector(
  [blogsStateSelector],
  (state) => state.message
);
