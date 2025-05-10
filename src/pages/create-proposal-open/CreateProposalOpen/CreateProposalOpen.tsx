
import { ScreenLoader } from 'pages/tech/sceen-loader';
import React from 'react';
import { useDaos } from 'shared/api/daos';
import { proposalNameMapper, proposalTypeOptions } from 'shared/constants';
import { store } from 'shared/store';
import { IDao, ProposalType } from 'shared/types';
import { Button } from 'shared/ui/Button';
import { Dropdown } from 'shared/ui/Dropdown';
import { Title } from 'shared/ui/Title';
import { objectIdMatcher } from 'shared/utils/Mathcer';
import css from './styles.module.scss';

interface ICreateProposalOpen {
	dao: IDao | null;
	proposalType: ProposalType | null;
	onSelectDao: (dao: IDao) => void;
	onSelectProposalType: (proposalType: ProposalType) => void;
	onBack: () => void;
	onCreate: () => void;
}

export function CreateProposalOpen({
	dao,
	proposalType,
	onSelectDao,
	onSelectProposalType,
	onBack,
	onCreate,
}: ICreateProposalOpen) {
	const { setIsBackground } = store.useApp();
	const { fetchDaos } = useDaos();
	const {daos} = store.useDaos();
	const { fetchHolders } = store.useFormType();
	const { token } = store.useAuth();

	React.useEffect(() => {
		setIsBackground(true);
	}, [setIsBackground]);

	React.useEffect(() => {
		fetchDaos();
		if (dao?.address) {
			fetchHolders(token ?? '', dao.address);
		}
	}, [fetchDaos, dao, fetchHolders, token]);

	if (daos === null) {
		return <ScreenLoader/>
	}

	return (
		<div className={css.createProposalOpen}>
			<div className={css.title}>
				<Title variant="large" value="Create a proposal" />
			</div>
			<div className={css.form}>
				<Dropdown
					selected={dao}
					options={daos}
					optionLabel={(option) => option.name}
					optionLogo={(option) => option.logo}
					matcher={objectIdMatcher}
					onSelect={onSelectDao}
					placeholder="Select DAOs"
				/>
				<Dropdown
					selected={proposalType}
					options={proposalTypeOptions}
					optionLabel={(option) => proposalNameMapper[option]}
					// matcher={}
					onSelect={onSelectProposalType}
					placeholder="Select proposal type"
				/>
			</div>
			<div className={css.actions}>
				<Button disabled={dao === null || proposalType === null} onClick={onCreate}>
					Create
				</Button>
				<Button variant="secondary" onClick={onBack}>
					Back
				</Button>
			</div>
		</div>
	);
}
