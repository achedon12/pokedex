import './App.css';
import Pokedex from './components/pokedex/Pokedex';
import Footer from "./components/Footer.jsx";
import NavBar from "./components/NavBar.jsx";
import {version} from '../package.json';

function App() {

  return (
    <div className="App flex flex-col min-h-screen w-full">
      <div className="flex flex-row h-[90vh]">
          <NavBar />
          <Pokedex />
      </div>
      <Footer version={version}/>
    </div>
  );
}

export default App;