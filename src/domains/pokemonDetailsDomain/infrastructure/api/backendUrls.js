import { urlBase } from '../../../../shared/infrastructure/api/apiHandler';

export const urlGetPokemonDetails = (nameOrId) => `${urlBase}pokemon/${nameOrId}`;

export default {};
