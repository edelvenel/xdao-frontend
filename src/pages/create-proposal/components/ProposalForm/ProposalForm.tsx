import React, { JSX } from 'react';
import { ICreateProposalPayload } from 'shared/api/proposals/payloads';
import { store } from 'shared/store';
import { ProposalType } from 'shared/types';
import { AddGPForm } from './components/AddGPForm';
import { ChangeDAONameForm } from './components/ChangeDAONameForm';
import { ChangeGeneralConsensusForm } from './components/ChangeGeneralConsensusForm';
import { ChangeGPTransferStatusForm } from './components/ChangeGPTransferStatusForm';
import { CustomProposalForm } from './components/CustomProposalForm';
import { RemoveGPForm } from './components/RemoveGPForm';
import { SendFundsForm } from './components/SendFundsForm';
import { TransferGPForm } from './components/TransferGPForm';

interface IProposalFormProps {
	data: ICreateProposalPayload | null;
	type: number;
	onResponse: (value: boolean) => void;
}

export function ProposalForm({ data, type, onResponse }: IProposalFormProps): JSX.Element | null {
	const { setIsBackground } = store.useApp();

	React.useEffect(() => {
		setIsBackground(false);
	}, [setIsBackground]);

	switch (type) {
		case 1:
			return <AddGPForm onResponse={onResponse} />;

		case 2:
			return <RemoveGPForm data={data?.type === ProposalType.RemoveGP ? data : null} onResponse={onResponse} />;

		case 3:
			return <TransferGPForm onResponse={onResponse} />;

		case 4:
			return <ChangeGPTransferStatusForm onResponse={onResponse} />;

		case 5:
			return <ChangeGeneralConsensusForm onResponse={onResponse} />;

		case 6:
			return <SendFundsForm onResponse={onResponse} />;

		case 7:
			return <ChangeDAONameForm onResponse={onResponse} />;

		case 8:
			return <CustomProposalForm onResponse={onResponse} />;
		default:
			return null;
	}
}
