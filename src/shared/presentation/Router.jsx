import React from 'react';
import { Switch } from 'react-router-dom';
import { importFiles } from '../application/helpers/common-functions';

const importRouter = import.meta.glob('../../domains/**/infrastructure/routing/router.*');
const routerDomain = await importFiles(importRouter);
const routes = routerDomain.map((route) => route.default);

const Router = () => {
	const defaultLayout = ({ children }) => <>{children}</>;

	return (
		<Switch>
			{routes.map((router) => {
				return router.router.map(({ path, page: Component, routeComponent: Route, exact = true, layout, ...rest }) => (
					<Route
						key={path}
						exact={exact}
						path={path}
						component={Component}
						layout={layout || router.layout || defaultLayout}
						{...rest}
					/>
				));
			})}
		</Switch>
	);
};

export default Router;
