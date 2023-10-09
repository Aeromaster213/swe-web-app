import './App.css';
import Navigation from './Components/Navigation/Navigation.js';
import HeroSection from './Components/HeroSection/HeroSection';
import CenterBox from './Components/CenterBox/CenterBox';
import About from './Components/About/About';
import { useUploadContext } from './Context/UploadContext';
import Result from './Components/Result/Result';

function App() {
  const {showComponent} = useUploadContext();

  return (
    <div className='app'>
      <Navigation />
      {showComponent?<Result />:<HeroSection />}
      <CenterBox />
      <About id="about" />
    </div>
  );
}

export default App;

