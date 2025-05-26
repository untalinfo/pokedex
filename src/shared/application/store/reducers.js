import { combineReducers } from 'redux';
import example, { initialState as exampleInitial } from '../../../domains/exampleDomain/application/slices/example';
import pokemon from '../../../domains/homeDomain/application/slices/pokemon';
import types from '../../../domains/homeDomain/application/slices/types';
import details from '../../../domains/pokemonDetailsDomain/application/slices/pokemonDetails';

export const initialStates = {
	example: exampleInitial,
};

export default combineReducers({
	example,
	pokemon,
	types,
	details,
});
