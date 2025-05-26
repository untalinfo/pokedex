import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPokemonsRequest } from '../../infrastructure/api';

const initialState = {
	details: {}, // Detalles de Pokémon individuales (cache)
	status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
	error: null,
};

// Thunk para cargar detalles de un Pokémon específico
export const fetchPokemonDetails = createAsyncThunk(
	'details/fetchPokemonDetails',
	async (nameOrId, { rejectWithValue }) => {
		try {
			const response = await getPokemonsRequest(nameOrId);
			return response;
		} catch (error) {
			return rejectWithValue(error.response?.data?.message || error.message);
		}
	},
);

const pokemonDetailsSlice = createSlice({
	name: 'detials',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// Fetch Pokemon Details
			.addCase(fetchPokemonDetails.pending, (state) => {
				state.status = 'loading'; // Podrías tener un status específico para detalles
			})
			.addCase(fetchPokemonDetails.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.details[action.payload.name] = action.payload;
			})
			.addCase(fetchPokemonDetails.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

export default pokemonDetailsSlice.reducer;
