import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { City } from 'models';

export interface cityState {
  loading: boolean;
  list: City[];
}
const initialState: cityState = {
  loading: false,
  list: [],
};
const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    fetchCityList(state) {
      state.loading = true;
    },
    fetchCityListSuccess(state, action: PayloadAction<Array<City>>) {
      state.loading = false;
      state.list = action.payload;
    },
    fetchCityListFailed(state) {
      state.loading = false;
    },
  },
});

// Actions
export const cityActions = citySlice.actions;

// selector
export const selectCityLoading = (state: RootState) => state.city.loading;
export const selectCityList = (state: RootState) => state.city.list;
export const selectCityMap = createSelector(selectCityList, (cityList) =>
  cityList.reduce((map: { [key: string]: City }, city) => {
    map[city.code] = city;
    return map;
  }, {})
);

export const selectCityOptions = createSelector(selectCityList, (cityList) =>
  cityList.map((city) => ({
    label: city.name,
    value: city.code,
  }))
);

// Reducer
const cityReducer = citySlice.reducer;
export default cityReducer;
