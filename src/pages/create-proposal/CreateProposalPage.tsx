import { backButton } from '@telegram-apps/sdk';
import { ProposalTypes } from 'app/mocks/constants';
import cn from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router';
import { useBackButton } from 'shared/hooks/useBackButton';
import { store } from 'shared/store';
import { Modal } from 'shared/ui/Modal';
import { ProposalCreateResult } from './components/ProposalCreateResult';
import { ProposalForm } from './components/ProposalForm';
import css from './styles.module.scss';

export const CreateProposalPage = React.memo(function CreateProposalPage() {
	const [formType, setFormType] = React.useState<number | null>(null);
	const [isSuccess, setIsSuccess] = React.useState<boolean | null>(null);
	const { dao, setDao, proposalType, setProposalType, formData, setFormData } = store.useFormType();

	const { setIsMenuShown, setIsHeaderShown } = store.useApp();
	useBackButton();

	const navigate = useNavigate();
	React.useEffect(() => {
		setIsMenuShown(false);
		setIsHeaderShown(true);
	}, [setIsHeaderShown, setIsMenuShown]);
	if (backButton.mount.isAvailable()) {
		backButton.mount();
		backButton.isMounted(); // true
	}

	const handleOnDone = React.useCallback(() => {
		setDao(null);
		setFormData(null);
		setProposalType(null);
		navigate(-1);
	}, [navigate, setDao, setFormData, setProposalType]);

	React.useEffect(() => {
		if (dao !== null && proposalType !== null) {
			const currentType = ProposalTypes.find((type) => type.id === proposalType.id);
			setFormType(currentType?.id || null);
		} else {
			navigate(-1);
		}
	}, [dao, navigate, proposalType]);

	return (
		<div className={css.page}>
			{formType != null && <ProposalForm data={formData} type={formType} onResponse={setIsSuccess} />}

			<Modal isOpen={isSuccess !== null} onClose={() => navigate(-1)} className={cn(isSuccess && css.success)}>
				<ProposalCreateResult success={isSuccess!} onDone={handleOnDone} onRetry={() => setIsSuccess(null)} />
			</Modal>
		</div>
	);
});
