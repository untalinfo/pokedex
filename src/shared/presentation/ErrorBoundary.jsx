/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { history } from '../application/helpers/history';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
		history.listen(() => {
			this.setState({ hasError: false });
		});
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console.error('*Error*');
		console.error(error, errorInfo);
	}

	render500() {
		return (
			<div>
				{/* <Error500 /> */}
				ERROR SERVER
			</div>
		);
	}

	render() {
		if (this.state.hasError) {
			return this.render500();
		}

		// eslint-disable-next-line react/prop-types
		return this.props.children;
	}
}

export default ErrorBoundary;
