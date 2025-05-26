import React from 'react';
import { Link } from 'react-router-dom';
import './PokemonCard.scss';
import PropTypes from 'prop-types';

const PokemonCard = ({ pokemon }) => {
	if (!pokemon) return null;

	return (
		<div className="pokemon-card">
			<Link to={`/pokemon/${pokemon.name}`} className="pokemon-link">
				<div className="container-img">
					<img
						src={
							pokemon.imageUrl || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
						}
						alt={pokemon.name}
					/>
				</div>

				<h3 className="pokemon-name">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
				{/* {pokemon.types && (
					<div className="pokemon-types">
						{pokemon.types.map((type) => (
							<span key={type} className={`type-badge type-${type}`}>
								{type}
							</span>
						))}
					</div>
				)} */}
			</Link>
		</div>
	);
};

PokemonCard.propTypes = {
	pokemon: PropTypes.shape({
		name: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		imageUrl: PropTypes.string,
		types: PropTypes.arrayOf(PropTypes.string),
	}),
};

export default PokemonCard;
