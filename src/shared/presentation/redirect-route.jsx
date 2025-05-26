import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Proptypes from 'prop-types';

import { homeRoute } from '../infrastructure/routing/routes';
import { exampleRoute } from '../../domains/exampleDomain/infrastructure/routing/routes';

export const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				localStorage.getItem('user') ? (
					<Layout path={rest.path}>
						<Component {...props} />
					</Layout>
				) : (
					<Redirect to={{ pathname: exampleRoute, state: { from: props.location } }} />
				)
			}
		/>
	);
};

PrivateRoute.propTypes = {
	component: Proptypes.elementType.isRequired,
	location: Proptypes.object,
	layout: Proptypes.elementType.isRequired,
};

export const UnauthenticatedRoute = ({ component: C, layout: Layout, ...rest }) => {
	const prevPath = typeof window !== 'undefined' && localStorage.getItem('prevPath');
	return (
		<Route
			{...rest}
			render={(props) =>
				typeof window !== 'undefined' && !localStorage.getItem('user') ? (
					<Layout path={rest.path}>
						<C {...props} />
					</Layout>
				) : (
					<Redirect to={prevPath || homeRoute} />
				)
			}
		/>
	);
};

UnauthenticatedRoute.propTypes = {
	component: Proptypes.elementType.isRequired,
	layout: Proptypes.elementType.isRequired,
};
