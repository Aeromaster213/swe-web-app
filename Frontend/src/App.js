import './App.css';
import Navigation from './Components/Navigation/Navigation.js';
import HeroSection from './Components/HeroSection/HeroSection';
import CenterBox from './Components/CenterBox/CenterBox';
import About from './Components/About/About';
// import Create from './Components/create';

function App() {
  return (
    <div className='app'>
      <Navigation />
      <HeroSection />
      <CenterBox />
      <About id="about" />
      {/* <Create /> */}
    </div>
  );
}

export default App;

