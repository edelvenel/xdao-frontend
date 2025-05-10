import { format } from 'date-fns';
import React from 'react';
import { useNavigate } from 'react-router';
import { proposalNameMapper } from 'shared/constants';
import { ProposalDetailLayout } from 'shared/layouts/proposal-detail-layout';
import { IProposal } from 'shared/types';
import { Collapse } from 'shared/ui/Collapse';
import { Copy } from 'shared/ui/Copy';
import css from '../../styles.module.scss';
import { FormHeader } from '../FormHeader';
import { SignaturesBlock } from '../SignaturesBlock';

interface IChangeGeneralConsensusDetailProps {
	proposal: IProposal;
	onVote: () => void;
}

export function ChangeGeneralConsensusDetail({ proposal, onVote }: IChangeGeneralConsensusDetailProps) {
	const [isOpen, setIsOpen] = React.useState<boolean>(false);

	const navigate = useNavigate();
	const formatedCreatedAt = format(new Date(proposal.createdAt), 'LLL dd, yyyy | HH:mm');

	return (
		<ProposalDetailLayout
			isVotingEnabled={false}
			userVote={proposal.userVote}
			onBack={() => navigate(-1)}
			onVote={onVote}
		>
			<div className={css.page}>
				<FormHeader
					name={proposal.name}
					description={proposal.description}
					status={proposal.status}
					consensus={proposal.consensus}
					endDate={proposal.endDate}
				/>

				<div className={css.card}>
					<div className={css.block}>
						<div className={css.column}>
							<div className={css.label}>Proposal type</div>
							<div className={css.value}>{proposalNameMapper[proposal.type]}</div>
						</div>
					</div>

					<div className={css.block}>
						<div className={css.column}>
							<div className={css.label}>Current consensus</div>
							<div className={css.value}>51%</div>
						</div>
					</div>

					<div className={css.block}>
						<div className={css.column}>
							<div className={css.label}>New consensus</div>
							<div className={css.value}>54%</div>
						</div>
					</div>
					<div className={css.block}>
						<div className={css.column}>
							<div className={css.label}>Created by</div>
							<div className={css.value}>TFoctV8P7ojS8MgbRCE8YcFcmgfynZjbTZ</div>
						</div>
						<Copy text="TFoctV8P7ojS8MgbRCE8YcFcmgfynZjbTZ" />
					</div>
					<div className={css.block}>
						<div className={css.column}>
							<div className={css.label}>Created at</div>
							<div className={css.value}>{formatedCreatedAt}</div>
						</div>
					</div>
					<Collapse label="Transaction details" isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
						<div className={css.details}>
							<div className={css.title}>Function: mint (address, uint256)</div>
							<div className={css.divider} />
							<div className={css.subtitle}>
								<span>Raw data</span>
								<Copy text="0x57584386yfeg0000000000000000000x57584386yfeg0000000000000000000x57584386yfeg0000000000000000000x57584386yfeg00000000000000000034567890453" />
							</div>
							<div className={css.rawData}>
								0x57584386yfeg0000000000000000000x57584386yfeg0000000000000000000x57584386yfeg0000000000000000000x57584386yfeg00000000000000000034567890453
							</div>
						</div>
					</Collapse>
				</div>

				<SignaturesBlock votes={proposal.votes} />
			</div>
		</ProposalDetailLayout>
	);
}
