import { FilterEnum } from 'app/api/codegen';
import { TopContent } from 'app/navigation/components/top-content';
import { routes } from 'app/router/routes';
import debounce from 'lodash.debounce';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { generatePath, useNavigate } from 'react-router';
import { useDaos } from 'shared/api/daos/useDaos';
import { store } from 'shared/store';
import { Filter } from 'shared/ui/Filter';
import { Modal } from 'shared/ui/Modal';
import { SearchBlock } from 'shared/ui/SearchBlock';
import { DAO } from './components/DAO';
import { DAOLoader } from './components/DAOLoader';
import { PendingDAO } from './components/PendingDao';
import css from './styles.module.scss';

export const DAOListPage = React.memo(function DAOListPage() {
	const [searchText, setSearchText] = React.useState<string | null>(null);
	const [isFilterOpen, setIsFilterOpen] = React.useState<boolean>(false);
	const [filter, setFilter] = React.useState<FilterEnum>(FilterEnum.All);
	const { setIsHeaderShown, setIsMenuShown, setIsBackground } = store.useApp();
	const { fetchDaos, resetDaos, hasMore } = useDaos();
	const { daos, pendingDaos } = store.useDaos();

	const navigate = useNavigate();

	const handleOnCreate = React.useCallback(() => {
		navigate(routes.createDao);
	}, [navigate]);

	React.useEffect(() => {
		setIsMenuShown(true);
		setIsHeaderShown(true);
	}, [setIsHeaderShown, setIsMenuShown]);

	React.useEffect(() => {
		if (daos === null || daos.length > 0) {
			setIsBackground(false);
		} else {
			setIsBackground(true);
		}
	}, [daos, setIsBackground]);

	React.useEffect(() => {
		fetchDaos(searchText ?? '', filter);
	}, [fetchDaos, filter, searchText]);

	const handleOnApplyFilter = React.useCallback(
		(value: FilterEnum) => {
			resetDaos();
			setFilter(value);
			fetchDaos(searchText ?? '', value);
		},
		[fetchDaos, resetDaos, searchText]
	);

	const handleOnSearch = React.useCallback(
		(text: string) => {
			resetDaos();
			fetchDaos(text ?? '', filter);
			if (text === '') {
				setSearchText(null);
			}
		},
		[fetchDaos, filter, resetDaos]
	);

	const debouncedResults = React.useMemo(() => {
		return debounce(handleOnSearch, 500);
	}, [handleOnSearch]);

	React.useEffect(() => {
		if (searchText !== null) {
			debouncedResults(searchText);
		}

		return () => {
			debouncedResults.cancel();
		};
	}, [debouncedResults, searchText]);

	return (
		<div className={css.page}>
			<div className={css.list}>
				{daos && daos.length === 0 && <div className={css.placeholder}>No DAOs yet</div>}
				{daos && (
					<InfiniteScroll
						dataLength={daos.length}
						next={fetchDaos}
						hasMore={hasMore}
						loader={<div>Loading...</div>}
						className={css.list}
					>
						{pendingDaos !== null &&
							Object.values(pendingDaos).map((dao, index) => <PendingDAO key={index} dao={dao} />)}
						{daos.map((dao) => (
							<DAO
								key={dao.address}
								dao={dao}
								onOpen={() => navigate(generatePath(routes.dao, { id: dao.address, tab: 'overview' }))}
							/>
						))}
					</InfiniteScroll>
				)}
				{!daos && (
					<>
						<DAOLoader />
						<DAOLoader />
					</>
				)}
			</div>
			<TopContent>
				<SearchBlock
					searchText={searchText ?? ''}
					placeholder="Search DAOs"
					onChange={setSearchText}
					onFilter={() => setIsFilterOpen(true)}
					onCreate={handleOnCreate}
				/>
			</TopContent>

			<Modal isOpen={isFilterOpen} title="Filter" onClose={() => setIsFilterOpen(false)}>
				<Filter
					selected={filter}
					options={Object.values(FilterEnum)}
					mapper={(value) => {
						const result = Object.entries(FilterEnum).find((entry) => entry[1] === value);
						if (result) {
							return result[1];
						}
						return FilterEnum.All;
					}}
					onApply={handleOnApplyFilter}
					onClose={() => setIsFilterOpen(false)}
				/>
			</Modal>
		</div>
	);
});
