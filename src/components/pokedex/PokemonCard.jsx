import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {FastAverageColor} from "fast-average-color";

const PokemonCard = ({ pokemon }) => {

    const [headerColor, setHeaderColor] = useState(null);

    useEffect(() => {
        if (pokemon && pokemon.image) {
            const fac = new FastAverageColor();
            fac.getColorAsync(pokemon.image)
                .then(color => {
                    setHeaderColor(color.rgb);
                })
                .catch(e => {
                    console.error(e);
                });
            console.log('pokemon', pokemon);
        }
    }, [pokemon]);

    if (!pokemon && !headerColor) return null;

    return (
        <div className="relative border-2 border-gray-300 rounded-lg p-2 w-72 bg-gray-300 shadow-lg">
            <div className="relative border-2 border-gray-900 bg-gray-900 h-96 pokemon-card">
                <header className="relative flex flex-row pl-14 pr-4 justify-between align-middle text-align-center text-white"
                        style={{ backgroundColor: headerColor }}>
                    <aside className="absolute flex flex-col -left-2.5 top-0 p-2 gap-0.5">
                        <span className="text-xs text-gray-500 bg-gray-300 border-2 border-gray-400 p-0.5 octogone">
                            {pokemon.previousEvolution.index === 1 ? 'Base' : `STAGE ${pokemon.previousEvolution.index - 1}`}
                        </span>
                        {pokemon.previousEvolution.index !== 1 && (
                            <div className="relative p-0.5 border-2 border-gray-400 bg-gray-300 octogone">
                                <div className="border-2 border-gray-400 octogone">
                                    <img src={pokemon.previousEvolution.image} alt={pokemon.previousEvolution.name} className="w-auto h-8 ml-auto mr-auto" />
                                </div>
                            </div>
                        )}
                    </aside>
                    <p>{pokemon.name}</p>
                    <p className="relative text-white text-lg">
                        <span className="text-xs">HP </span>
                        {pokemon.hp}
                        <img src={`/pokedex/images/pokedex/pokemon/types/${pokemon.type.toLowerCase()}.svg`} alt={pokemon.type} className="w-6 h-6 absolute top-0 -right-5" title={pokemon.type} />
                    </p>
                </header>
            </div>
        </div>
    );
};

PokemonCard.propTypes = {
    pokemon: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        hp: PropTypes.number.isRequired,
        attack: PropTypes.number.isRequired,
        defense: PropTypes.number.isRequired,
        previousEvolution: PropTypes.shape({
            index: PropTypes.number.isRequired,
            image: PropTypes.string,
            name: PropTypes.string,
        }).isRequired,
       /* abilities: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
                pp: PropTypes.number.isRequired,
            })
        ).isRequired,*/
    }).isRequired,
};

export default PokemonCard;