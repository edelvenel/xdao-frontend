import { Form } from 'formik';
import { PropsWithChildren } from 'react';
import { Button } from 'shared/ui/Button';
import css from './styles.module.scss';

interface IProposalCreateProps extends PropsWithChildren {
	disabled: boolean;
	onClick: () => void;
}

export function ProposalCreateLayout({ disabled, children, onClick }: IProposalCreateProps) {
	return (
		<Form className={css.layout} onSubmit={(e) => e.preventDefault()}>
			<div className={css.form}>{children}</div>
			<div className={css.button}>
				<Button type="button" onClick={onClick} disabled={disabled}>
					Create Proposal
				</Button>
			</div>
		</Form>
	);
}
