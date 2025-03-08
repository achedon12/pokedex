import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Card from './Card';
import Loader from '../PokeLoader';
import Popup from "../Popup.jsx";
import PokemonCard from "./PokemonCard.jsx";

const Pokedex = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [popupIsOpen, setPopupIsOpen] = useState(false);
    const [popupContent, setPopupContent] = useState(null);
    const localStorage = window.localStorage;
    const [language, setLanguage] = useState(window.localStorage.getItem('language') || 'en');
    const limit = useRef(20);
    const offsetRef = useRef(localStorage.getItem('pokemons') ? JSON.parse(localStorage.getItem('pokemons')).length : 0);

    useEffect(() => {
        setLoading(true);
        if (localStorage.getItem('pokemons')) {
            setPokemons(JSON.parse(localStorage.getItem('pokemons')));
        } else {
            offsetRef.current = 0;
        }
        setLoading(false);

        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                offsetRef.current += limit.current;
                fetchPokemons(offsetRef.current, limit.current);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        fetchPokemons(offsetRef.current, limit.current, offsetRef.current === 0);
    }, [offsetRef.current]);

    useEffect(() => {
        if (language) {
            localStorage.setItem('language', language);
        }
    }, [language]);

    const fetchPokemons = async (fetchOffset, fetchLimit, firstFetch = false) => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${fetchLimit}&offset=${fetchOffset}`);
        const fetches = response.data.results.map(pokemon => axios.get(pokemon.url));
        const results = await Promise.all(fetches);
        firstFetch ? setLoading(true) : setLoadingMore(true);

        const pokemonData = await Promise.all(results.map(async result => {
            const speciesResponse = await axios.get(result.data.species.url);
            const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
            const evolutionResponse = await axios.get(evolutionChainUrl);
            const evolutions = await getEvolutions(evolutionResponse.data.chain);
            const abilities = await getAbilities(result.data.abilities);
            const names = await getLanguagesNames(speciesResponse.data.names);
            const moves = result.data.moves.map(move => move.move.name);

            return {
                id: result.data.id,
                names,
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
        setPokemons(prevPokemons => [...prevPokemons, ...basePokemons]);
        setLoading(false);
        setLoadingMore(false);
        const pokemonsFromLocalStorage = JSON.parse(localStorage.getItem('pokemons'));
        if (pokemonsFromLocalStorage) {
            const newPokemons = [...pokemonsFromLocalStorage, ...basePokemons];
            localStorage.setItem('pokemons', JSON.stringify(newPokemons));
        } else {
            localStorage.setItem('pokemons', JSON.stringify(basePokemons));
        }
    };

    const getLanguagesNames = async (names) => {
        return names.map(name => ({
            name: name.name,
            language: name.language.name,
        }));
    };

    const getEvolutions = async (chain) => {
        const evolutions = [];
        let current = chain;

        while (current) {
            const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${current.species.name}`);
            const speciesResponse = await axios.get(pokemonResponse.data.species.url);
            const abilities = await getAbilities(pokemonResponse.data.abilities);
            const names = await getLanguagesNames(speciesResponse.data.names);
            evolutions.push({
                id: pokemonResponse.data.id,
                names,
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
                abilities
            });
            current = current.evolves_to[0];
        }

        return evolutions;
    };

    const getAbilities = async (abilities) => {
        const abilityFetches = abilities.map(ability => axios.get(ability.ability.url));
        const abilityResults = await Promise.all(abilityFetches);

        return abilityResults.map(result => ({
            name: result.data.names.find(name => name.language.name === language)?.name || result.data.name,
            effect: result.data.effect_entries.find(entry => entry.language.name === language)?.effect,
        }));
    }

    const onClosePopup = () => {
        setPopupIsOpen(false);
    };

    const onOpenPopup = (pokemon) => {
        setPopupContent(pokemon);
        setPopupIsOpen(true);
    }

    return (
        <div className="flex flex-wrap justify-center items-center p-4 gap-4 relative overflow-y-auto w-full">
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="absolute top-2 right-2 p-2 rounded-md bg-gray-200 text-dark">
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
            </select>
            {loading ? <Loader/> : pokemons.map((pokemon, index) => (
                <Card
                    key={index}
                    pokemon={pokemon}
                    onShow={(p) => onOpenPopup(p)}
                />
            ))}
            {loadingMore && !loading && <Loader/>}
            <Popup isOpen={popupIsOpen} onClose={onClosePopup}>
                {popupContent && (<PokemonCard pokemon={popupContent}/>)}
            </Popup>
        </div>
    );
}

export default Pokedex;