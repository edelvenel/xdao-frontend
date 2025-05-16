import * as yup from 'yup';

export interface IForm {
	name: string;
	description: string;
	newName: string;
	votingDuration: number | null;
}

export const initialValues: IForm = {
	name: '',
	description: '',
	newName: '',
	votingDuration: null,
};

export const validationSchema = yup.object().shape({
	name: yup.string().min(2, 'Proposal name is too short').max(50, 'Proposal name is too long').required(''),
	description: yup.string(),
	newName: yup.string().required(''),
	votingDuration: yup
		.number()
		.min(1, 'Voting duration must be at least 1 day long')
		.max(36525, 'Voting duration is too long')
		.required(''),
});
