import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import HeroSection from './components/HeroSection/HeroSection';
import CenterBox from './components/CenterBox/CenterBox';

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
