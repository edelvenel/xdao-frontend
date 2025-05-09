import React from 'react';
import { useDaos } from 'shared/api/daos';
import { store } from 'shared/store';
import { Loader } from 'shared/ui/Loader';
import css from './styles.module.scss';

interface IDaoCreateLoaderProps {
	onDone: (daoId: string) => void;
	onTimeOut: () => void;
}

export function DaoCreateLoader({ onDone, onTimeOut }: IDaoCreateLoaderProps) {
	const { fetchDaos } = useDaos();

	const handleFetchDaos = React.useCallback(async () => {
		await fetchDaos();
		const { daos, oldDaos, setOldDaos } = store.useDaos.getState();

		if (!oldDaos || daos!.length === oldDaos.length) {
			setTimeout(handleFetchDaos, 5000);
		} else {
			const dao = daos?.find((dao) => !oldDaos.map((oldDao) => oldDao.address).includes(dao.address));
			if (dao) {
				onDone(dao.address);
			}
		}

		setOldDaos(daos);
	}, [fetchDaos, onDone]);

	React.useEffect(() => {
		setTimeout(onTimeOut, 40000);
	}, [onTimeOut]);

	React.useEffect(() => {
		handleFetchDaos();
	}, [handleFetchDaos]);

	return (
		<div className={css.daoCreateLoader}>
			<span> Processing...</span>
			<Loader />
		</div>
	);
}
