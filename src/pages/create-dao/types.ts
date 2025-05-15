import { IDistributionRule } from 'shared/types';
import * as yup from 'yup';

export interface IForm {
	name: string;
	tokenName: string;
	tokenSymbol: string;
	walletAddresses: string[];
	distributionRules: IDistributionRule[];
	consensus: number;
	consensusPercent: number;
	currentConsensusManual: string;
}

export function getInitialValues(userAddress: string | null): IForm {
	return {
		name: '',
		tokenName: '',
		tokenSymbol: '',
		walletAddresses: [userAddress === null ? '' : userAddress, '', ''],
		distributionRules: [
			{ walletAddress: userAddress === null ? '' : userAddress, tokens: null, percent: 0 },
			{ walletAddress: '', tokens: null, percent: 0 },
		],
		consensus: 1,
		consensusPercent: 50,
		currentConsensusManual: '',
	};
}

const requiredDistributionRule = yup.object().shape({
	walletAddress: yup.string().required('Wallet address cannot be empty'),
	tokens: yup.number().min(0).required('Enter tokens'),
	percent: yup.number().min(0).max(100).required('Enter percent'),
});

const requiredString = yup.string().required('Wallet address is required field');

export function getValidationSchema(tabIdx: number) {
	const commonFields = {
		name: yup
			.string()
			.min(2, 'DAO name is too short')
			.max(50, 'DAO name is too long')
			.required('DAO name is required field'),
		tokenName: yup.string().required('DAO token name is required field'),
		tokenSymbol: yup.string().required('DAO token symbol is required field'),
	};

	switch (tabIdx) {
		case 0: {
			return yup.object().shape({
				...commonFields,
				consensus: yup.number().min(1, 'Consensus must be at least 1').required('Select consensus'),
				walletAddresses: yup.array().of(requiredString).min(1).required('Enter at least one wallet address'),
			});
		}
		case 1: {
			return yup.object().shape({
				...commonFields,
				consensusPercent: yup.number().min(0).max(100).required('Consensus percent is required field'),
				distributionRules: yup.array().of(requiredDistributionRule).min(1).required('Distribution rules are required'),
			});
		}
		default:
			break;
	}
}
