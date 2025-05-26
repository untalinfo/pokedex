import { createSelector } from '@reduxjs/toolkit';

export const pokemonDetailState = (state) => state.pokemon;

export const getpokemonDetailslector = createSelector(pokemonDetailState, (pokemonDetail) => {
	return pokemonDetail?.details;
});
