import { createSelector, createSlice } from '@reduxjs/toolkit';
import { apiHelpers } from '../../app/api'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    value: '',
    filteredCountries: [],
    selectedCountery: null,
    cachedCountries: [],
    error: null,
    loading: false,
  },
  reducers: {
    updateValue: (state, action) => {
      return {
        ...state,
        value: action.payload.value,
        loading: false,
        error: null
      }
    },
    searchCountryStart: (state, action) => {
      return {
        ...state,
        loading: true,
        error: null
      }
    },
    searchCountrySuccess: (state, action) => {
      return {
        ...state,
        filteredCountries: [...action.payload.data.map(c=>({Key: c.Key, LocalizedName: c.LocalizedName}))],
        cachedCountries: [
          ...state.cachedCountries,
          ...action.payload.data
            .map(c=>({Key: c.Key, LocalizedName: c.LocalizedName}))
              // only if we dont find the ame localized name then added it to the cached 
              .filter(c => !state.cachedCountries.find(({LocalizedName}) => {
                return c.LocalizedName === LocalizedName
              }))
        ],
        loading: false,
        error: null
      }
    },
    searchCountryCachedSuccess: (state, action) => {
      return {
        ...state,
        filteredCountries: [...action.payload.data.map(c=>({Key: c.Key, LocalizedName: c.LocalizedName}))],
        loading: false,
        error: null
      }
    },
    searchCountryStartError: (state, action) => {
      return {
        ...state,
        error: action.payload.value,
        loading: false,
      }
    },
    selectCountryStart: (state, action) => {
      return {
        ...state, 
        loading: true,
        error: null
      }
    },
    selectCountrySuccess: (state, action) => {
      return {
        ...state, 
        loading: false,
        error: null
      }
    },
    selectCountryError: (state, action) => {
      return {
        ...state, 
        loading: false,
        error: action.payload.value
      }
    },
  },
});

export const { 
  updateValue,
  // search
  searchCountryStart, 
  searchCountrySuccess, 
  searchCountryStartError,
  searchCountryCachedSuccess,
  // select
  selectCountryStart,
  selectCountrySuccess,
  selectCountryError
} = searchSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const autoCompleteAsync = text => async (dispatch, getState) => {
  if(typeof text !== 'string') {
    dispatch(searchCountryStartError({value: 'text must be string'}))
    return;
  } else if (text.replace(/\s+$/, '').length < 2) {
    dispatch(searchCountryStartError({value: 'country must contain at least 2 letters'}))
  } else if (text.replace(/\s+$/, '').length >= 2) {
    dispatch(updateValue({value: text}))
    dispatch(searchCountryStart())
    // before making ajax req check if the text already exists in the cached state
    let cached = getState().search.cachedCountries.filter(cc => cc.LocalizedName.toLowerCase().includes(text));
    if (cached.length) {
      dispatch(searchCountryCachedSuccess({data: cached}))
    } else {
      // make ajax request to the API
      try {
        let payload = await fetch(apiHelpers.autoComplete(text))
          .then(res=>res.json())
          .catch(err=>searchCountryStartError({value:err}))
          dispatch(searchCountrySuccess({data: payload}))
      } catch (error) {
        apiHelpers.nextKey();
        Promise.reject(searchCountryStartError({value:error}));
      }
    }
  }
};

export const selectCountryAsync = country => async (dispatch, getState) => {
  if(typeof country !== 'string') {
    dispatch(selectCountryError({value: 'text must be string'}))
    return;
  } else if (country.replace(/\s+$/, '').length < 2){
    // text must be greater then 2 characters to make the ajax request
    dispatch(selectCountryError({value: 'country must contain at least 2 letters'}))
  } else {
    dispatch(selectCountryStart());
    try {
      let payload = await fetch(apiHelpers.getCurrentWeather(country))
        .then(res=>res.json())
        .catch(err=> dispatch(selectCountryError({value:err})))
        dispatch(selectCountrySuccess({data: payload}))
    } catch (error) {
      Promise.reject(dispatch(selectCountryError({value:error})));
    }
  }
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectSearch = createSelector(
  state => state.search.value,
  state => state.search.filteredCountries,
  state => state.search.cachedCounteries,
  (value, filteredCountries, cachedCounteries) => {
    return {
      value,
      filteredCountries,
      cachedCounteries
    }
  }

)

export default searchSlice.reducer;
