import React, { JSX } from 'react';
import { store } from 'shared/store';
import { ProposalType } from 'shared/types';
import { AddGPForm } from './components/AddGPForm';
import { ChangeDAONameForm } from './components/ChangeDAONameForm';
import { ChangeGeneralConsensusForm } from './components/ChangeGeneralConsensusForm';
import { ChangeGPTransferStatusForm } from './components/ChangeGPTransferStatusForm';
import { RemoveGPForm } from './components/RemoveGPForm';
import { SendFundsForm } from './components/SendFundsForm';
import { TransferGPForm } from './components/TransferGPForm';

interface IProposalFormProps {
	type: ProposalType;
	onResponse: (value: boolean) => void;
}

export function ProposalForm({ type, onResponse }: IProposalFormProps): JSX.Element | null {
	const { setIsBackground } = store.useApp();

	React.useEffect(() => {
		setIsBackground(false);
	}, [setIsBackground]);

	switch (type) {
		case ProposalType.AddGP:
			return <AddGPForm onResponse={onResponse} />;

		case ProposalType.RemoveGP:
			return <RemoveGPForm onResponse={onResponse} />;

		case ProposalType.TransferGPTokens:
			return <TransferGPForm onResponse={onResponse} />;

		case ProposalType.ChangeGPTransferStatus:
			return <ChangeGPTransferStatusForm onResponse={onResponse} />;

		case ProposalType.ChangeGeneralConsensus:
			return <ChangeGeneralConsensusForm onResponse={onResponse} />;

		case ProposalType.SendDAOFunds:
			return <SendFundsForm onResponse={onResponse} />;

		case ProposalType.ChangeDAOName:
			return <ChangeDAONameForm onResponse={onResponse} />;

		// case ProposalType.Custom:
		// 	return <CustomProposalForm onResponse={onResponse} />;
		default:
			return null;
	}
}
