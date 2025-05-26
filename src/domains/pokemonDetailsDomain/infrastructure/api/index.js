import { urlGetPokemonDetails } from './backendUrls';

export const getPokemonsRequest = (nameOrId) => {
	const requestOptions = {
		method: 'GET',
	};
	return fetch(urlGetPokemonDetails(nameOrId), requestOptions).then((res) => res.json());
};

export default {};
