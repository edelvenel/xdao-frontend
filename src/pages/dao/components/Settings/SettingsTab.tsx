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
import css from './styles.module.scss';

interface ISettingsTabProps {
	dao: IDao;
}

export function SettingsTab({ dao }: ISettingsTabProps) {
	const ref = React.useRef<HTMLDivElement>(null);
	const [consensus, setConsensus] = React.useState<number>(dao.consensus);
	const [isConsensusEdit, setIsConsensusEdit] = React.useState<boolean>(false);
	const { setDao, setProposalType } = store.useFormType();

	const navigate = useNavigate();

	const handleOnConsensusSave = React.useCallback(() => {
		setIsConsensusEdit(false);
		toast.error('Save unimplemented');
	}, []);

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node) && isConsensusEdit) {
				setIsConsensusEdit(false);
				setConsensus(dao.consensus);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [dao.consensus, isConsensusEdit]);

	const handleOnRemove = React.useCallback(
		(walletAddress: string) => {
			if (walletAddress) {
				setDao(dao);
				setProposalType(ProposalTypes.find((type) => type.id === 2) ?? null);
				navigate(routes.createProposalForm);
			}
		},
		[dao, navigate, setDao, setProposalType]
	);

	const handleOnAdd = React.useCallback(() => {
		setDao(dao);
		setProposalType(ProposalTypes.find((type) => type.id === 1) ?? null);
		navigate(routes.createProposalForm);
	}, [dao, navigate, setDao, setProposalType]);

	const handleOnChangeTransferStatus = React.useCallback(() => {
		setDao(dao);
		setProposalType(ProposalTypes.find((type) => type.id === 4) ?? null);
		navigate(routes.createProposalForm);
	}, [dao, navigate, setDao, setProposalType]);

	const handleSetConsensus = React.useCallback((value: string) => {
		const numberValue = Number(value !== '' ? value : 0);
		if (numberValue < 0) {
			setConsensus(0);
		} else if (numberValue > 100) {
			setConsensus(100);
		}
		setConsensus(numberValue);
	}, []);

	//TODO: get data with dao
	if (!dao) {
		return null;
	}

	return (
		<div className={css.tab}>
			<div ref={ref} className={css.field}>
				<div className={css.info}>
					<div className={css.name}>Current consensus</div>
					{!isConsensusEdit && <div className={css.value}>{consensus}%</div>}
					{isConsensusEdit && (
						<div className={css.inputBox}>
							<input
								autoFocus
								type="number"
								className={css.input}
								value={consensus > 0 ? consensus : ''}
								onChange={(e) => handleSetConsensus(e.target.value)}
							/>
						</div>
					)}
				</div>
				{!isConsensusEdit && (
					<div className={css.button} onClick={() => setIsConsensusEdit(true)}>
						<Icon.Common.Edit />
					</div>
				)}
				{isConsensusEdit && (
					<div className={css.confirmButton} onClick={handleOnConsensusSave}>
						Confirm
					</div>
				)}
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
