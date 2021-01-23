import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import searchReducer from '../features/search/searchSlice';
import countryReducer from '../features/country/countrySlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    search: searchReducer,
    country: countryReducer
  },
});
