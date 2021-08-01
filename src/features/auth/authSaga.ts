import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, fork, put, take } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    //TODO: call api
    yield delay(1000);
    localStorage.setItem('access_token', 'abcdssk');
    yield put(
      authActions.loginSuccess({
        id: '12343',
        name: 'hung ton',
      })
    );
    //TODO: redirect to admin page
  } catch (error) {
    console.error(error);
    yield put(authActions.loginFailed(error.message));
    //TODO: redirect to login page
  }
}
function* handleLogout() {
  yield delay(500);
  localStorage.removeItem('access_token');
  //TODO: redirect to login page
}
function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(
        authActions.login.type
      );
      yield fork(handleLogin, action.payload);
    }
    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
