
export const apiHelpers = {
    keys: [process.env.REACT_APP_API_KEY_1, process.env.REACT_APP_API_KEY_2, process.env.REACT_APP_API_KEY_3, process.env.REACT_APP_API_KEY_4],
    currentKeyIndex: 0,
    maxkeys: function(){
        return this.keys.lenngth-1;
    },
    nextKey: function(){
        if (this.currentKeyIndex>this.maxkeys) {
            this.currentKeyIndex=0;
        } else {
            ++this.currentKeyIndex;
        }
    },
    key: function(){
        return this.keys[this.currentKeyIndex];
    },
    autoComplete: function(search = '') {
        return `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.key()}&q=${search}&language=en`;
    },
    getCurrentWeather: function(locationKey = '') {
        return `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${this.key()}&language=en-US`;
    },
    fiveDayDailyForecast: function (locationKey = '', details = false, metric = false) {
        return `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${this.key()}&language=en-US&details=${details}&metric=${metric}`;
    }
}