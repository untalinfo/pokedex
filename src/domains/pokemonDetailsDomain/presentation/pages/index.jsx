import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemonDetails } from '../../application/slices/pokemonDetails';
import Spinner from '../../../../shared/presentation/components/Spinner';
import ErrorMessage from '../../../../shared/presentation/components/ErrorMessage';
import {
	getpokemonDetailSelector,
	getpokemonDetailsErrorSelector,
	getpokemonDetailStatusSelector,
} from '../../application/selectors/pokemonDetails';
import { ARROW_LEFT_ICON, ARROW_RIGHT_ICON } from '../../../../shared/application/constants/icons';
import './PokemonDetailPage.scss';

const PokemonDetailPage = () => {
	const { name } = useParams();
	const dispatch = useDispatch();
	const details = useSelector(getpokemonDetailSelector);
	const status = useSelector(getpokemonDetailStatusSelector);
	const error = useSelector(getpokemonDetailsErrorSelector);
	const [currentImg, setCurrentImg] = useState(0);

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

	const spriteImages = [
		{ src: pokemon.sprites.front_default, alt: `${pokemon.name} front` },
		{ src: pokemon.sprites.back_default, alt: `${pokemon.name} back` },
		{ src: pokemon.sprites.front_shiny, alt: `${pokemon.name} shiny front` },
		{ src: pokemon.sprites.back_shiny, alt: `${pokemon.name} shiny back` },
	].filter((img) => img.src);

	const handlePrev = () => {
		setCurrentImg((prev) => (prev === 0 ? spriteImages.length - 1 : prev - 1));
	};

	const handleNext = () => {
		setCurrentImg((prev) => (prev === spriteImages.length - 1 ? 0 : prev + 1));
	};

	return (
		<div className="pokemon-detail-page">
			<Link to="/" className="back-button">
				<i className={ARROW_LEFT_ICON} /> Volver a la lista
			</Link>
			<h1 className="pokemon-name">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
			<div className="pokemon-detail-content">
				<div className="pokemon-images-carousel">
					{spriteImages.length > 0 && (
						<div className="carousel">
							<button onClick={handlePrev} className="carousel-btn" aria-label="Anterior">
								{<i className={ARROW_LEFT_ICON} />}
							</button>
							<img src={spriteImages[currentImg].src} alt={spriteImages[currentImg].alt} className="pokemon-img" />
							<button onClick={handleNext} className="carousel-btn" aria-label="Siguiente">
								{<i className={ARROW_RIGHT_ICON} />}
							</button>
						</div>
					)}
				</div>
				<div className="pokemon-info">
					<h2 className="info-subtitle">Información</h2>
					<p className="pokemon-info">
						<strong>ID:</strong> {pokemon.id}
					</p>
					<p className="pokemon-info">
						<strong>Altura:</strong> {pokemon.height / 10} m
					</p>
					<p className="pokemon-info">
						<strong>Peso:</strong> {pokemon.weight / 10} kg
					</p>
					<p className="types-info pokemon-info">
						<strong>Tipos:</strong>{' '}
						{pokemon.types.map((typeInfo) => (
							<span key={typeInfo.type.name} className={`type-badge type-${typeInfo.type.name}`}>
								{typeInfo.type.name}
							</span>
						))}
					</p>
					<h3 className="abilities-subtitle">Habilidades:</h3>
					<section className="abilities-section">
						{pokemon.abilities.map((abilityInfo) => (
							<div key={abilityInfo.ability.name} className="abiliti-item">
								{abilityInfo.ability.name}
							</div>
						))}
					</section>
					<h3 className="stats-subtible">Estadísticas Base:</h3>
					<ul className="stats-list">
						{pokemon.stats.map((statInfo) => (
							<li key={statInfo.stat.name} className="stat-item">
								<div className="stat-info">
									<span className="stat-name">{statInfo.stat.name}</span>
									<span className="stat-value">{statInfo.base_stat}</span>
								</div>

								<div className="stat-bar-container">
									<div className="stat-bar" style={{ width: `${(statInfo.base_stat / 255) * 100}%` }}></div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default PokemonDetailPage;
