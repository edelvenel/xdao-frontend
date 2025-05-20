import TonWeb from 'tonweb';
import * as yup from 'yup';

export interface IForm {
	name: string;
	description: string;
	votingDuration: number | null;
	fromWalletAddress: string;
	toWalletAddress: string;
	tokenAmount: string;
}

export const initialValues: IForm = {
	name: '',
	description: '',
	votingDuration: null,
	fromWalletAddress: '',
	toWalletAddress: '',
	tokenAmount: '',
};

export const validationSchema = yup.object().shape({
	name: yup.string().min(2, 'Proposal name is too short').max(50, 'Proposal name is too long').required(''),
	description: yup.string(),
	votingDuration: yup
		.number()
		.min(1, 'Voting duration must be at least 1 day long')
		.max(36525, 'Voting duration is too long')
		.required(''),
	fromWalletAddress: yup
		.string()
		.required('')
		.test('is-valid-ton-address', 'Invalid wallet address', function (value) {
			if (!value) return true;
			return TonWeb.utils.Address.isValid(value);
		}),
	toWalletAddress: yup
		.string()
		.required('')
		.test('is-valid-ton-address', 'Invalid wallet address', function (value) {
			if (!value) return true;
			return TonWeb.utils.Address.isValid(value);
		}),
	tokenAmount: yup.number().min(0, 'Token amount cannot be negative').required(''),
});
