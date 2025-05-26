import React from 'react';
import './HomePage.scss';
import SearchBar from '../components/SearchBar';
import PokemonList from '../components/PokemonList';
import TypeFilter from '../components/TypeFilter';

const HomePage = () => {
	return (
		<div className="home-page-container">
			<div className="filters-container">
				<SearchBar />
				<TypeFilter />
			</div>
			<PokemonList />
		</div>
	);
};

export default HomePage;
