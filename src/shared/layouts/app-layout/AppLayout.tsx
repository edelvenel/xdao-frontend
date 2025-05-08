type IAppLayoutProps = React.PropsWithChildren;
import { Header } from 'app/header';
import { Navigation } from 'app/navigation';
import React from 'react';
import { store } from 'shared/store';
import BackgroundSvg from '../../svg/backgrounds/BackgroundSvg.svg';
import css from './styles.module.scss';

export function AppLayout({ children }: IAppLayoutProps) {
	const { isMenuShown, isHeaderShown, isBackground, isTopContent } = store.useApp();

	const paddingBottom: number = React.useMemo(
		() => 0 + (isMenuShown ? 80 : 0) + (isTopContent ? 70 : 0),
		[isMenuShown, isTopContent]
	);

	return (
		<div className={css.layout} style={{ paddingBottom }}>
			{isBackground && <div className={css.background} style={{ backgroundImage: `url(${BackgroundSvg})` }} />}
			{isHeaderShown && <Header />}
			{children}
			{isMenuShown && <Navigation />}
		</div>
	);
}
