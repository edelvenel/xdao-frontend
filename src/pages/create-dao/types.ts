import { IDistributionRule } from 'shared/types';
import TonWeb from 'tonweb';
import * as yup from 'yup';

export interface IForm {
	name: string;
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
	walletAddress: yup
		.string()
		.required('')
		.test('is-valid-ton-address', 'Invalid wallet address', function (value) {
			if (!value) return true;
			return TonWeb.utils.Address.isValid(value);
		}),
	tokens: yup.number().min(0).required(''),
	percent: yup.number().min(0).max(100).required(''),
});

const requiredWalletAddress = yup
	.string()
	.required('')
	.test('is-valid-ton-address', 'Invalid wallet address', function (value) {
		if (!value) return true;
		return TonWeb.utils.Address.isValid(value);
	});

export function getValidationSchema(tabIdx: number) {
	const commonFields = {
		name: yup.string().min(2, 'DAO name is too short').max(50, 'DAO name is too long').required(''),
		tokenName: yup.string().required(''),
		tokenSymbol: yup.string().required(''),
	};

	switch (tabIdx) {
		case 0: {
			return yup.object().shape({
				...commonFields,
				consensus: yup.number().min(1, 'Consensus must be at least 1').required(''),
				walletAddresses: yup.array().of(requiredWalletAddress).min(1).required(''),
			});
		}
		case 1: {
			return yup.object().shape({
				...commonFields,
				consensusPercent: yup.number().min(0).max(100).required(''),
				distributionRules: yup.array().of(requiredDistributionRule).min(1).required(''),
			});
		}
		default:
			break;
	}
}
