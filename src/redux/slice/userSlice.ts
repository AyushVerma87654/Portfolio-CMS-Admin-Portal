import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthCompletedResponse, LoginPayload, User } from "../../models/user";

export type UserState = {
  user: User;
  isLoggedIn: boolean;
  accessToken: string;
  isSideBarOpen: boolean;
  loading: boolean;
  message: string;
};

const initialState: UserState = {
  user: {
    id: "",
    name: "",
    email: "",
    createdAt: "",
    updatedAt: "",
  },
  isLoggedIn: false,
  accessToken: "",
  isSideBarOpen: false,
  loading: false,
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginInitiated,
    authCompleted,
    authError,
    fetchMeInitiated,
    logoutInitiated,
    logoutCompleted,
    logoutError,
    toggleIsSideBarOpen,
  },
});

const { actions, reducer: userReducer } = userSlice;

export const {
  loginInitiated: loginInitiatedAction,
  authCompleted: authCompletedAction,
  authError: authErrorAction,
  fetchMeInitiated: fetchMeInitiatedAction,
  logoutInitiated: logoutInitiatedAction,
  logoutCompleted: logoutCompletedAction,
  logoutError: logoutErrorAction,
  toggleIsSideBarOpen: toggleIsSideBarOpenAction,
} = actions;

export default userReducer;

function loginInitiated(
  state: UserState,
  _action: PayloadAction<LoginPayload>
) {
  state.loading = true;
}

function authCompleted(
  state: UserState,
  action: PayloadAction<AuthCompletedResponse>
) {
  state.loading = false;
  state.user = action.payload.user;
  state.isLoggedIn = true;
  state.accessToken = action.payload.accessToken;
}

function authError(state: UserState, action: PayloadAction<{ error: string }>) {
  state.loading = false;
  state.message = action.payload.error;
}

function fetchMeInitiated(state: UserState) {
  state.loading = true;
}

function logoutInitiated(state: UserState) {
  state.loading = true;
}

function logoutCompleted(
  _state: UserState,
  action: PayloadAction<{ message: string }>
) {
  return { ...initialState, message: action.payload.message };
}

function logoutError(
  state: UserState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading = false;
}

function toggleIsSideBarOpen(state: UserState) {
  state.isSideBarOpen = !state.isSideBarOpen;
}
