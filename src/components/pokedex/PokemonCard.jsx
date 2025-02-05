import PropTypes from 'prop-types';

const PokemonCard = ({ pokemon }) => {
    if (!pokemon) return null;

    return (
        <div className="relative border-2 border-gray-300 rounded-lg p-1 w-72 bg-gray-300 shadow-lg">
            <div className="relative border-2 border-gray-900 bg-gray-900 h-96 pokemon-card">

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
        evolutions: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                image: PropTypes.string.isRequired,
            })
        ).isRequired,
        abilities: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
                pp: PropTypes.number.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default PokemonCard;
