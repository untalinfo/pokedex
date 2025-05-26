import { combineReducers } from 'redux';
import pokemon from '../../../domains/homeDomain/application/slices/pokemon';
import types from '../../../domains/homeDomain/application/slices/types';
import details from '../../../domains/pokemonDetailsDomain/application/slices/pokemonDetails';

export default combineReducers({
	pokemon,
	types,
	details,
});
