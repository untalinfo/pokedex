import AdminLayout from '../../../../shared/presentation/layouts/AdminLayout';
import { homeRoute } from '../../../../shared/infrastructure/routing/routes';
import HomePage from '../../presentation/pages';
import { UnauthenticatedRoute } from '../../../../shared/presentation/redirect-route';

const exampleRouter = {
	layout: AdminLayout,
	router: [
		{
			path: homeRoute,
			page: HomePage,
			routeComponent: UnauthenticatedRoute,
		},
	],
};

export default exampleRouter;
