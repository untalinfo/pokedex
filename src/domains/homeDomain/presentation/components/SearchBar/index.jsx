import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../../application/slices/pokemon'; // Adjust the import path as necessary
import { SEARCH_ICON } from '../../../../../shared/application/constants/icons';
import './SearchBar.scss';
import { getsearchTermSelector } from '../../../application/selectors/pokemon';

const SearchBar = () => {
	const dispatch = useDispatch();
	const searchTerm = useSelector(getsearchTermSelector);

	const handleChange = (e) => {
		dispatch(setSearchTerm(e.target.value));
	};

	return (
		<div className="search-container">
			<i className={SEARCH_ICON} />
			<input
				type="text"
				placeholder="Buscar Pokémon por nombre..."
				value={searchTerm}
				onChange={handleChange}
				className="search-bar"
			/>
		</div>
	);
};

export default SearchBar;
