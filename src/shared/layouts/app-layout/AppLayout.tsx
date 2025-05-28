type IAppLayoutProps = React.PropsWithChildren;
import { Header } from 'app/header';
import { Navigation } from 'app/navigation';
import cn from 'classnames';
import React from 'react';
import { store } from 'shared/store';
import css from './styles.module.scss';
import { AnimationPage } from './AnimationPage';
import { useLocation } from 'react-router';

export function AppLayout({ children }: IAppLayoutProps) {
	const { pathname } = useLocation();

	const { isMenuShown, isHeaderShown, isBackground, isTopContent } = store.useApp();

	const paddingBottom: number = React.useMemo(
		() => 0 + (isMenuShown ? 70 : 0) + (isTopContent ? 70 : 0),
		[isMenuShown, isTopContent]
	);

	return (
		<AnimationPage animationKey={pathname}>
            <div className={cn(css.layout, isBackground && css.background)}>
                {isHeaderShown && <Header />}
                <div className={css.children} style={{ paddingBottom }}>
                    {children}
                </div>
                {isMenuShown && <Navigation />}
            </div>
		</AnimationPage>
	);
}
