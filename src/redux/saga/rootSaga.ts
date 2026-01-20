import { all, fork } from "redux-saga/effects";

import userSaga from "./userSaga";
import aboutSaga from "./aboutSaga";
import skillsSaga from "./skillsSaga";
import projectsSaga from "./projectsSaga";
import blogsSaga from "./blogsSaga";
import experienceSaga from "./experienceSaga";
import testimonialsSaga from "./testimonialsSaga";
import servicesSaga from "./servicesSaga";
import mediaSaga from "./mediaSaga";
import imageUploadSaga from "./imageUploadSaga";

function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(aboutSaga),
    fork(skillsSaga),
    fork(projectsSaga),
    fork(blogsSaga),
    fork(experienceSaga),
    fork(testimonialsSaga),
    fork(servicesSaga),
    fork(mediaSaga),
    fork(imageUploadSaga),
  ]);
}

export default rootSaga;
