import cityApi from 'api/cityAPi';
import { City } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { cityActions } from './citySlice';

function* fetchCityList() {
  try {
    const response: Array<City> = yield call(cityApi.getAll);
    yield put(cityActions.fetchCityListSuccess(response));
  } catch (error) {
    yield put(cityActions.fetchCityListFailed());
  }
}

export default function* citySaga() {
  yield takeLatest(cityActions.fetchCityList.type, fetchCityList);
}
