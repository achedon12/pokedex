import { useState } from 'react';
import PropTypes from 'prop-types';

const Card = ({ pokemon, onShow}) => {

  const [isShiny, setIsShiny] = useState(false);
  const [currentEvolution, setCurrentEvolution] = useState({
      name: pokemon.name,
      image: pokemon.image,
      shinyImage: pokemon.shinyImage,
      types: pokemon.types,
      stats: pokemon.stats,
      weight: pokemon.weight,
      height: pokemon.height,
      cries: pokemon.cries,
      abilities: pokemon.abilities,
  });

  const handleEvolutionChange = (evolution) => {
    setCurrentEvolution({
      name: evolution.name,
      image: evolution.image,
      shinyImage: evolution.shinyImage,
      types: evolution.types,
      stats: evolution.stats,
      abilities: evolution.abilities,
      weight: pokemon.weight,
      height: pokemon.height,
      cries: pokemon.cries,
    });
  };

  if (!pokemon) return null;

  return (
    <div className="relative border-2 border-gray-300 rounded-lg p-4 text-center w-64">
      <button
        className={`absolute top-1 left-1 bg-${isShiny ? 'yellow-500' : 'red-500'} text-white px-4 py-2 rounded-full transition-all transform hover:scale-105 shadow-lg`}
        onClick={() => setIsShiny(!isShiny)}
      >
        {isShiny ? '🌟' : '⭐'}
      </button>
      <img
        src={isShiny ? currentEvolution.shinyImage : currentEvolution.image}
        alt={currentEvolution.name}
        className="w-[100%] h-auto"
      />
      <p className="text-xl m-1 uppercase">{currentEvolution.name}</p>
      <section className="absolute top-1 right-1 flex flex-col items-center justify-center gap-1">
        {currentEvolution.types.map((type) => (
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
        <ul className="flex justify-center space-x-2 m-2">
        {pokemon.evolutions.map((evolution) => (
          <li
            key={evolution.name}
            onClick={() => handleEvolutionChange(evolution)}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              currentEvolution.name === evolution.name ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          ></li>
        ))}
      </ul>
      <button
        className="m-2"
        onClick={() => {
            // evolution number
            const previousEvolution = pokemon.evolutions.find(evolution => evolution.name === currentEvolution.name);
            currentEvolution.previousEvolution = {
                index: pokemon.evolutions.indexOf(previousEvolution) + 1,
                image: pokemon.evolutions[pokemon.evolutions.indexOf(previousEvolution) - 1]?.image,
                name: pokemon.evolutions[pokemon.evolutions.indexOf(previousEvolution) - 1]?.name,
            };
            onShow(currentEvolution);
        }}
      >
        Learn More
      </button>
    </div>
  );
}

Card.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    shinyImage: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    stats: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })),
    weight: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    cries: PropTypes.shape({
      latest: PropTypes.string.isRequired,
      legacy: PropTypes.string.isRequired,
    }).isRequired,
    abilities: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      effect: PropTypes.string,
    })).isRequired,
    evolutions: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      shinyImage: PropTypes.string.isRequired,
      types: PropTypes.arrayOf(PropTypes.string).isRequired,
      stats: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
      })).isRequired
    })).isRequired
  }),
  onShow: PropTypes.func,
};

export default Card;