import AdminLayout from '../../../../shared/presentation/layouts/AdminLayout';
import { UnauthenticatedRoute } from '../../../../shared/presentation/redirect-route';
import PokemonDetailPage from '../../presentation/pages';
import { pokemonDetailsRoute } from './routes';

const pokemonDetailsRouter = {
	layout: AdminLayout,
	router: [
		{
			path: pokemonDetailsRoute(),
			page: PokemonDetailPage,
			routeComponent: UnauthenticatedRoute,
		},
	],
};

export default pokemonDetailsRouter;
