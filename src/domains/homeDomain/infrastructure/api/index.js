import { urlGetPokemons, urlGetPokemonsTypes, urlGetPokemonType } from './backendUrls';

export const getPokemonsRequest = (offset, limit) => {
	const requestOptions = {
		method: 'GET',
	};
	return fetch(urlGetPokemons(offset, limit), requestOptions).then((res) => res.json());
};

export const getPokemonsTypesRequest = () => {
	const requestOptions = {
		method: 'GET',
	};
	return fetch(urlGetPokemonsTypes(), requestOptions).then((res) => res.json());
};

export const getPokemonDetailsRequest = (url) => {
	const requestOptions = {
		method: 'GET',
	};
	return fetch(url, requestOptions).then((res) => res.json());
};

export const getPokemonTypeRequest = (type) => {
	const requestOptions = {
		method: 'GET',
	};
	return fetch(urlGetPokemonType(type), requestOptions).then((res) => res.json());
};

export default { getPokemonsRequest };
