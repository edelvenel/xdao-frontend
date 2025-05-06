import { TOKENS, VOTING_TYPES } from 'shared/constants';
import * as yup from 'yup';

export interface IForm {
	name: string;
	description: string;
	votingDuration: number | null;
	newName: string;
	votingType: string;
	selectOptions: string[];
	question: string;
	token: number;
	lpPool: number | null;
	minTokens: number | null;
	tokenAddress: string;
	tokenSymbol: string;
}

export const initialValues: IForm = {
	name: '',
	description: '',
	votingDuration: null,
	newName: '',
	votingType: VOTING_TYPES[0],
	selectOptions: ['', ''],
	question: '',
	token: TOKENS[0].id,
	lpPool: null,
	minTokens: null,
	tokenAddress: '',
	tokenSymbol: '',
};

const requiredString = yup.string().required('Option cannot be empty');

export const getValidationSchema = (tokenId: number) => {
	const commonFields = {
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
		question: yup.string(),
		newName: yup.string(),
		votingType: yup.string().required('Voting type is required field'),
		selectOptions: yup
			.array()
			.of(requiredString)
			.test('unique', 'Only unique options allowed', (value) => (value ? value.length === new Set(value)?.size : true))
			.min(2, 'You must enter at least 2 options')
			.required('Choose select options'),
		token: yup.number().required('Token is required field'),
		minTokens: yup.number().required('Min tokens is required field'),
	};

	switch (tokenId) {
		case 2: {
			return yup.object().shape({ ...commonFields, lpPool: yup.number().required('LP pool is required field') });
		}

		case 3: {
			return yup.object().shape({
				...commonFields,
				tokenAddress: yup.string().required('Token address is required field'),
				tokenSymbol: yup.string().required('Token symbol is required field'),
			});
		}

		default:
			return yup.object().shape({
				...commonFields,
			});
	}
};
