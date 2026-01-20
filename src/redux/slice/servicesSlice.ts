import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddServicePayload,
  Service,
  ServiceMap,
  Services,
  UpdateServicePayload,
} from "../../models/service";

export type ServicesState = {
  services: Services;
  selectedServiceId: string;
  loading: boolean;
  message: string;
};

const initialState: ServicesState = {
  services: {},
  selectedServiceId: "",
  loading: false,
  message: "",
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    fetchServicesInitiated,
    fetchServicesCompleted,
    fetchServicesError,
    updateServiceInitiated,
    updateServiceCompleted,
    updateServiceError,
    createServiceInitiated,
    createServiceCompleted,
    createServiceError,
    deleteServiceInitiated,
    deleteServiceCompleted,
    deleteServiceError,
  },
});

const { actions, reducer: servicesReducer } = servicesSlice;

export const {
  fetchServicesInitiated: fetchServicesInitiatedAction,
  fetchServicesCompleted: fetchServicesCompletedAction,
  fetchServicesError: fetchServicesErrorAction,
  updateServiceInitiated: updateServiceInitiatedAction,
  updateServiceCompleted: updateServiceCompletedAction,
  updateServiceError: updateServiceErrorAction,
  createServiceInitiated: createServiceInitiatedAction,
  createServiceCompleted: createServiceCompletedAction,
  createServiceError: createServiceErrorAction,
  deleteServiceInitiated: deleteServiceInitiatedAction,
  deleteServiceCompleted: deleteServiceCompletedAction,
  deleteServiceError: deleteServiceErrorAction,
} = actions;

export default servicesReducer;

// ----------------------------
// Reducers
// ----------------------------
function fetchServicesInitiated(state: ServicesState) {
  state.loading = true;
}

function fetchServicesCompleted(
  state: ServicesState,
  action: PayloadAction<{ services: ServiceMap }>
) {
  state.loading = false;
  action.payload.services.forEach((service) => {
    state.services[service.id] = service;
  });
}

function fetchServicesError(
  state: ServicesState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function updateServiceInitiated(
  state: ServicesState,
  _action: PayloadAction<{ service: UpdateServicePayload }>
) {
  state.loading = true;
}

function updateServiceCompleted(
  state: ServicesState,
  action: PayloadAction<{ service: Service }>
) {
  state.loading = false;
  state.services[action.payload.service.id] = action.payload.service;
}

function updateServiceError(
  state: ServicesState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function createServiceInitiated(
  state: ServicesState,
  _action: PayloadAction<{ service: AddServicePayload }>
) {
  state.loading = true;
}

function createServiceCompleted(
  state: ServicesState,
  action: PayloadAction<{ service: Service }>
) {
  state.services[action.payload.service.id] = action.payload.service;
  state.loading = false;
}

function createServiceError(
  state: ServicesState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading = false;
}

function deleteServiceInitiated(
  state: ServicesState,
  _action: PayloadAction<{ id: string }>
) {
  state.loading = true;
}

function deleteServiceCompleted(
  state: ServicesState,
  action: PayloadAction<{ id: string }>
) {
  delete state.services[action.payload.id];
  state.loading = false;
}

function deleteServiceError(
  state: ServicesState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading = false;
}
