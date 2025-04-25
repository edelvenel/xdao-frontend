import { ProposalTypes } from 'app/mocks/constants';
import { routes } from 'app/router/routes';
import cn from 'classnames';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { Icon } from 'shared/icons';
import { store } from 'shared/store';
import { IDao } from 'shared/types';
import { Button } from 'shared/ui/Button';
import { EditableInputNumber } from 'shared/ui/EditableInputNumber';
import css from './styles.module.scss';

interface ISettingsTabProps {
	dao: IDao;
}

export function SettingsTab({ dao }: ISettingsTabProps) {
	const [consensus, setConsensus] = React.useState<number>(dao.consensus);
	const { setDao, setProposalType } = store.useFormType();

	const navigate = useNavigate();

	const handleOnConsensusSave = React.useCallback(() => {
		toast.error('Save unimplemented');
	}, []);

	const handleOnConsensusCancel = React.useCallback(() => {
		setConsensus(dao.consensus);
	}, [dao.consensus]);

	const handleOnRemove = React.useCallback(
		(walletAddress: string) => {
			if (walletAddress) {
				setDao(dao);
				setProposalType(ProposalTypes.find((type) => type.id === 2) ?? null);
				navigate(routes.createProposal);
			}
		},
		[dao, navigate, setDao, setProposalType]
	);

	const handleOnAdd = React.useCallback(() => {
		setDao(dao);
		setProposalType(ProposalTypes.find((type) => type.id === 1) ?? null);
		navigate(routes.createProposal);
	}, [dao, navigate, setDao, setProposalType]);

	const handleOnChangeTransferStatus = React.useCallback(() => {
		setDao(dao);
		setProposalType(ProposalTypes.find((type) => type.id === 4) ?? null);
		navigate(routes.createProposal);
	}, [dao, navigate, setDao, setProposalType]);

	//TODO: get data with dao
	if (!dao) {
		return null;
	}

	return (
		<div className={css.tab}>
			<div className={css.field}>
				<div className={css.name}>Current consensus</div>
				<EditableInputNumber
					max={100}
					min={0}
					onUpdate={(value) => setConsensus(Number(value))}
					value={consensus > 0 ? consensus : ''}
					placeholder="Enter amount manual"
					onSave={handleOnConsensusSave}
					onCancel={handleOnConsensusCancel}
				/>
			</div>
			<div className={css.block}>
				<div className={css.title}>GP holders:</div>
				{dao.distributionRules.map((rule, index) => (
					<div key={index} className={css.distributionRule}>
						<div className={cn(css.item, css.wallet)}>
							<div className={css.text}>{rule.walletAddress}</div>
						</div>
						<div className={cn(css.item, css.gpTokens)}>{rule.tokens}</div>
						<div className={cn(css.item, css.percent)}>{rule.percent}%</div>
						<div className={cn(css.item, css.link)} onClick={() => toast.error('Unimplemented')}>
							<Icon.Common.LittleLink />
						</div>
						<div className={cn(css.item, css.cancel)} onClick={() => handleOnRemove(rule.walletAddress)}>
							<Icon.Common.Cancel />
						</div>
					</div>
				))}

				<div className={css.actions}>
					<Button variant="primary" onClick={handleOnAdd}>
						Add more
					</Button>
					<Button variant="secondary" onClick={handleOnChangeTransferStatus}>
						Change transfer status
					</Button>
				</div>
			</div>
		</div>
	);
}
