import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedType, fetchPokemonsByType, getPokemons } from '../../../application/slices/pokemon';
import { fetchTypes } from '../../../application/slices/types';
import './TypeFilter.scss';

const TypeFilter = () => {
	const dispatch = useDispatch();
	const { list: types, status: typesStatus } = useSelector((state) => state.types);
	const selectedType = useSelector((state) => state.pokemon.selectedType);
	const { limit } = useSelector((state) => state.pokemon);

	useEffect(() => {
		if (typesStatus === 'idle') {
			dispatch(fetchTypes());
		}
	}, [typesStatus, dispatch]);

	const handleChange = (e) => {
		const newType = e.target.value;
		dispatch(setSelectedType(newType)); // Esto ya resetea la lista en el slice
		if (newType) {
			dispatch(fetchPokemonsByType(newType));
		} else {
			// Si se selecciona "Todos", cargar la primera página de Pokémon
			dispatch(getPokemons({ offset: 0, limit }));
		}
	};

	if (typesStatus === 'loading') return <p>Cargando tipos...</p>;

	return (
		<select onChange={handleChange} value={selectedType} className="type-filter-pokemon">
			<option value="">Todos los tipos</option>
			{types.map((type) => (
				<option key={type.name} value={type.name}>
					{type.name.charAt(0).toUpperCase() + type.name.slice(1)}
				</option>
			))}
		</select>
	);
};

export default TypeFilter;
