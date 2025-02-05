import './App.css';
import Pokedex from './components/pokedex/Pokedex';
import Footer from "./components/Footer.jsx";
import {useEffect, useState} from "react";
import {version} from '../package.json';

function App() {
  const [currentVersion, setCurrentVersion] = useState(version);

    useEffect(() => {
    }, []);

  return (
    <div className="App flex flex-col min-h-screen">
      <Pokedex />
      <Footer version={currentVersion}/>
    </div>
  );
}

export default App;