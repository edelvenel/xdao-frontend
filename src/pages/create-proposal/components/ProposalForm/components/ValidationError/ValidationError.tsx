import { PropsWithChildren } from 'react';
import { Icon } from 'shared/icons';
import css from './styles.module.scss';

export function ValidationError({ children }: PropsWithChildren) {
	if (children === null) {
		return null;
	}

	return (
		<div className={css.validationError}>
			<Icon.Common.ValidationError />
			{children}
		</div>
	);
}
