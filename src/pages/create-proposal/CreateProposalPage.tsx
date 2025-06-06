import { backButton } from '@telegram-apps/sdk';
import React from 'react';
import { useNavigate } from 'react-router';
import { useBackButton } from 'shared/hooks/useBackButton';
import { store } from 'shared/store';
import { ProposalType } from 'shared/types';
import { Modal } from 'shared/ui/Modal';
import { ProposalCreateResult } from './components/ProposalCreateResult';
import { ProposalForm } from './components/ProposalForm';
import css from './styles.module.scss';

export const CreateProposalPage = React.memo(function CreateProposalPage() {
	const [formType, setFormType] = React.useState<ProposalType | null>(null);
	const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
	const [isResultOpen, setIsResultOpen] = React.useState<boolean>(false);
	const { dao, setDao, proposalType, setProposalType } = store.useFormType();

	const { setIsMenuShown, setIsHeaderShown } = store.useApp();
	useBackButton();

	const navigate = useNavigate();
	React.useEffect(() => {
		setIsMenuShown(true);
		setIsHeaderShown(true);
	}, [setIsHeaderShown, setIsMenuShown]);
	if (backButton.mount.isAvailable()) {
		backButton.mount();
		backButton.isMounted(); // true
	}

	const handleOnDone = React.useCallback(() => {
		setDao(null);
		setProposalType(null);
		navigate(-1);
	}, [navigate, setDao, setProposalType]);

	React.useEffect(() => {
		if (dao !== null && proposalType !== null) {
			setFormType(proposalType);
		} else {
			// FIXME: broke transaction sending
			navigate(-1);
		}
	}, [dao, navigate, proposalType]);

	return (
		<div className={css.page}>
			{formType != null && (
				<ProposalForm
					type={formType}
					onResponse={(value) => {
						setIsSuccess(value);
						setIsResultOpen(true);
					}}
				/>
			)}

			<Modal isBackgroundOn={isSuccess} isOpen={isResultOpen} onClose={() => navigate(-1)}>
				<ProposalCreateResult success={isSuccess} onDone={handleOnDone} onRetry={() => setIsResultOpen(false)} />
			</Modal>
		</div>
	);
});
