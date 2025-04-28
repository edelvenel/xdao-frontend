import { backButton } from '@telegram-apps/sdk';
import { routes } from 'app/router/routes';
import React from 'react';
import { useNavigate } from 'react-router';
import { useBackButton } from 'shared/hooks/useBackButton';
import { store } from 'shared/store';
import { CreateProposalOpen } from './CreateProposalOpen';
import css from './styles.module.scss';

export const CreateProposalFirstScreen = React.memo(function CreateProposalPage() {
	const { dao, setDao, proposalType, setProposalType } = store.useFormType();

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

	const handleNextScreen = React.useCallback(() => {
		navigate(routes.createProposalForm);
	}, [navigate]);

	return (
		<div className={css.page}>
			<CreateProposalOpen
				dao={dao}
				onSelectDao={setDao}
				proposalType={proposalType}
				onSelectProposalType={setProposalType}
				onBack={() => navigate(-1)}
				onCreate={() => handleNextScreen()}
			/>
		</div>
	);
});
