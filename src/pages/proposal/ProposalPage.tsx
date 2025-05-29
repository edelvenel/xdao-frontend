import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useProposals } from 'shared/api/proposals';
import { getDao } from 'shared/api/daos/methods';
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
import { IDao } from 'shared/types';
import css from './styles.module.scss';
import { useTonAddress } from '@tonconnect/ui-react';

export const ProposalPage = React.memo(function ProposalPage() {
	const { proposals, fetchProposals, submitVote } = useProposals();
	const { proposalAddress } = useParams();
	const navigate = useNavigate();
	const address = useTonAddress(false);
	const { setIsMenuShown, setIsHeaderShown } = store.useApp();
	const [isOnVote, setIsOnVote] = React.useState<boolean>(false);
	const [isResultOpen, setIsResultOpen] = React.useState<boolean>(false);
	const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
	const [dao, setDao] = React.useState<IDao | null>(null);
	const { holders, fetchHolders } = store.useFormType();
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
		if (token && proposal?.daoAddress) {
			fetchHolders(token, proposal.daoAddress);
		}
	}, [fetchProposals]);

	React.useEffect(() => {
		if (proposal && token) {
			fetchHolders(token, proposal?.daoAddress);
		}
	}, [fetchHolders, proposal, token]);

	React.useEffect(() => {
		try {
			if (proposal?.daoAddress) {
				getDao(token ?? '', proposal.daoAddress).then(setDao);
			}
		} catch (exception) {
			console.error('Unable to get dao', exception);
		}
	}, [proposal?.daoAddress])

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
	const holderBalance = holders ? holders.find((h) => h.owner_address === address)?.balance : undefined;

	const voteImpact = Number(holderBalance) / Number(dao?.LPTokens) * 100;


	return (
		<div className={css.page}>
			{!!proposal && <ProposalDetails proposal={proposal} setDao={setDao} onVote={() => setIsOnVote(true)} />}
			{proposal === null && <ProposalPageLoader />}

			{!!proposal && (
                <Modal
                    isOpen={!!proposal && isOnVote && !!holderBalance}
                    onClose={() => setIsOnVote(false)}
                    titleAlign="center"
                    title={proposal.name}
                >
                    <Vote
                        currentPercent={(proposal.currentVotes / proposal.consensus) * 100}
                        voteImpact={voteImpact}
                        totalPercent={dao ? (proposal.consensus / Number(dao.LPTokens)) * 100 : 0}
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
