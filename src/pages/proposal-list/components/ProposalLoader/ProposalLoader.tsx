import css from './styles.module.scss';

export function ProposalLoader() {
	return (
		<div className={css.proposalLoader}>
			<div className={css.block} />
			<div className={css.block} />
			<div className={css.block} />

			<div className={css.blockVote}>
				<div className={css.block} />
				<div className={css.block} />
			</div>
		</div>
	);
}
