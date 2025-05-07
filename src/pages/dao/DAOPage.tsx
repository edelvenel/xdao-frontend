import { routes } from 'app/router/routes';
import React from 'react';
import { generatePath, useNavigate, useParams } from 'react-router';
import { useDaos } from 'shared/api/daos';
import { useBackButton } from 'shared/hooks/useBackButton';
import { store } from 'shared/store';
import { IDao } from 'shared/types';
import { Modal } from 'shared/ui/Modal';
import { CrowdfundingTab } from './components/CrowdfundingTab';
import { DAOBalanceTab } from './components/DAOBalanceTab';
import { OverviewTab } from './components/OverviewTab';
import { SettingsTab } from './components/Settings';
import { Tabs } from './components/Tabs';
import { ITab } from './components/Tabs/types';
import { VotesTab } from './components/VotesTab';
import { mapNumberTab, mapTabNumber } from './methods';
import css from './styles.module.scss';

export const DAOPage = React.memo(function DAOPage() {
	const { id, tab } = useParams();
	const { setIsHeaderShown, setIsMenuShown, setIsBackground } = store.useApp();
	const { daos, fetchDaos } = useDaos();
	const [isInfoOpen, setIsInfoOpen] = React.useState<boolean>(false);

	const navigate = useNavigate();
	useBackButton();

	const dao: IDao | undefined = React.useMemo(() => daos.find((dao) => dao.id === id), [daos, id]);

	const selectedTabIdx = React.useMemo(() => mapTabNumber(tab), [tab]);

	const handleSelectTab = React.useCallback(
		(value: number) => {
			if (id) {
				navigate(generatePath(routes.dao, { id: id, tab: mapNumberTab(value) }));
			}
		},
		[id, navigate]
	);

	React.useEffect(() => {
		setIsHeaderShown(true);
		setIsMenuShown(true);
		setIsBackground(false);
	}, [setIsBackground, setIsHeaderShown, setIsMenuShown]);

	React.useEffect(() => {
		fetchDaos();
	}, [fetchDaos]);

	const tabs: ITab[] = React.useMemo(() => {
		if (!dao) {
			return [];
		}

		return [
			{
				title: 'Overview',
				content: <OverviewTab dao={dao} />,
			},
			{
				title: 'Votes',
				content: <VotesTab dao={dao} />,
			},
			{
				title: 'Crowdfunding',
				content: <CrowdfundingTab dao={dao} />,
			},
			{
				title: 'DAO Balance',
				content: <DAOBalanceTab dao={dao} onInfo={() => setIsInfoOpen(true)} />,
			},
			{
				title: 'Settings',
				content: <SettingsTab dao={dao} />,
			},
		];
	}, [dao]);

	if (!dao) {
		return null;
	}

	return (
		<div className={css.page}>
			<Tabs tabs={tabs} selectedTabIdx={selectedTabIdx} onSelect={handleSelectTab} />

			<Modal isOpen={isInfoOpen} title="Future $DAO tokens" onClose={() => setIsInfoOpen(false)}>
				<div className={css.infoBlock}>
					<div className={css.textBlock}>
						These tokens will be officially minted and distributed after the Token Generation Event (TGE).
					</div>
					<div className={css.textBlock}>
						Displayed here is the estimated allocation reserved for this DAO based on its position in the system.
					</div>
				</div>
			</Modal>
		</div>
	);
});
