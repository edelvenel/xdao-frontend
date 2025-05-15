import { FilterEnum } from 'app/api/codegen';
import { routes } from 'app/router/routes';
import { AnimatePresence, motion } from 'framer-motion';
import { ScreenLoader } from 'pages/tech/sceen-loader';
import React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import { useDaos } from 'shared/api/daos';
import { useProposals } from 'shared/api/proposals';
import { Icon } from 'shared/icons';
import { store } from 'shared/store';
import { ProposalFilter } from 'shared/types';
import { Badge } from 'shared/ui/Badge';
import { Button } from 'shared/ui/Button';
import { Filter } from 'shared/ui/Filter';
import { IconButton } from 'shared/ui/IconButton';
import { Modal } from 'shared/ui/Modal';
import { Title } from 'shared/ui/Title';
import { ChangeDaoResult } from './components/ChangeDaoResult';
import { DaoCard } from './components/DaoCard';
import { ProposalCard } from './components/ProposalCard';
import { SelectDao } from './components/SelectDao';
import css from './styles.module.scss';

export const ProfilePage = React.memo(function ProfilePage() {
	const [isProposalsFilterOpen, setIsProposalsFilterOpen] = React.useState<boolean>(false);
	const [isSelectDaoOpen, setIsSelectDaoOpen] = React.useState<boolean>(false);
	const [proposalsFilter, setProposalsFilter] = React.useState<ProposalFilter>(ProposalFilter.AllProposals);
	const [isDAOsFilterOpen, setIsDAOsFilterOpen] = React.useState<boolean>(false);
	const [daosFilter, setDaosFilter] = React.useState<FilterEnum>(FilterEnum.All);
	const [proposalShowAll, setProposalShowAll] = React.useState<boolean>(false);
	const [daoShowAll, setDaoShowAll] = React.useState<boolean>(false);
	const [selectedDaoIdx, setSelectedDaoIdx] = React.useState<null | number>(null);
	const [isCreateOpen, setIsCreateOpen] = React.useState<boolean>(false);
	const [isChangeSuccess, setIsChangeSuccess] = React.useState<boolean>(false);
	const [isChangeResultOpen, setIsChangeResultOpen] = React.useState<boolean>(false);
	const { daos, fetchDaos } = useDaos();
	const { proposals, fetchProposals } = useProposals();

	const { me } = store.useMe();

	const { setIsMenuShown, setIsHeaderShown, setIsBackground } = store.useApp();

	const selectedDao = React.useMemo(() => {
		return selectedDaoIdx !== null && daos !== null ? daos[selectedDaoIdx] : null;
	}, [daos, selectedDaoIdx]);

	const handleOnApplyDao = React.useCallback((idx: number | null) => {
		// TODO: change DAO and get response

		setSelectedDaoIdx(idx);
		setIsChangeSuccess(true);
		setIsChangeResultOpen(true);
	}, []);

	React.useEffect(() => {
		setIsBackground(false);
		setIsHeaderShown(true);
		setIsMenuShown(true);
	}, [setIsBackground, setIsHeaderShown, setIsMenuShown]);

	React.useEffect(() => {
		fetchDaos();
		fetchProposals();
	}, [fetchDaos, fetchProposals, selectedDao]);

	if (daos === null) {
		return <ScreenLoader />;
	}

	return (
		<div className={css.page}>
			<div className={css.userInfo}>
				<div className={css.avatar} style={{ backgroundImage: `url(${me?.photoUrl})` }} />
				<div className={css.name}>
					{me?.firstName ?? ''}
					{me?.lastName ?? ''}
				</div>
				<div className={css.editButton} onClick={() => toast.error('Unimplemented')}>
					Edit
				</div>
			</div>

			<div className={css.block}>
				<div className={css.title}>
					<Title value="Claim airdrop via DAO:" variant="medium" />
				</div>
				{selectedDao === null && (
					<>
						<div className={css.text}>
							You haven’t selected a DAO yet. To receive your $DAO tokens, join a DAO as an GP and reserve one of 5
							available airdrop slots.
						</div>
						<Button variant="primary" onClick={() => setIsSelectDaoOpen(true)}>
							Select DAO
						</Button>
					</>
				)}
				{selectedDao !== null && (
					<>
						<div className={css.card}>
							<div className={css.logo} style={{ background: `url(${selectedDao.logo})` }} />
							<div className={css.name}>{selectedDao.name}</div>
						</div>
						<div className={css.card}>
							<div className={css.title}>Claimed slots</div>
							<div className={css.slots}>
								<div className={css.claimed}>{selectedDao.slots.reserved}</div>
								<span>/{selectedDao.slots.total}</span>
							</div>
						</div>
						<div className={css.card}>
							<div className={css.title}>Your slot:</div>
							<Badge variant="blue" text="Reserved" />
						</div>
						<Button variant="primary" onClick={() => setIsSelectDaoOpen(true)}>
							Change DAO
						</Button>
					</>
				)}
			</div>

			<div className={css.proposalList}>
				<div className={css.header}>
					<Title value="My proposals" variant="medium" />
					<IconButton variant="secondary" onClick={() => setIsProposalsFilterOpen(true)}>
						<Icon.Common.Filter />
					</IconButton>
				</div>

				<div className={css.list}>
					{proposals.length !== 0 && (
						<div className={css.partList}>
							{proposals
								.filter((_, index) => index < 2)
								.map((proposal) => (
									<ProposalCard key={proposal.id} proposal={proposal} />
								))}
						</div>
					)}
					<AnimatePresence initial={true}>
						{proposalShowAll && (
							<motion.div
								className={css.animationBlock}
								transition={{ duration: 0.3 }}
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0, gap: 0 }}
							>
								<div className={css.partList}>
									{proposals
										.filter((_, index) => index >= 2)
										.map((proposal) => (
											<ProposalCard key={proposal.id} proposal={proposal} />
										))}
								</div>
							</motion.div>
						)}
					</AnimatePresence>
					{proposals.length === 0 && <div className={css.placeholder}>No proposals</div>}
				</div>
				<div className={css.seeMoreButton} onClick={() => setProposalShowAll(!proposalShowAll)}>
					{proposals.length > 3 && (proposalShowAll ? 'Hide' : 'See more')}
				</div>
			</div>

			<div className={css.daoList}>
				<div className={css.header}>
					<Title value="My DAOs" variant="medium" />
					<IconButton variant="secondary" onClick={() => setIsDAOsFilterOpen(true)}>
						<Icon.Common.Filter />
					</IconButton>
				</div>
				<div className={css.list}>
					{daos.length !== 0 && (
						<div className={css.partList}>
							{daos
								.filter((_, index) => index < 2)
								.map((dao) => (
									<DaoCard key={dao.address} dao={dao} />
								))}
						</div>
					)}
					<AnimatePresence initial={true}>
						{daoShowAll && (
							<motion.div
								className={css.animationBlock}
								transition={{ duration: 0.3 }}
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0, gap: 0 }}
							>
								<div className={css.partList}>
									{daos
										.filter((_, index) => index >= 2)
										.map((dao) => (
											<DaoCard key={dao.address} dao={dao} />
										))}
								</div>
							</motion.div>
						)}
					</AnimatePresence>
					{daos.length === 0 && <div className={css.placeholder}>No daos</div>}
				</div>
				<div className={css.seeMoreButton} onClick={() => setDaoShowAll(!daoShowAll)}>
					{daos.length > 3 && (daoShowAll ? 'Hide' : 'See more')}
				</div>
			</div>

			<Modal isOpen={isProposalsFilterOpen} title="Filter proposals" onClose={() => setIsProposalsFilterOpen(false)}>
				<Filter
					selected={proposalsFilter}
					options={Object.values(ProposalFilter)}
					mapper={(value) => {
						const result = Object.entries(ProposalFilter).find((entry) => entry[1] === value);
						if (result) {
							return result[1];
						}
						return ProposalFilter.AllProposals;
					}}
					onApply={setProposalsFilter}
					onClose={() => setIsProposalsFilterOpen(false)}
				/>
			</Modal>

			<Modal isOpen={isDAOsFilterOpen} title="Filter DAOs" onClose={() => setIsDAOsFilterOpen(false)}>
				<Filter
					selected={daosFilter}
					options={Object.values(FilterEnum)}
					mapper={(value) => {
						const result = Object.entries(FilterEnum).find((entry) => entry[1] === value);
						if (result) {
							return result[1];
						}
						return FilterEnum.All;
					}}
					onApply={setDaosFilter}
					onClose={() => setIsDAOsFilterOpen(false)}
				/>
			</Modal>

			<Modal isOpen={isCreateOpen} title="Select action" onClose={() => setIsCreateOpen(false)}>
				<div className={css.actions}>
					<Link to={routes.createDao} className={css.cardButton}>
						<div className={css.icon}>
							<Icon.Common.DAO />
						</div>
						<span>Create</span>
						<span>DAO</span>
					</Link>
					<Link to={routes.createProposal} className={css.cardButton}>
						<div className={css.icon}>
							<Icon.Common.Proposal />
						</div>
						<span>Create</span>
						<span>Proposal</span>
					</Link>
				</div>
			</Modal>

			<Modal isOpen={isSelectDaoOpen} title="Select DAO for airdrop" onClose={() => setIsSelectDaoOpen(false)}>
				<SelectDao
					selected={selectedDaoIdx}
					options={daos}
					onApply={handleOnApplyDao}
					onClose={() => setIsSelectDaoOpen(false)}
				/>
			</Modal>

			<Modal isBackgroundOn={isChangeSuccess} isOpen={isChangeResultOpen} onClose={() => setIsChangeResultOpen(false)}>
				<ChangeDaoResult
					success={isChangeSuccess}
					onDone={() => setIsChangeResultOpen(false)}
					onRetry={() => setIsChangeResultOpen(false)}
				/>
			</Modal>
		</div>
	);
});
