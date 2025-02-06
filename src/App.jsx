import './App.css';
import Pokedex from './components/pokedex/Pokedex';
import Footer from "./components/Footer.jsx";
import {version} from '../package.json';

function App() {

  return (
    <div className="App flex flex-col min-h-screen">
      <Pokedex />
      <Footer version={version}/>
    </div>
  );
}

export default App;