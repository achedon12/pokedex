import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import Loader from '../PokeLoader';
import Popup from "../Popup.jsx";
import PokemonCard from "./PokemonCard.jsx";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
      const fetches = response.data.results.map(pokemon => axios.get(pokemon.url));
      const results = await Promise.all(fetches);

      const pokemonData = await Promise.all(results.map(async result => {
        const speciesResponse = await axios.get(result.data.species.url);
        const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
        const evolutionResponse = await axios.get(evolutionChainUrl);
        const evolutions = await getEvolutions(evolutionResponse.data.chain);

        const moves = result.data.moves.map(move => move.move.name);

        return {
          name: result.data.name,
          image: result.data.sprites.front_default,
          shinyImage: result.data.sprites.front_shiny,
          type: result.data.types[0].type.name,
          hp: result.data.stats[0].base_stat,
          attack: result.data.stats[1].base_stat,
          defense: result.data.stats[2].base_stat,
          evolutions,
          moves,
        };
      }));

      const basePokemons = pokemonData.filter(pokemon => pokemon.evolutions[0].name === pokemon.name);
      setPokemons(basePokemons);
      setLoading(false);
    };

    fetchPokemons();
  }, []);

  const getEvolutions = async (chain) => {
    const evolutions = [];
    let current = chain;

    while (current) {
      const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${current.species.name}`);
      evolutions.push({
        name: current.species.name,
        image: pokemonResponse.data.sprites.front_default,
        shinyImage: pokemonResponse.data.sprites.front_shiny,
        type: pokemonResponse.data.types[0].type.name,
        hp: pokemonResponse.data.stats[0].base_stat,
        attack: pokemonResponse.data.stats[1].base_stat,
        defense: pokemonResponse.data.stats[2].base_stat,
        //abilities: pokemonResponse.data.abilities
      });
      current = current.evolves_to[0];
    }

    return evolutions;
  };

  const onClosePopup = () => {
    setPopupIsOpen(false);
  };

  const onOpenPopup  =  (pokemon) => {
    setPopupContent(pokemon);
    setPopupIsOpen(true);
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {loading ? <Loader /> : pokemons.map(pokemon => (
        <Card
          key={pokemon.name}
          pokemon={pokemon}
          onShow={(p) => onOpenPopup(p)}
        />
      ))}
      <Popup isOpen={popupIsOpen} onClose={onClosePopup}>
        {popupContent && (<PokemonCard pokemon={popupContent} />)}
      </Popup>
    </div>
  );
}

export default Pokedex;