import PropTypes from 'prop-types';
import {useEffect, useState} from "react";

const PokemonCard = ({ pokemon }) => {

    const [thePokemon, setThePokemon] = useState(pokemon);

    useEffect(() => {
        setThePokemon(pokemon);
    }, [pokemon]);

    if (!thePokemon) return null;

    return (
        <div className="relative border-2 border-gray-300 rounded-lg p-1 w-72 min-h-96 bg-gray-300 shadow-lg">
            <div className="octogone bg-black p-1 w-full min-h-96">
                <div className="octogone min-h-96 w-full bg-gray-300">
                    <header className="w-full h-10 flex items-center justify-center" style={{ backgroundColor: `var(--${thePokemon.types[0].toLowerCase()})` }}>
                        <p className="text-white uppercase text-lg">{thePokemon.name}</p>
                    </header>
                    <div className="relative min-h-96 h-[90%] p-0 m-0" style={{ backgroundImage: `url(${thePokemon.image})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center top', backgroundSize: '70%' }}>
                        <div className="absolute flex flex-col left-0.5 top-0.5 gap-0.5">
                            <div className="relative p-0.5 bg-gray-400 octogone">
                                <div className="bg-gray-300 octogone">
                                    <span className="text-xs p-1 text-gray-500">
                                        {thePokemon.previousEvolution.index === 1 ? 'Base' : `STAGE ${thePokemon.previousEvolution.index - 1}`}
                                    </span>
                                </div>
                            </div>
                            {thePokemon.previousEvolution.index !== 1 && (
                                <div className="relative p-0.5 bg-gray-400 octogone">
                                    <div className="bg-gray-300 octogone">
                                        <img
                                            src={thePokemon.previousEvolution.image}
                                            alt={thePokemon.previousEvolution.name}
                                            className="w-auto h-8 ml-auto mr-auto"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* pokemon types */}
                        <section className="absolute top-1 right-1 flex flex-col items-center justify-center gap-1">
                            {thePokemon.types.map((type) => (
                                <article
                                    key={type}
                                    className="pokemon-type w-6 h-6 rounded-full"
                                    style={{ boxShadow: `0 0 20px var(--${type.toLowerCase()})` }}
                                >
                                    <img
                                        src={`/pokedex/images/pokedex/pokemon/types/${type.toLowerCase()}.svg`}
                                        alt={type}
                                        className="rounded-full p-1"
                                        title={type}
                                        style={{ backgroundColor: `var(--${type.toLowerCase()})` }}
                                    />
                                </article>
                            ))}
                        </section>

                        <section className="absolute border-t-2 border-gray-400 h-1/2 bottom-0 w-full gap-1 p-1">

                            {/* pokemon stats */}
                            <ul className="grid grid-cols-3 flex-wrap items-center justify-center gap-0.5">
                                {thePokemon.stats.map((stat, index) => (
                                    <li key={index} className="flex flex-row justify-center items-center gap-1 text-xs p-1 font-bold uppercase bg-gray-400 rounded-full">
                                        <span className="flex items-center justify-center rounded-full w-8 h-5" style={{ backgroundColor: stat.color }}>{stat.name}</span>
                                        <span className="text-black">{stat.value}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* pokemon infos*/}
                            <article className="grid grid-cols-2 w-1/2 ml-auto mr-auto">
                                <div className="flex flex-col items-center justify-center">
                                    <h4 className="text-xs p-1 uppercase font-bold">Weight</h4>
                                    <span className="text-xs p-1 text-black bg-gray-400 rounded-lg">{thePokemon.weight}Kg</span>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <h4 className="text-xs p-1 uppercase font-bold">Height</h4>
                                    <span className="text-xs p-1 text-black bg-gray-400 rounded-lg">{thePokemon.height}m</span>
                                </div>
                            </article>

                            {/* pokemon cries sound */}
                            {/*<article className="flex flex-col items-center justify-center gap-1">
                                <h4 className="text-xs p-1 uppercase">Cries</h4>
                                <audio
                                    src={thePokemon.cries.latest}
                                    controls
                                    className="w-1/2"
                                />
                                <audio
                                    src={thePokemon.cries.legacy}
                                    controls
                                    className="w-1/2"
                                />
                            </article>*/}

                            {/* pokemon abilities */}
                            <article className="flex flex-col items-center justify-center gap-1">
                                <h4 className="text-xs p-1 uppercase font-bold">Abilities</h4>
                                <ul className="flex flex-wrap flex-row items-center justify-center gap-1">
                                    {thePokemon.abilities.map((ability, index) => (
                                        <li key={index} className="text-xs p-1 text-black bg-gray-400 rounded-lg">{ability.name}</li>
                                    ))}
                                </ul>
                            </article>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    stats: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })).isRequired,
    previousEvolution: PropTypes.shape({
      index: PropTypes.number.isRequired,
      image: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
    abilities: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      effect: PropTypes.string,
    })).isRequired,
    weight: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    cries: PropTypes.shape({
      latest: PropTypes.string.isRequired,
      legacy: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PokemonCard;