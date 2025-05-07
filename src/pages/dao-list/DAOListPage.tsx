import { TopContent } from 'app/navigation/components/top-content';
import { routes } from 'app/router/routes';
import { Filter } from 'pages/proposal-list/components/Filter';
import { SearchBlock } from 'pages/proposal-list/components/SearchBlock';
import React from 'react';
import { generatePath, useNavigate } from 'react-router';
import { useDaos } from 'shared/api/daos/useDaos';
import { store } from 'shared/store';
import { Modal } from 'shared/ui/Modal';
import { DAO } from './components/DAO';
import css from './styles.module.scss';

const FILTER_OPTIONS: string[] = [
	'All DAOs',
	'My DAOs',
	'With my LP tokens',
	'With my GP role',
	'Rejected',
	'With active proposals',
];

export const DAOListPage = React.memo(function DAOListPage() {
	const [searchText, setSearchText] = React.useState<string>('');
	const [isFilterOpen, setIsFilterOpen] = React.useState<boolean>(false);
	const [filter, setFilter] = React.useState<number>(0);
	const { setIsHeaderShown, setIsMenuShown, setIsBackground } = store.useApp();
	const { daos, fetchDaos } = useDaos();

	const navigate = useNavigate();

	const handleOnCreate = React.useCallback(() => {
		navigate(routes.createDao);
	}, [navigate]);

	React.useEffect(() => {
		setIsMenuShown(true);
		setIsHeaderShown(true);
	}, [setIsHeaderShown, setIsMenuShown]);

	React.useEffect(() => {
		if (daos.length > 0) {
			setIsBackground(false);
		} else {
			setIsBackground(true);
		}
	}, [daos.length, setIsBackground]);

	React.useEffect(() => {
		fetchDaos();
	}, [fetchDaos]);

	return (
		<div className={css.page}>
			<div className={css.list}>
				{daos.map((dao) => (
					<DAO
						key={dao.id}
						dao={dao}
						onOpen={() => navigate(generatePath(routes.dao, { id: dao.id, tab: 'overview' }))}
					/>
				))}
				{daos.length === 0 && <div className={css.placeholder}>No DAOs</div>}
			</div>
			<TopContent>
				<SearchBlock
					searchText={searchText}
					onChange={setSearchText}
					onFilter={() => setIsFilterOpen(true)}
					onCreate={handleOnCreate}
				/>
			</TopContent>

			<Modal isOpen={isFilterOpen} title="Filter" onClose={() => setIsFilterOpen(false)}>
				<Filter selected={filter} options={FILTER_OPTIONS} onApply={setFilter} onClose={() => setIsFilterOpen(false)} />
			</Modal>
		</div>
	);
});
