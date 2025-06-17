type IAppLayoutProps = React.PropsWithChildren;
import { Header } from 'app/header';
import { Navigation } from 'app/navigation';
import cn from 'classnames';
import React from 'react';
import { useLocation } from 'react-router';
import { store } from 'shared/store';
import { AnimationPage } from './AnimationPage';
import css from './styles.module.scss';

export function AppLayout({ children }: IAppLayoutProps) {
	const { pathname } = useLocation();

	const { isMenuShown, isHeaderShown, isBackground, isTopContent } = store.useApp();

	const paddingBottom: number = React.useMemo(
		() => 0 + (isMenuShown ? 70 : 0) + (isTopContent ? 70 : 0),
		[isMenuShown, isTopContent]
	);

	return (
		<div className={cn(css.layout, isBackground && css.background)}>
			{isHeaderShown && <Header />}
			<div className={css.children} style={{ paddingBottom }}>
				<AnimationPage animationKey={pathname}>{children}</AnimationPage>
			</div>
			{isMenuShown && <Navigation />}
		</div>
	);
}
