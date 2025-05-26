import React from 'react';
import { PropTypes } from 'prop-types';
import './AdminLayout.scss';

const AdminLayout = ({ children }) => {
	return <div>{children}</div>;
};

AdminLayout.propTypes = {
	children: PropTypes.node,
};

export default AdminLayout;
