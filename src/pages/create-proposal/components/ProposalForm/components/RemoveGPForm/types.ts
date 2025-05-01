import * as yup from 'yup';

export interface IForm {
	name: string;
	description: string;
	gpToRemove: string;
	tokenAmount: string;
	votingDuration: number | null;
}

export const initialValues: IForm = {
	name: '',
	description: '',
	gpToRemove: '',
	tokenAmount: '',
	votingDuration: null,
};

export const validationSchema = yup.object().shape({
	name: yup
		.string()
		.min(2, 'Proposal name is too short')
		.max(50, 'Proposal name is too long')
		.required('Proposal name is required field'),
	description: yup.string(),
	gpToRemove: yup.string().required('Select GP to remove'),
	tokenAmount: yup.number().min(0, 'Token amount cannot be negative').required('Token amount is required field'),
	votingDuration: yup
		.number()
		.min(1, 'Voting duration must be at least 1 day long')
		.max(36525, 'Voting duration is too long')
		.required('Select voting duration'),
});
