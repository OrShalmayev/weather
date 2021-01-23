import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './country.module.css';
import Lottie from 'react-lottie';
import cloudyData from '../../assets/lottie/cloudy.json';
import sunnyData from '../../assets/lottie/sunny.json';
import mistData from '../../assets/lottie/mist.json';
import showerData from '../../assets/lottie/shower.json';
import snow_sunnyData from '../../assets/lottie/snow_sunny.json';
import stormData from '../../assets/lottie/storm.json';
import thunderData from '../../assets/lottie/thunder.json';
import windyData from '../../assets/lottie/windy.json';
import snowData from '../../assets/lottie/snow.json';


// selectors
import { selectCountryWeather } from '../country/countrySlice';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '&__date': {
      color: 'red',
    },
    '&__icon': {
      color: 'blue,'
    },
    '&__temprature': {
      '&_min': {
        color: 'gray',
        '&::after': {
          content: '"\\2103"',
        }
      },
      '&_max': {
        color: 'black',
        paddingRight: '1rem',
        '&::after': {
          content: '"\\2103"',
        }
      }
    }
  },
}));

const icons =  [
  {key: "1", title: "Sunny", animation: sunnyData},
  {key: "2", title: "Mostly Sunny", animation: sunnyData},
  {key: "3", title: "Partly Sunny", animation: cloudyData},
  {key: "4", title: "Intermittent Clouds", animation: cloudyData},
  {key: "5", title: "Hazy Sunshine", animation: cloudyData},
  {key: "6", title: "Mostly Cloudy", animation: cloudyData},
  {key: "7", title: "Cloudy", animation: cloudyData},
  {key: "8", title: "Dreary (Overcast)", animation: cloudyData},
  {key: "11", title: "Fog", animation: windyData},
  {key: "12", title: "Showers", animation: showerData},
  {key: "13", title: "Mostly Cloudy w/ Showers", animation: windyData},
  {key: "14", title: "Partly Sunny w/ Showers", animation: windyData},
  {key: "15", title: "T-Storms", animation: stormData},
  {key: "16", title: "Mostly Cloudy w/ T-Storms", animation: stormData},
  {key: "17", title: "Partly Sunny w/ T-Storms", animation: stormData},
  {key: "18", title: "Rain", animation: showerData},
  {key: "19", title: "Flurries", animation: showerData},
  {key: "20", title: "Mostly Cloudy w/ Flurries", animation: cloudyData},
  {key: "21", title: "Partly Sunny w/ Flurries", animation: cloudyData},
  {key: "22", title: "Snow", animation: snow_sunnyData},
  {key: "23", title: "Mostly Cloudy w/ Snow", animation: snow_sunnyData},
  {key: "24", title: "Ice", animation: snow_sunnyData},
  {key: "25", title: "Sleet", animation: stormData},
  {key: "26", title: "Freezing Rain", animation: stormData},
  {key: "29", title: "Rain and Snow", animation: snowData},
  {key: "30", title: "Hot", animation: sunnyData},
  {key: "31", title: "Cold", animation: thunderData},
  {key: "32", title: "Windy", animation: thunderData},
  {key: "33", title: "Clear", animation: sunnyData},
  {key: "34", title: "Mostly Clear", animation: sunnyData},
  {key: "35", title: "Partly Cloudy", animation: cloudyData},
  {key: "36", title: "Intermittent Clouds", animation: cloudyData},
  {key: "37", title: "Hazy Moonlight", animation: cloudyData},
  {key: "38", title: "Mostly Cloudy", animation: cloudyData},
  {key: "39", title: "Partly Cloudy w/ Showers", animation: showerData},
  {key: "40", title: "Mostly Cloudy w/ Showers", animation: showerData},
  {key: "41", title: "Partly Cloudy w/ T-Storms", animation: thunderData},
  {key: "42", title: "Mostly Cloudy w/ T-Storms", animation: thunderData},
  {key: "43", title: "Mostly Cloudy w/ Flurries", animation: thunderData},
  {key: "44", title: "Mostly Cloudy w/ Snow", animation: snow_sunnyData},
];


const defaultOptions = (icon)=> {
  return {
    loop: true,
    autoplay: true, 
    animationData: icons.find(i=> String(i.key)===String(icon)).animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
};

export function Country() {
  const countryWeather = useSelector(selectCountryWeather);
  const dispatch = useDispatch();
  const classes = useStyles();

  React.useEffect( ()=> {
    console.log('**Country** did mount', countryWeather)
  }, [countryWeather]);
  // Component rerendered or updated
  React.useEffect( ()=> {
    console.log('**Country** Component rerendered')
  });

  if (!countryWeather.fiveDay.length) {
    return <h2>Country not selected</h2>
  } else {
    return (
      <div >
        <Grid className={classes.root} container spacing={1}>
          {countryWeather.fiveDay.map( day => {
            return <Paper className={classes.paper}>
              <div className={`${classes.paper}__date`}>{day.Date}</div>
              <div className={`${classes.paper}__icon`}>
              <Lottie options={defaultOptions(day.Day.Icon)}
                height={150}
                width={150}
              />
              </div>
              <div className={`${classes.paper}__temprature`}>
                <span className={`${classes.paper}__temprature_max`}>{day.Temperature.Maximum.Value}</span>
                <span className={`${classes.paper}__temprature_min`}>{day.Temperature.Minimum.Value}</span>
              </div>
            </Paper>
          })}
        </Grid>
      </div>
    );
  }

}