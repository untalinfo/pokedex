import React from 'react';
import { PropTypes } from 'prop-types';
import './AdminLayout.scss';

const AdminLayout = ({ children }) => {
	return (
		<div className="admin-layout">
			<header className="header-container">
				<img src="/public/assets/pokedex.png" alt="" className="img-header" />
				<h2>Pokedex</h2>
			</header>
			<main>{children}</main>
		</div>
	);
};

AdminLayout.propTypes = {
	children: PropTypes.node,
};

export default AdminLayout;
