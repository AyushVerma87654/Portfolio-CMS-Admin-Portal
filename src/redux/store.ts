import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";

// Import all reducers
import userReducer from "./slice/userSlice";
import aboutReducer from "./slice/aboutSlice";
import skillsReducer from "./slice/skillsSlice";
import projectsReducer from "./slice/projectsSlice";
import blogsReducer from "./slice/blogsSlice";
import experienceReducer from "./slice/experienceSlice";
import testimonialsReducer from "./slice/testimonialsSlice";
import servicesReducer from "./slice/servicesSlice";
import mediaReducer from "./slice/mediaSlice";
import imageUploadReducer from "./slice/imageUploadSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    about: aboutReducer,
    skills: skillsReducer,
    projects: projectsReducer,
    blogs: blogsReducer,
    experience: experienceReducer,
    testimonials: testimonialsReducer,
    services: servicesReducer,
    media: mediaReducer,
    imageUpload: imageUploadReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
  devTools: true,
});

sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof store.getState>;

export default store;
