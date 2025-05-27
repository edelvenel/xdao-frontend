import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useProposals } from 'shared/api/proposals';
import { useBackButton } from 'shared/hooks/useBackButton';
import { Icon } from 'shared/icons';
import { store } from 'shared/store';
import { Button } from 'shared/ui/Button';
import { Modal } from 'shared/ui/Modal';
import { Title } from 'shared/ui/Title';
import { ProposalDetails } from './components/ProposalDetails';
import { ProposalPageLoader } from './components/ProposalPageLoader';
import { Vote } from './components/Vote';
import { VoteResult } from './components/VoteResult';
import css from './styles.module.scss';

export const ProposalPage = React.memo(function ProposalPage() {
	const { proposals, fetchProposals, submitVote } = useProposals();
	const { proposalAddress } = useParams();
	const navigate = useNavigate();
	const { setIsMenuShown, setIsHeaderShown } = store.useApp();
	const [isOnVote, setIsOnVote] = React.useState<boolean>(false);
	const [isResultOpen, setIsResultOpen] = React.useState<boolean>(false);
	const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
	const { fetchHolders } = store.useFormType();
	const { token } = store.useAuth();
	useBackButton();

	const proposal = React.useMemo(() => {
		return proposals !== null ? proposals.find((proposal) => proposal.address === proposalAddress) : null;
	}, [proposalAddress, proposals]);

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

	console.log(proposal);

	if (proposal === undefined) {
		return (
			<div className={css.page}>
				<div className={css.error}>
					<Icon.Special.Error />
				</div>
				<Title value="Error!" variant="large" />
				<div className={css.placeholder}>Proposal not found</div>

				<div className={css.backButton}>
					<Button variant="secondary" onClick={() => navigate(-1)}>
						Back
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className={css.page}>
			{!!proposal && <ProposalDetails proposal={proposal} onVote={() => setIsOnVote(true)} />}
			{proposal === null && <ProposalPageLoader />}

			{!!proposal && (
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
			)}
			{!!proposal && (
				<Modal isBackgroundOn={isSuccess} isOpen={isResultOpen} onClose={() => setIsResultOpen(false)}>
					<VoteResult success={isSuccess} onDone={() => navigate(-1)} onRetry={() => setIsResultOpen(false)} />
				</Modal>
			)}
		</div>
	);
});
