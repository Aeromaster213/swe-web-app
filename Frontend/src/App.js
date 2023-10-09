// import './App.css';
// import Navigation from './Components/Navigation/Navigation.js';
// import HeroSection from './Components/HeroSection/HeroSection';
// import CenterBox from './Components/CenterBox/CenterBox';
// import About from './Components/About/About';

// function App() {
//   return (
//     <div className='app'>
//       <Navigation />
//       <HeroSection />
//       <CenterBox />
//       <About />
//     </div>
//   );
// }

// export default App;


import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
// We import all the Components we need in our app
import Navbar from "./Components/navbar";
import RecordList from "./Components/recordList";
import Edit from "./Components/edit";
import Create from "./Components/create";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
};
export default App;