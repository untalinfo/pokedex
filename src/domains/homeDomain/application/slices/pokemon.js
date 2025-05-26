import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPokemonDetailsRequest, getPokemonsRequest, getPokemonTypeRequest } from '../../infrastructure/api';

const initialState = {
	list: [], // Lista de Pokémon cargados
	details: {}, // Detalles de Pokémon individuales (cache)
	status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
	error: null,
	offset: 0,
	limit: 20,
	hasMore: true, // Si hay más Pokémon para cargar (paginación)
	searchTerm: '',
	selectedType: '', // Tipo seleccionado para filtrar
	isTypeFiltered: false, // Indica si la lista actual es resultado de un filtro por tipo
};

export const getPokemons = createAsyncThunk(
	'pokemons/getPokemons',
	async ({ offset, limit = 20 }, { rejectWithValue }) => {
		try {
			const response = await getPokemonsRequest(offset, limit);
			// Necesitamos obtener la URL de la imagen para cada pokemon
			const pokemonDetailsPromises = response.results.map((p) =>
				getPokemonDetailsRequest(p.url).then((res) => ({
					name: p.name,
					url: p.url,
					id: res.id,
					imageUrl: res.sprites.front_default,
					types: res.types.map((typeInfo) => typeInfo.type.name),
				})),
			);
			const detailedPokemons = await Promise.all(pokemonDetailsPromises);
			return {
				results: detailedPokemons,
				next: response.next, // Para saber si hay más
				currentOffset: offset + limit,
			};
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

// Thunk para cargar Pokémon por tipo
export const fetchPokemonsByType = createAsyncThunk(
	'pokemon/fetchPokemonsByType',
	async (type, { rejectWithValue }) => {
		if (!type) {
			// Si no hay tipo, reseteamos a la carga normal (o podrías cargar todos)
			return { pokemons: [], isTypeFiltered: false };
		}
		try {
			const response = await getPokemonTypeRequest(type);
			const pokemonDetailsPromises = response.pokemon.map((p) =>
				getPokemonDetailsRequest(p.pokemon.url).then((res) => {
					return {
						name: p.pokemon.name,
						url: p.pokemon.url,
						id: res.id,
						imageUrl: res.sprites.front_default,
						types: res.types.map((typeInfo) => typeInfo.type.name),
					};
				}),
			);
			const detailedPokemons = await Promise.all(pokemonDetailsPromises);
			return { pokemons: detailedPokemons, isTypeFiltered: true };
		} catch (error) {
			return rejectWithValue(error.response?.data?.message || error.message);
		}
	},
);

const pokemonSlice = createSlice({
	name: 'pokemon',
	initialState,
	reducers: {
		setSearchTerm: (state, action) => {
			state.searchTerm = action.payload;
		},
		setSelectedType: (state, action) => {
			state.selectedType = action.payload;
			// Al cambiar de tipo, reseteamos la lista y el offset para la carga normal o por tipo
			state.list = [];
			state.offset = 0;
			state.hasMore = true; // Asumimos que hay más hasta que la API diga lo contrario
			state.isTypeFiltered = !!action.payload; // true si hay un tipo, false si es ''
		},
		clearPokemonList: (state) => {
			// Para cuando se cambia de filtro de tipo
			state.list = [];
			state.offset = 0;
			state.hasMore = true;
		},
	},
	extraReducers: (builder) => {
		builder
			// Fetch Pokemons (paginación)
			.addCase(getPokemons.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getPokemons.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.list = [...state.list, ...action.payload.results];
				state.offset = action.payload.currentOffset;
				state.hasMore = !!action.payload.next; // Si 'next' es null, no hay más
				state.isTypeFiltered = false; // Se está usando la paginación normal
			})
			.addCase(getPokemons.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			// Fetch Pokemons by Type
			.addCase(fetchPokemonsByType.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchPokemonsByType.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.list = action.payload.pokemons;
				state.isTypeFiltered = action.payload.isTypeFiltered;
				// Cuando filtramos por tipo, la paginación de "offset/limit" no aplica de la misma manera
				// la API de tipo devuelve todos los pokemons de ese tipo.
				// Podrías implementar una paginación manual si la lista es muy grande.
				state.hasMore = false; // No hay más lotes para este tipo desde ESTE thunk
			})
			.addCase(fetchPokemonsByType.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
		// // Fetch Pokemon Details
		// .addCase(fetchPokemonDetails.pending, (state) => {
		// 	state.status = 'loading'; // Podrías tener un status específico para detalles
		// })
		// .addCase(fetchPokemonDetails.fulfilled, (state, action) => {
		// 	state.status = 'succeeded';
		// 	state.details[action.payload.name] = action.payload;
		// })
		// .addCase(fetchPokemonDetails.rejected, (state, action) => {
		// 	state.status = 'failed';
		// 	state.error = action.payload;
		// });
	},
});

export const { setSearchTerm, setSelectedType, clearPokemonList } = pokemonSlice.actions;
export default pokemonSlice.reducer;
