import * as yup from 'yup';

export interface IForm {
	name: string;
	description: string;
	votingDuration: number | null;
	walletAddress: string;
	tokenAmount: string;
}

export const initialValues: IForm = {
	name: '',
	description: '',
	votingDuration: null,
	walletAddress: '',
	tokenAmount: '',
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
	walletAddress: yup.string().required('Wallet address is required field'),
	tokenAmount: yup.number().min(0, 'Token amount cannot be negative').required('Token amount is required field'),
});
