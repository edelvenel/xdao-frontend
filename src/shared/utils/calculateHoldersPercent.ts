import { IDistributionRule } from 'shared/types';

export function calculatePercents(rules: IDistributionRule[]): IDistributionRule[] {
	const totalTokens = rules.reduce((acc, curr) => acc + (curr.tokens === null ? 0 : curr.tokens), 0);
	const calculatedDistributionRules = rules.map((rule) => {
		return {
			...rule,
			percent: ((rule.tokens === null ? 0 : rule.tokens) / (totalTokens === 0 ? 1 : totalTokens)) * 100,
		};
	});
	return calculatedDistributionRules;
}
