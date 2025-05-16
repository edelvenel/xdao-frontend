import * as yup from 'yup';

export interface IForm {
	name: string;
	description: string;
	votingDuration: number | null;
	currentConsensus: number;
	currentConsensusManual: string;
}

export const getInitialValues = (consensus: number): IForm => {
	return {
		name: '',
		description: '',
		votingDuration: null,
		currentConsensus: consensus,
		currentConsensusManual: '',
	};
};

export const getValidationSchema = (consensus: number) => {
	return yup.object().shape({
		name: yup.string().min(2, 'Proposal name is too short').max(50, 'Proposal name is too long').required(''),
		description: yup.string(),
		votingDuration: yup
			.number()
			.min(1, 'Voting duration must be at least 1 day long')
			.max(36525, 'Voting duration is too long')
			.required(''),
		currentConsensus: yup
			.number()
			.min(0, 'Сonsensus cannot be less than 0')
			.notOneOf([consensus], 'Consensus must be different from the current one')
			.required(''),
	});
};
