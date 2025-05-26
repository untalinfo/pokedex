import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPokemonsTypesRequest } from '../../infrastructure/api';

export const fetchTypes = createAsyncThunk('types/fetchTypes', async (_, { rejectWithValue }) => {
	try {
		const response = await getPokemonsTypesRequest();
		// Filtramos tipos que a veces no tienen pokémon o son especiales
		const relevantTypes = response.results.filter((type) => type.name !== 'unknown' && type.name !== 'shadow');
		return relevantTypes;
	} catch (error) {
		return rejectWithValue(error.response?.data?.message || error.message);
	}
});

const initialState = {
	list: [],
	status: 'idle',
	error: null,
};

const typesSlice = createSlice({
	name: 'types',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTypes.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchTypes.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.list = action.payload;
			})
			.addCase(fetchTypes.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

export default typesSlice.reducer;
