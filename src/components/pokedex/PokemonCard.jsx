import PropTypes from 'prop-types';

const PokemonCard = ({ pokemon }) => {


    if (!pokemon) return null;

    return (
        <div className="relative border-2 border-gray-300 rounded-lg p-1 w-72 h-96 bg-gray-300 shadow-lg">
            <div className="octogone bg-black p-1 w-full h-full">
                <div className="octogone h-full w-full bg-gray-300">
                    <header className="w-full h-10 flex items-center justify-center" style={{ backgroundColor: `var(--${pokemon.types[0].toLowerCase()})` }}>
                        <div className="flex flex-row text-white justify-between items-center gap-2">
                            <span>{pokemon.name}</span>
                            <div className="relative flex flex-row text-white text-lg">
                                <div className="flex flex-row font-bold">
                                    <span className="text-xs self-end">HP </span>
                                    {pokemon.hp}
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="relative h-[90%] p-0 m-0">
                        <section className="absolute top-1 right-1 flex flex-col items-center justify-center gap-1">
                            {pokemon.types.map((type) => (
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
                        <div className="absolute flex flex-col left-0.5 top-0.5 gap-0.5">
                            <div className="relative p-0.5 bg-gray-400 octogone">
                                <div className="bg-gray-300 octogone">
                                    <span className="text-xs p-1 text-gray-500">
                                        {pokemon.previousEvolution.index === 1 ? 'Base' : `STAGE ${pokemon.previousEvolution.index - 1}`}
                                    </span>
                                </div>
                            </div>
                            {pokemon.previousEvolution.index !== 1 && (
                                <div className="relative p-0.5 bg-gray-400 octogone">
                                    <div className="bg-gray-300 octogone">
                                        <img
                                            src={pokemon.previousEvolution.image}
                                            alt={pokemon.previousEvolution.name}
                                            className="w-auto h-8 ml-auto mr-auto"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full">
                            <img src={pokemon.image} alt={pokemon.name} className="w-[80%] h-[80%] ml-auto mr-auto" />
                        </div>
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