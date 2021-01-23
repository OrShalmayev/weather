import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  autoCompleteAsync,
  selectSearch,
  selectCountryAsync
} from './searchSlice';
import {
  fetchCountryAsync
} from '../country/countrySlice';
import styles from './search.module.css';

// Components
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export function Search() {
  const search = useSelector(selectSearch);
  const dispatch = useDispatch();

  // Component did mount
  React.useEffect( ()=> {
    console.log('**Search** mounted', search)
  }, []);

  // Component did update
  React.useEffect( ()=> {
    console.log('**Search** Component did update', search)
  }, [search]);

  // Component rerendered
  React.useEffect( ()=> {
    console.log('**Search** Component rerendered')
  });

  return (
    <div style={{ display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center' }}>
      <p>searched for: {search.value}</p>
      <Autocomplete
        onKeyUp={(event)=>{
          // make ajax to get the country matches the value from this input
          let {value: v} = event.target;
          v = v.replace(/\s+$/, '');
          if( v.length>=2 ){
            dispatch(autoCompleteAsync(v))
          }
        }}//END onKeyPress
        onChange={(event, values)=>{
          // user chose the city make ajax req to get the city weather
          dispatch(fetchCountryAsync(values));
        }}
        id="combo-box-demo"
        options={search.filteredCountries}
        getOptionLabel={(option) => option.LocalizedName}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search for country" variant="outlined" />}
      />
    </div>
  );
}