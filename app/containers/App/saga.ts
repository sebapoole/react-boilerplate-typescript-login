/**
 * App sagas
 */
import { hashSync } from 'bcryptjs';
import { push, LOCATION_CHANGE } from 'connected-react-router';
import { all, call, cancel, select, take, takeLatest, put, race } from 'redux-saga/effects';
// import * as errorMessages from './errorMessages';
import { makeSelectFormState } from './selectors';
import ActionTypes from 'containers/App/constants';

import {
  logout,
  sendingRequest,
  setAuthState,
  changeForm,
  setErrorMessage,
} from './actions';

import auth from '../../utils/auth';
import genSalt from '../../utils/salt';

export function* authorize({ newUser, username, password }) {
  yield put(sendingRequest(true));

  try {
    const salt = genSalt(username);
    const hash = hashSync(password, salt);
    let response;

    newUser ? response = yield call(auth.signup, username, hash)
        : response = yield call(auth.login, username, hash);

    return response;
  } catch (error) {
    yield put(setErrorMessage(error.message));
    return false;
  } finally {
    yield put(sendingRequest(false));
  }
}

export function* logIn() {
  const userDetails = yield select(makeSelectFormState());
  const username = userDetails.username;
  const password = userDetails.password;
  const newUser = false;

  const winner = yield race({
    auth: call(authorize, { newUser, username, password }),
  });

  if (winner.auth) {
    yield put(setAuthState(true));
    yield put(changeForm({username: '', password: ''}));
    forwardTo('/dashboard');
  }
}

export function* signup() {
  const userDetails = yield select(makeSelectFormState());
  const username = userDetails.get('username');
  const password = userDetails.get('password');
  const newUser = true;

  const response = yield call(authorize, { newUser, username, password });
  console.log(response);

  if (response) {
    yield put(setAuthState(true));
    yield put(changeForm({username: '', password: ''}));
    forwardTo('/dashboard');
  }
}

export function* logOut() { // eslint-disable-line consistent-return
  yield put(sendingRequest(true));

  try {
    const response = yield call(auth.logout);
    yield put(sendingRequest(false));
    return response;
  } catch (error) {
    console.log('bye - also, you have an error'); // eslint-disable-line no-console
  }
}

export function* callLogout() {
  yield put(setAuthState(false));
  yield call(logout);
  forwardTo('/');
}

function* forwardTo(location) {
  yield put(push(location));
}

// Watchers
export function* userLogin() {
  const watcher = yield takeLatest(ActionTypes.LOGIN, logIn);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* userSignup() {
  const watcher = yield takeLatest(ActionTypes.SIGNUP, signup);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* userLogout() {
  const watcher = yield takeLatest(ActionTypes.LOGOUT, logOut);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default function* rootSaga() {
  try {
    yield all([
      userLogin(),
      userSignup(),
      userLogout(),
    ]);
  } catch (e) {
    console.log('error', e);
}
}
