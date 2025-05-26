import { urlBase } from '../../../../shared/infrastructure/api/apiHandler';

export const urlGetPokemons = (offset, limit) => `${urlBase}pokemon?offset=${offset}&limit=${limit}`;
export const urlGetPokemonsTypes = () => `${urlBase}type`;
export const urlGetPokemonType = (type) => `${urlBase}type/${type}`;

export default {};
