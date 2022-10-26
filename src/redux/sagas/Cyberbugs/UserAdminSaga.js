import Axios from "axios";
import {
  fork,
  take,
  takeEvery,
  delay,
  takeLatest,
  call,
  put,
  select,
} from "redux-saga/effects";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";

import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";

import { history } from "../../../util/history";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import {
  DELETE_USER_ADMIN_SAGA,
  GET_USER_ADMIN,
  GET_USER_ADMIN_SAGA,
  UPDATE_USER_ADMIN_SAGA,
  USER_SIGN_UP_SAGA,
} from "../../constants/Cyberbugs/UserConstants";
import { userAdminService } from "../../../services/UserAdminService";
import { CLOSE_DRAWER } from "../../constants/Cyberbugs/DrawerConst";

//sign up
function* userSignUpSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(500);

  try {
    const { data, status } = yield call(() =>
      userAdminService.userSignUpAPI(action.signUpForm)
    );

    if (status === STATUS_CODE.SUCCESS) {
      notifiFunction("success", "Register is successful");
      history.push("/login");
    }
  } catch (error) {
    notifiFunction("error", "Register is unsuccessful");
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiUserSignUpSaga() {
  yield takeLatest(USER_SIGN_UP_SAGA, userSignUpSaga);
}
// get user 
function* userUserAdminSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userAdminService.getUserAdminAPI(action.keyWord)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_ADMIN,
        arrUserAdmin: data.content,
      });
    }
  } catch (error) {
    console.log("error", error.response?.data);
  }
}

export function* theoDoiGetUserAdminSaga() {
  yield takeLatest(GET_USER_ADMIN_SAGA, userUserAdminSaga);
}

//delete user admin
function* deleteUserAdminSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userAdminService.deleteUserAdminAPI(action.userId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      notifiFunction("success", "Delete is successful");
      yield put({
        type: GET_USER_ADMIN_SAGA,
      });
    }
  } catch (error) {
    console.log("error", error.response?.data);
    notifiFunction("error", "Delete is unsuccessful");
  }
}

export function* theoDoiDeleteUserAdminSaga() {
  yield takeLatest(DELETE_USER_ADMIN_SAGA, deleteUserAdminSaga);
}

//update user admin
function* updateUserAdminSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(500);

  try {
    const { data, status } = yield call(() =>
      userAdminService.updateUserAdminAPI(action.updateUser)
    );

    if (status === STATUS_CODE.SUCCESS) {
      notifiFunction("success", "Update is successful");

      yield put({
        type: GET_USER_ADMIN_SAGA,
      });

      yield put({
        type: CLOSE_DRAWER,
        visible: false,
      });
    } else {
      notifiFunction("error", "Update is unsuccessful");
    }
  } catch (error) {
    console.log("error", error.response?.data);
    notifiFunction("error", "Update is unsuccessful");
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiUpdateUserAdminSaga() {
  yield takeLatest(UPDATE_USER_ADMIN_SAGA, updateUserAdminSaga);
}
