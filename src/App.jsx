import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import AboutUs from './components/AboutUs';
import DogsList from './components/DogsList';

  function App() {
    return (
      <div className='App'>
        <DogsList />
      </div>
    );
  }
  export default App;