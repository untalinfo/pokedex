import React, { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemons } from '../../../application/slices/pokemon';
import PokemonCard from '../PokemonCard';
import Spinner from '../../../../../shared/presentation/components/Spinner';
import ErrorMessage from '../../../../../shared/presentation/components/ErrorMessage';
import './PokemonList.scss';

const PokemonList = () => {
	const dispatch = useDispatch();
	const {
		list: pokemons,
		status,
		error,
		offset,
		limit,
		hasMore,
		searchTerm,
		selectedType, // Usaremos esto para saber si estamos filtrando
		isTypeFiltered,
	} = useSelector((state) => state.pokemon);

	const observer = useRef();

	// Callback para el Intersection Observer
	const lastPokemonElementRef = useCallback(
		(node) => {
			if (status === 'loading' || isTypeFiltered || !hasMore) return; // No cargar si está cargando, filtrado por tipo (ya se cargaron todos de ese tipo), o no hay más
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					dispatch(getPokemons({ offset, limit }));
				}
			});
			if (node) observer.current.observe(node);
		},
		[status, dispatch, offset, limit, hasMore, isTypeFiltered],
	);

	// Carga inicial si la lista está vacía y no se está filtrando por tipo
	useEffect(() => {
		if (status === 'idle' && pokemons.length === 0 && !selectedType) {
			dispatch(getPokemons({ offset: 0, limit }));
		}
	}, [status, dispatch, pokemons.length, limit, selectedType]);

	// Filtrar Pokémon por término de búsqueda y tipo (si los datos ya están cargados)
	// El filtrado por tipo ya se maneja al traer los datos con fetchPokemonsByType
	// Así que aquí solo filtramos por nombre la lista actual
	const filteredPokemons = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));

	if (status === 'failed') return <ErrorMessage message={error} />;

	return (
		<div className="pokemon-list-container">
			{filteredPokemons.length === 0 && status === 'succeeded' && (
				<p>No se encontraron Pokémon con los filtros actuales.</p>
			)}
			<div className="pokemon-list">
				{filteredPokemons.map((pokemon, index) => {
					if (filteredPokemons.length === index + 1 && !isTypeFiltered && hasMore) {
						// Si es el último elemento y no estamos filtrando por tipo y hay más por cargar
						return (
							<div ref={lastPokemonElementRef} key={pokemon.name}>
								<PokemonCard pokemon={pokemon} />
							</div>
						);
					}
					return <PokemonCard key={pokemon.name} pokemon={pokemon} />;
				})}
			</div>
			{status === 'loading' && <Spinner />}
		</div>
	);
};

export default PokemonList;
