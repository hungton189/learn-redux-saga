import { PayloadAction } from '@reduxjs/toolkit';
import {
  incrementSaga,
  incrementSagaSuccess,
} from 'features/counter/counterSlice';
import { delay, put, takeLatest } from 'redux-saga/effects';

function* handleIncrementSaga(action: PayloadAction<number>) {
  yield delay(2000);
  yield put(incrementSagaSuccess(action.payload));
}

export default function* rootSaga() {
  //   yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
  yield takeLatest(incrementSaga.toString(), handleIncrementSaga);
}
