import WebApp from '@twa-dev/sdk';
import { Route } from 'app/router/routes';
import React from 'react';
import { Icon } from 'shared/icons';
import { store } from 'shared/store';
import { NavigationItem } from './components/navigation-item';
import css from './styles.module.scss';

export const Navigation = React.memo(function Navigation() {
	const paddingBottom = WebApp.safeAreaInset.bottom;

	React.useEffect(() => {
		return () => {
			const { setTopContentElement } = store.useApp.getState();
			setTopContentElement(null);
		};
	}, []);

	return (
		<div id="navigation-block" className={css.navigation} style={{ paddingBottom: `${paddingBottom}px` }}>
			<div
				ref={(element) => {
					const { setTopContentElement } = store.useApp.getState();
					setTopContentElement(element);
				}}
			/>
			<div className={css.menu}>
				<div className={css.wrapper}>
					<NavigationItem to={Route.ProposalList} icon={<Icon.Navigation.Home />} label="Home" />
					<NavigationItem to={Route.DaoList} icon={<Icon.Navigation.DAOs />} label="DAOs" />
					<NavigationItem to={Route.Profile} icon={<Icon.Navigation.Profile />} label="Profile" />
				</div>
			</div>
		</div>
	);
});
