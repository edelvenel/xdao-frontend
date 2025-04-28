import { CreateDAOPage } from 'pages/create-dao';
import { CreateProposalPage } from 'pages/create-proposal';
import { CreateProposalFirstScreen } from 'pages/create-proposal-open';
import { DAOPage } from 'pages/dao';
import { DAOListPage } from 'pages/dao-list';
import { NftPage } from 'pages/nft';
import { ProfilePage } from 'pages/profile';
import { ProposalPage } from 'pages/proposal';
import { ProposalListPage } from 'pages/proposal-list';
import { NotFoundPage } from 'pages/tech/not-found-page';
import { RootPage } from 'pages/tech/root-page';
import React from 'react';
import { Route, Routes } from 'react-router';
import { AppLayout } from 'shared/layouts';
import { routes } from './routes';

const techRoutes = {
	[routes.root]: <RootPage />,
};

const mainRoutes = {
	[routes.proposalList]: { page: <ProposalListPage />, layout: AppLayout },
	[routes.proposal]: { page: <ProposalPage />, layout: AppLayout },
	[routes.createProposalForm]: { page: <CreateProposalPage />, layout: AppLayout },
	[routes.createProposal]: { page: <CreateProposalFirstScreen />, layout: AppLayout },
	[routes.profile]: { page: <ProfilePage />, layout: AppLayout },
	[routes.daoList]: { page: <DAOListPage />, layout: AppLayout },
	[routes.dao]: { page: <DAOPage />, layout: AppLayout },
	[routes.createDao]: { page: <CreateDAOPage />, layout: AppLayout },
	[routes.nft]: { page: <NftPage />, layout: AppLayout },
};

export const AppRouter = React.memo(function AppRouter() {
	return (
		<Routes>
			{Object.entries(mainRoutes).map(([path, route]) => {
				const Layout = route.layout;
				return <Route key={path} path={path} element={<Layout>{route.page}</Layout>} />;
			})}
			{Object.entries(techRoutes).map(([path, page]) => (
				<Route key={path} path={path} element={page} />
			))}
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
});
