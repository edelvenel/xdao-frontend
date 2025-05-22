import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useProposals } from 'shared/api/proposals';
import { useBackButton } from 'shared/hooks/useBackButton';
import { store } from 'shared/store';
import { Modal } from 'shared/ui/Modal';
import { ProposalDetails } from './components/ProposalDetails';
import { Vote } from './components/Vote';
import { VoteResult } from './components/VoteResult';
import css from './styles.module.scss';

export const ProposalPage = React.memo(function ProposalPage() {
	const { proposals, fetchProposals, submitVote } = useProposals();
	const { id } = useParams();
	const navigate = useNavigate();
	const { setIsMenuShown, setIsHeaderShown } = store.useApp();
	const [isOnVote, setIsOnVote] = React.useState<boolean>(false);
	const [isResultOpen, setIsResultOpen] = React.useState<boolean>(false);
	const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
	const { fetchHolders } = store.useFormType();
	const { token } = store.useAuth();
	useBackButton();

	const proposal = React.useMemo(() => {
		return proposals ? proposals.find((proposal) => proposal.id === id) : null;
	}, [id, proposals]);

	React.useEffect(() => {
		setIsMenuShown(false);
		setIsHeaderShown(true);
	}, [setIsHeaderShown, setIsMenuShown]);

	const handleOnConfirm = React.useCallback(async () => {
		if (!proposal || !token) {
			return;
		}

		try {
			fetchHolders(token, proposal?.daoAddress);

			await submitVote(proposal);
			setIsOnVote(false);
			setIsSuccess(true);
			setIsResultOpen(true);
		} catch (error) {
			console.error('Unable to submit vote', error);
			setIsSuccess(false);
		}
	}, [fetchHolders, proposal, submitVote, token]);

	React.useEffect(() => {
		fetchProposals();
	}, []);

	if (!proposal) {
		return null;
	}

	return (
		<div className={css.page}>
			{!!proposal && <ProposalDetails proposal={proposal} onVote={() => setIsOnVote(true)} />}

			<Modal
				isOpen={!!proposal && isOnVote}
				onClose={() => setIsOnVote(false)}
				titleAlign="center"
				title={proposal.name}
			>
				<Vote
					currentPercent={20} //TODO: replace with appropriate real data
					voteImpact={32} //TODO: replace with appropriate real data
					totalPercent={proposal.consensus}
					onConfirm={handleOnConfirm}
				/>
			</Modal>
			<Modal isBackgroundOn={isSuccess} isOpen={isResultOpen} onClose={() => setIsResultOpen(false)}>
				<VoteResult success={isSuccess} onDone={() => navigate(-1)} onRetry={() => setIsResultOpen(false)} />
			</Modal>
		</div>
	);
});
