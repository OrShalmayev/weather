import React from 'react';
import logo from './logo.svg';
// CSS
import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
// Components
import { Counter } from './features/counter/Counter';
import { Search } from './features/search/Search';
import { Country } from './features/country/Country';
// Store
import store from './app/store';
import Lottie from 'react-lottie';
// header lottie
import headerData from './assets/lottie/header.json';
import tree_in_wind_Data from './assets/lottie/tree_in_wind.json';
import suncloudData from './assets/lottie/suncloud.json';

const defaultOptions = (json) => {
  return {
    loop: true,
    autoplay: true, 
    animationData: json,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
};

function App() {
  React.useEffect(()=> {
    console.log('App mounted', store.getState())
  } ,[])
  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: '#D1F5FF', position:'relative', minHeight: '80vh', height: '80vh' }}>
        <div className="sun" style={{ maxWidth: '30%', position: 'absolute', top: '0', left: '0' }}>
          <Lottie 
            options={defaultOptions(suncloudData)}
          />
        </div>
        <h1>Weather App</h1>
        <div className="tree" style={{ maxWidth: '30%', position: 'absolute', right: '10%', bottom: '0', zIndex: '1' }}>
          <Lottie 
            options={defaultOptions(tree_in_wind_Data)}
          />
        </div>
        <div class="grass" style={{width:'100vw',position:'absolute',bottom:'0',padding:'3rem',backgroundColor:'green'}}></div>
      </header>
      <main>
        <Search />
        <Country />
      </main>
    </div>
  );
}

export default App;
