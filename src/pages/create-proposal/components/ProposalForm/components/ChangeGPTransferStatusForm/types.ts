import * as yup from 'yup';

export interface IForm {
	name: string;
	description: string;
	votingDuration: number | null;
	newStatus: string | null;
}

export const initialValues: IForm = {
	name: '',
	description: '',
	votingDuration: null,
	newStatus: null,
};

export const getValidationSchema = (status: string) => {
	return yup.object().shape({
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
		newStatus: yup
			.string()
			.notOneOf([status], 'New status must be different from the current one')
			.required('New status is required field'),
	});
};
