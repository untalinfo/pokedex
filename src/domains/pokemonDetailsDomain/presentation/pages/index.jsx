import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemonDetails } from '../../application/slices/pokemonDetails';
import Spinner from '../../../../shared/presentation/components/Spinner';
import ErrorMessage from '../../../../shared/presentation/components/ErrorMessage';
import './PokemonDetailPage.scss'; // Para estilos

const PokemonDetailPage = () => {
	const { name } = useParams();
	const dispatch = useDispatch();
	const { details, status, error } = useSelector((state) => state.pokemon);

	const pokemon = details[name];

	useEffect(() => {
		if (!pokemon || pokemon.name !== name) {
			// Si no está en cache o es otro pokemon
			dispatch(fetchPokemonDetails(name));
		}
	}, [dispatch, name, pokemon]);

	if (status === 'loading' && !pokemon) return <Spinner />; // Muestra spinner si está cargando Y no hay datos previos
	if (status === 'failed' && !pokemon) return <ErrorMessage message={error} />;
	if (!pokemon) return <p>Pokémon no encontrado o cargando...</p>; // Estado intermedio o si falla la carga pero no es error general

	return (
		<div className="pokemon-detail-page">
			<Link to="/" className="back-button">
				← Volver a la lista
			</Link>
			<h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
			<div className="pokemon-detail-content">
				<div className="pokemon-images">
					<img src={pokemon.sprites.front_default} alt={`${pokemon.name} front`} />
					{pokemon.sprites.back_default && <img src={pokemon.sprites.back_default} alt={`${pokemon.name} back`} />}
					{pokemon.sprites.front_shiny && <img src={pokemon.sprites.front_shiny} alt={`${pokemon.name} shiny front`} />}
					{pokemon.sprites.back_shiny && <img src={pokemon.sprites.back_shiny} alt={`${pokemon.name} shiny back`} />}
				</div>
				<div className="pokemon-info">
					<h2>Información</h2>
					<p>
						<strong>ID:</strong> {pokemon.id}
					</p>
					<p>
						<strong>Altura:</strong> {pokemon.height / 10} m
					</p>
					<p>
						<strong>Peso:</strong> {pokemon.weight / 10} kg
					</p>
					<p>
						<strong>Tipos:</strong>{' '}
						{pokemon.types.map((typeInfo) => (
							<span key={typeInfo.type.name} className={`type-badge type-${typeInfo.type.name}`}>
								{typeInfo.type.name}
							</span>
						))}
					</p>
					<h3>Habilidades:</h3>
					<ul>
						{pokemon.abilities.map((abilityInfo) => (
							<li key={abilityInfo.ability.name}>{abilityInfo.ability.name}</li>
						))}
					</ul>
					<h3>Estadísticas Base:</h3>
					<ul>
						{pokemon.stats.map((statInfo) => (
							<li key={statInfo.stat.name}>
								{statInfo.stat.name}: {statInfo.base_stat}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default PokemonDetailPage;
