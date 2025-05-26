import { createSelector } from '@reduxjs/toolkit';

export const pokemonState = (state) => state.pokemon;

export const getsearchTermSelector = createSelector(pokemonState, (pokemon) => {
	return pokemon?.searchTerm;
});
