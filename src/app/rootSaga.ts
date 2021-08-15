import { authSaga } from 'features/auth/authSaga';
import citySaga from 'features/city/citySaga';
import dashboardSaga from 'features/Dashboard/dashboardSaga';
import studentSaga from 'features/Student/studentSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([authSaga(), dashboardSaga(), studentSaga(), citySaga()]);
}
