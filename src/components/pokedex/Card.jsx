import { useState } from 'react';
import PropTypes from 'prop-types';

const Card = ({ pokemon, onShow}) => {

  const [isShiny, setIsShiny] = useState(false);
  const [currentEvolution, setCurrentEvolution] = useState({
      name: pokemon.name,
      image: pokemon.image,
      shinyImage: pokemon.shinyImage,
      type: pokemon.type,
      hp: pokemon.hp,
      attack: pokemon.attack,
      defense: pokemon.defense,
      //abilities: pokemon.abilities,
  });

  const handleEvolutionChange = (evolution) => {
    setCurrentEvolution({
      name: evolution.name,
      image: evolution.image,
      shinyImage: evolution.shinyImage,
      type: evolution.type,
      hp: evolution.hp,
      attack: evolution.attack,
      defense: evolution.defense,
      //abilities: evolution.abilities,
    });
  };

  if (!pokemon) return null;

  return (
    <div className="relative border-2 border-gray-300 rounded-lg p-4 text-center w-64">
      <button
        className={`absolute top-2 right-2 bg-${isShiny ? 'yellow-500' : 'red-500'} text-white px-4 py-2 rounded-full transition-all transform hover:scale-105 shadow-lg`}
        onClick={() => setIsShiny(!isShiny)}
      >
        {isShiny ? '🌟' : '⭐'}
      </button>
      <img
        src={isShiny ? currentEvolution.shinyImage : currentEvolution.image}
        alt={currentEvolution.name}
        className="w-[100%] h-auto"
      />
      <h2 className="text-2xl m-1">{currentEvolution.name}</h2>
      <div
        className="pokemon-type w-6 h-6"
        style={{ boxShadow: `0 0 20px var(--${currentEvolution.type.toLowerCase()})` }}
        >
        <img
            src={`/pokedex/images/pokedex/pokemon/types/${pokemon.type.toLowerCase()}.svg`}
            alt={pokemon.type}
            className={`bg-${pokemon.type.toLowerCase()} rounded-full`}
            title={pokemon.type}
        />
      </div>
      {/*<img src={`/pokedex/images/pokedex/pokemon/types/${currentEvolution.type.toLowerCase()}.svg`} alt={currentEvolution.type} className="w-6 h-6 ml-auto mr-auto" title={currentEvolution.type} />*/}
      <section className="flex flex-row justify-center space-x-2 m-2">
        <article className="flex flex-col">
          <img src={`/pokedex/images/pokedex/pokemon/heart.svg`} alt="HP" className="w-6 h-6 ml-auto mr-auto" title="HP" />
          <p className="text-lg">{currentEvolution.hp}</p>
        </article>
        <article className="flex flex-col">
          <img src={`/pokedex/images/pokedex/pokemon/attack.svg`} alt="Attack" className="w-6 h-6 ml-auto mr-auto" title="Attack" />
          <p className="text-lg">{currentEvolution.attack}</p>
        </article>
        <article className="flex flex-col">
          <img src={`/pokedex/images/pokedex/pokemon/defense.svg`} alt="Defense" className="w-6 h-6 ml-auto mr-auto" title="Defense" />
          <p className="text-lg">{currentEvolution.defense}</p>
        </article>
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
    type: PropTypes.string.isRequired,
    hp: PropTypes.number.isRequired,
    attack: PropTypes.number.isRequired,
    defense: PropTypes.number.isRequired,
    evolutions: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      shinyImage: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      hp: PropTypes.number.isRequired,
      attack: PropTypes.number.isRequired,
      defense: PropTypes.number.isRequired,
      /*abilities: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        pp: PropTypes.number.isRequired,
      })).isRequired,*/
    })).isRequired,
    /*abilities: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      pp: PropTypes.number.isRequired
    })).isRequired,*/
  }),
  onShow: PropTypes.func,
};

export default Card;