import './App.css';
import Navigation from './Components/Navigation/Navigation.js';
import HeroSection from './Components/HeroSection/HeroSection';
import CenterBox from './Components/CenterBox/CenterBox';

function App() {
  return (
    <div className='app'>
      <Navigation />
      <HeroSection />
      <CenterBox />
    </div>
  );
}

export default App;
