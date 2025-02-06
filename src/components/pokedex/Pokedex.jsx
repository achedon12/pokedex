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
        const abilities = await getAbilities(result.data.abilities);

        const moves = result.data.moves.map(move => move.move.name);

        return {
          id: result.data.id,
          name: result.data.name,
          image: result.data.sprites.front_default,
          shinyImage: result.data.sprites.front_shiny,
          types: result.data.types.map(type => type.type.name),
          abilities,
          stats: [
            {name: 'HP', value: result.data.stats[0].base_stat, color: '#DF2140'},
            {name: 'ATK', value: result.data.stats[1].base_stat, color: '#FF994D'},
            {name: 'DEF', value: result.data.stats[2].base_stat, color: '#eecd3d'},
            {name: 'SpA', value: result.data.stats[3].base_stat, color: '#85DDFF'},
            {name: 'SpD', value: result.data.stats[4].base_stat, color: '#96da83'},
            {name: 'SPD', value: result.data.stats[5].base_stat, color: '#FB94A8'},
          ],
          cries: {
            latest: result.data.cries.latest,
            legacy: result.data.cries.legacy,
          },
          weight: result.data.weight,
          height: result.data.height,
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
        id: pokemonResponse.data.id,
        name: current.species.name,
        image: pokemonResponse.data.sprites.front_default,
        shinyImage: pokemonResponse.data.sprites.front_shiny,
        types: pokemonResponse.data.types.map(type => type.type.name),
        stats: [
          {name: 'HP', value: pokemonResponse.data.stats[0].base_stat, color: '#DF2140'},
          {name: 'ATK', value: pokemonResponse.data.stats[1].base_stat, color: '#FF994D'},
          {name: 'DEF', value: pokemonResponse.data.stats[2].base_stat, color: '#eecd3d'},
          {name: 'SpA', value: pokemonResponse.data.stats[3].base_stat, color: '#85DDFF'},
          {name: 'SpD', value: pokemonResponse.data.stats[4].base_stat, color: '#96da83'},
          {name: 'SPD', value: pokemonResponse.data.stats[5].base_stat, color: '#FB94A8'},
        ],
        cries: {
          latest: pokemonResponse.data.cries.latest,
          legacy: pokemonResponse.data.cries.legacy,
        },
        weight: pokemonResponse.data.weight,
        height: pokemonResponse.data.height,
        abilities: pokemonResponse.data.abilities,
      });
      current = current.evolves_to[0];
    }

    return evolutions;
  };

  const getAbilities = async (abilities) => {
    const abilityFetches = abilities.map(ability => axios.get(ability.ability.url));
    const abilityResults = await Promise.all(abilityFetches);

    return abilityResults.map(result => ({
      name: result.data.name,
      effect: result.data.effect_entries.find(entry => entry.language.name === 'en')?.effect,
    }));
  }

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