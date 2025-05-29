import { TopContent } from 'app/navigation/components/top-content';
import { Form } from 'formik';
import { PropsWithChildren } from 'react';
import { Button } from 'shared/ui/Button';
import css from './styles.module.scss';

interface IProposalCreateProps extends PropsWithChildren {
	onSubmit: () => void;
	onBack: () => void;
}

export function ProposalCreateLayout({ children, onBack, onSubmit }: IProposalCreateProps) {
	return (
		<Form className={css.layout} onSubmit={(e) => e.preventDefault()}>
			<div className={css.form}>{children}</div>

			<TopContent>
				<div className={css.actions}>
					<Button variant="secondary" onClick={onBack}>
						Back
					</Button>
					<Button variant="primary" onClick={onSubmit}>
						Create
					</Button>
				</div>
			</TopContent>
		</Form>
	);
}
