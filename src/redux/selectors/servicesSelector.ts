import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const servicesStateSelector = (state: AppState) => state.services;

export const servicesSelector = createSelector(
  [servicesStateSelector],
  (state) => state.services
);

export const servicesMapSelector = createSelector(
  [servicesSelector],
  (services) => Object.values(services)
);

export const selectedServiceIdSelector = createSelector(
  [servicesStateSelector],
  (state) => state.selectedServiceId
);

export const selectedServiceSelector = createSelector(
  [servicesSelector, selectedServiceIdSelector],
  (services, selectedId) => services[selectedId]
);

export const servicesLoadingSelector = createSelector(
  [servicesStateSelector],
  (state) => state.loading
);

export const servicesMessageSelector = createSelector(
  [servicesStateSelector],
  (state) => state.message
);
