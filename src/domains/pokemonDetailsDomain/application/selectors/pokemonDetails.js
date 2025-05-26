import { createSelector } from '@reduxjs/toolkit';

export const pokemonDetailState = (state) => state.details;

export const getpokemonDetailSelector = createSelector(pokemonDetailState, (pokemonDetail) => {
	return pokemonDetail?.details;
});

export const getpokemonDetailStatusSelector = createSelector(pokemonDetailState, (pokemonDetail) => {
	return pokemonDetail?.status;
});

export const getpokemonDetailsErrorSelector = createSelector(pokemonDetailState, (pokemonDetail) => {
	return pokemonDetail?.error;
});
