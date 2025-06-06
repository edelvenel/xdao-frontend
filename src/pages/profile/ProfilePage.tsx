import { FilterEnum } from 'app/api/codegen';
import { routes } from 'app/router/routes';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router';
import { useDaos } from 'shared/api/daos';
import { useProposals } from 'shared/api/proposals';
import { useTelegramData } from 'shared/api/telegram-data';
import { Icon } from 'shared/icons';
import { store } from 'shared/store';
import { ProposalFilter } from 'shared/types';
import { Badge } from 'shared/ui/Badge';
import { Button } from 'shared/ui/Button';
import { Filter } from 'shared/ui/Filter';
import { IconButton } from 'shared/ui/IconButton';
import { Modal } from 'shared/ui/Modal';
import { Title } from 'shared/ui/Title';
import { CardLoader } from './components/CardLoader';
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

	const { fetchMe } = store.useMe();

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
	const { isTelegramLinked, toggleTelegramLink, fetchTelegramData, linkedTelegramUsername } = useTelegramData();
	React.useEffect(() => {
		fetchMe();
		fetchDaos(undefined, daosFilter);
		fetchProposals(undefined, proposalsFilter);
		fetchTelegramData();
	}, [daosFilter, fetchDaos, fetchMe, fetchProposals, fetchTelegramData, proposalsFilter]);

	return (
		<div className={css.page}>
			{/* {me && (
				<div className={css.userInfo}>
					<InitialsAvatar size={40} className={css.avatar} entityName={me?.firstName ?? ''} entityId={me?.id ?? 0} />
					<div className={css.name}>
						{me?.firstName ?? ''}
						{me?.lastName ?? ''}
					</div>
					<div className={css.editButton} onClick={() => toast.error('Unimplemented')}>
						Edit
					</div>
				</div>
			)} */}
			<div className={css.telegramInfo}>
				<div className={css.telegramInfoData}>
					<div className={css.telegramLinkedStatus}>
						<div className={css.telegramIcon}>
							<Icon.Social.telegram width="24" height="24" />
						</div>
						<div>{isTelegramLinked ? 'Linked' : 'Not Linked'}</div>
					</div>
					{isTelegramLinked && (
						<div className={css.telegramLinkedAccount}>
							Linked to <span className={css.telegramLinkedAccountUsername}>@{linkedTelegramUsername}</span>
						</div>
					)}
					{!isTelegramLinked && <div className={css.telegramLinkedAccount}>Link your Telegram account.</div>}
				</div>
				<div className={css.telegramInfoLinkButtonContainer}>
					<Button variant="secondary" onClick={toggleTelegramLink}>
						{isTelegramLinked ? 'Unlink' : 'Link'}
					</Button>
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
					{proposals && proposals.length !== 0 && (
						<div className={css.partList}>
							{proposals
								.filter((_, index) => index < 2)
								.map((proposal) => (
									<ProposalCard key={proposal.address} proposal={proposal} />
								))}
						</div>
					)}
					{!proposals && (
						<div className={css.partList}>
							<CardLoader />
						</div>
					)}
					<AnimatePresence initial={true}>
						{proposals && proposalShowAll && (
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
											<ProposalCard key={proposal.address} proposal={proposal} />
										))}
								</div>
							</motion.div>
						)}
					</AnimatePresence>
					{proposals && proposals.length === 0 && <div className={css.placeholder}>No proposals yet</div>}
				</div>
				{proposals && proposals.length > 3 && (
					<div className={css.seeMoreButton} onClick={() => setProposalShowAll(!proposalShowAll)}>
						{proposalShowAll ? 'Hide' : 'See more'}
					</div>
				)}
			</div>

			<div className={css.daoList}>
				<div className={css.header}>
					<Title value="My DAOs" variant="medium" />
					<IconButton variant="secondary" onClick={() => setIsDAOsFilterOpen(true)}>
						<Icon.Common.Filter />
					</IconButton>
				</div>
				<div className={css.list}>
					{daos && daos.length !== 0 && (
						<div className={css.partList}>
							{daos
								.filter((_, index) => index <= 2)
								.map((dao) => (
									<DaoCard key={dao.address} dao={dao} />
								))}
						</div>
					)}
					{!daos && (
						<div className={css.partList}>
							<CardLoader />
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
									{daos && daos.filter((_, index) => index >= 2).map((dao) => <DaoCard key={dao.address} dao={dao} />)}
								</div>
							</motion.div>
						)}
					</AnimatePresence>
					{daos && daos.length === 0 && <div className={css.placeholder}>No DAOs yet</div>}
				</div>
				{daos && daos.length > 3 && (
					<div className={css.seeMoreButton} onClick={() => setDaoShowAll(!daoShowAll)}>
						{daoShowAll ? 'Hide' : 'See more'}
					</div>
				)}
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
					options={daos ?? []}
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
