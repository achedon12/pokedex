import { useState } from 'react';
import PropTypes from 'prop-types';
import '../../assets/card.css';

const Card = ({ name, image, shinyImage, type, hp, attack, defense, evolutions }) => {
  const [isShiny, setIsShiny] = useState(false);
  const [currentEvolution, setCurrentEvolution] = useState({ name, image, shinyImage, type, hp, attack, defense });

  const handleEvolutionChange = (evolution) => {
    setCurrentEvolution({
      name: evolution.name,
      image: evolution.image,
      shinyImage: evolution.shinyImage,
      type: evolution.type,
      hp: evolution.hp,
      attack: evolution.attack,
      defense: evolution.defense,
    });
    console.log(evolution);
  };

  return (
    <div className="card">
      <img src={isShiny ? currentEvolution.shinyImage : currentEvolution.image} alt={currentEvolution.name} className="card-image" />
      <h2 className="card-name">{currentEvolution.name}</h2>
      <p className="card-type">Type: {currentEvolution.type}</p>
      <p className="card-hp">HP: {currentEvolution.hp}</p>
      <p className="card-attack">Attack: {currentEvolution.attack}</p>
      <p className="card-defense">Defense: {currentEvolution.defense}</p>
      <button className="shiny-toggle" onClick={() => setIsShiny(!isShiny)}>
        {isShiny ? '🌟' : '⭐'}
      </button>
      <ul className="flex justify-center space-x-2">
        {evolutions.map(evolution => (
          <li key={evolution.name}
              onClick={() => handleEvolutionChange(evolution)}
              className={`w-2 h-2 rounded-full cursor-pointer ${currentEvolution.name === evolution.name ? 'bg-blue-500' : 'bg-gray-300'}`}>
          </li>
        ))}
      </ul>
    </div>
  );
}

Card.propTypes = {
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
  })).isRequired,
};

export default Card;