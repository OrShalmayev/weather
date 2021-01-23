import { createSelector, createSlice } from '@reduxjs/toolkit';
import { apiHelpers } from '../../app/api'

export const countrySlice = createSlice({
  name: 'country',
  initialState: {
    fiveDay: [],
    currentWeather: [],
    loading: false,
    error: null
  },
  reducers: {
    fetchCountryStart: (state, action) => {
      return {
        ...state,
        loading: true,
        error: null
      }
    },
    fetchCountrySuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        error: null,
        fiveDay: [
          ...action.payload.data
        ],
      }
    },
    fetchCountryError: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload.value
      }
    },
  },
});

export const { 
  fetchCountryStart,
  fetchCountrySuccess,
  fetchCountryError,
} = countrySlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const fetchCountryAsync = country => async (dispatch, getState) => {
  // dispatch starting fetch country
  dispatch(fetchCountryStart());
  try {
    // get the chosen country from the search input
    const payload = await fetch(apiHelpers.fiveDayDailyForecast(country.Key)).then(res=>res.json()).catch(err=>Promise.reject(new Error(err)));
    console.log('fetchCountryAsync', payload)
    let weekday = new Array(7);
    weekday[0]="Sunday";
    weekday[1]="Monday";
    weekday[2]="Tuesday";
    weekday[3]="Wednesday";
    weekday[4]="Thursday";
    weekday[5]="Friday";
    weekday[6]="Saturday";
    const fToCel = (valNum) => {
      valNum = parseFloat(valNum);
      valNum =  (valNum-32) / 1.8;
      return parseInt(valNum);
    }
    dispatch(fetchCountrySuccess({data: payload.DailyForecasts.map(day => {
      return {
        ...day,
        Date: weekday[new Date(day.Date).getDay()],
        Temperature: {
          Maximum: {Value: fToCel(day.Temperature.Maximum.Value), Unit: "C", UnitType: 18},
          Minimum: {Value: fToCel(day.Temperature.Minimum.Value), Unit: "C", UnitType: 18}
        }
      }
    })}))
  } catch (error) {
    dispatch(fetchCountryError({value: error}));
  }
}


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCountryWeather = createSelector(
  state => state.country.fiveDay,
  state => state.country.currentWeather,
  state => state.country.loading,
  state => state.country.error,
  (fiveDay, currentWeather, loading, error) => {
    return {
      fiveDay
    }
  }
)

export default countrySlice.reducer;
