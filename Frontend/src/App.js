import './App.css';
import Navigation from './Components/Navigation/Navigation.js';
import HeroSection from './Components/HeroSection/HeroSection';
import CenterBox from './Components/CenterBox/CenterBox';
import About from './Components/About/About';
import {useUploadContext} from './Context/UploadContext';
import Result from './Components/Result/Result';
import React from 'react';
import Auth from "./Components/Auth/Auth";
import Dashboard from "./Components/Dashboard/Dashboard";

function App() {
    const {showComponent, logged, dashboard} = useUploadContext();

    return (
        logged ? (
            <div className='app'>
                <Navigation/>
                {!dashboard && (showComponent ? <Result/> : <HeroSection/>)}
                {(!showComponent && !dashboard) && <CenterBox/> }
                {dashboard && <Dashboard/>}
                <About id="about"/>
            </div>
        ) : (
            <Auth/>
        )
    );
}

export default App;
