import { useNavigate } from 'react-router';
import { ProposalDetailLayout } from 'shared/layouts/proposal-detail-layout';
import { Title } from 'shared/ui/Title';
import css from './styles.module.scss';

export function ProposalPageLoader() {
	const navigate = useNavigate();
	return (
		<ProposalDetailLayout
			status={null}
			isVotingEnabled={true}
			userVote={null}
			totalSupply={0}
			onBack={() => navigate(-1)}
		>
			<div className={css.proposalPageLoader}>
				<div className={css.card}>
					<div className={css.block} />
					<div className={css.block} />
					<div className={css.block} />
				</div>
				<div className={css.card}>
					<div className={css.block} />
					<div className={css.block} />
					<div className={css.block} />
					<div className={css.block} />
					<div className={css.block} />
					<div className={css.block} />
				</div>

				<div className={css.card}>
					<Title value="Signatures" variant="medium" />
					<div className={css.blockVote} />
					<div className={css.block} />
					<div className={css.block} />
				</div>
			</div>
		</ProposalDetailLayout>
	);
}
