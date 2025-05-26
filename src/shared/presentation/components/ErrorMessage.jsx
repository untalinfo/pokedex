import PropTypes from 'prop-types';
import React from 'react';

const ErrorMessage = ({ message }) => {
	return <div className="error-message">Error: {message}</div>;
};

ErrorMessage.propTypes = {
	message: PropTypes.object.isRequired,
};

export default ErrorMessage;
