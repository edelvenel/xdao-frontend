import { TOKENS } from 'app/mocks/constants';
import { IDao, IToken } from 'shared/types';
import * as yup from 'yup';

export interface IForm {
	name: string;
	description: string;
	votingDuration: number | null;
	fromDAO: IDao | null;
	recipientAddress: string;
	token: IToken;
	tokenAmount: string;
}

export const getInitialValues = (dao: IDao): IForm => {
	return {
		name: '',
		description: '',
		votingDuration: null,
		fromDAO: dao,
		recipientAddress: '',
		token: TOKENS[0], //TODO: replace with real tokens
		tokenAmount: '',
	};
};

export const validationSchema = yup.object().shape({
	name: yup
		.string()
		.min(2, 'Proposal name is too short')
		.max(50, 'Proposal name is too long')
		.required('Proposal name is required field'),
	description: yup.string(),
	votingDuration: yup
		.number()
		.min(1, 'Voting duration must be at least 1 day long')
		.max(36525, 'Voting duration is too long')
		.required('Select voting duration'),
	fromDAO: yup.object().required('From DAO is required field'),
	recipientAddress: yup.string().required('Recipient address is required field'),
	token: yup.object().required('Token is required field'),
	tokenAmount: yup.number().min(0, 'Token amount cannot be negative').required('Token amount is required field'),
});
