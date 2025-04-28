import React, { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { store } from 'shared/store';
import css from './styles.module.scss';

export function TopContent({ children }: PropsWithChildren) {
	const { topContentElement, setIsTopContent } = store.useApp();

	React.useEffect(() => {
		setIsTopContent(true);
		return () => {
			setIsTopContent(false);
		};
	}, [setIsTopContent]);

	if (!topContentElement) {
		return null;
	}

	return createPortal(<div className={css.topContent}>{children}</div>, topContentElement);
}
