import cn from 'classnames';
import { Icon } from 'shared/icons';
import { IDistributionRule } from 'shared/types';
import { Input } from 'shared/ui/Input';
import { InputNumber } from 'shared/ui/InputNumber';
import css from './styles.module.scss';

interface IDistributionRuleProps {
	rule: IDistributionRule;
	variant?: 'error' | 'default';
	onChange: (rule: IDistributionRule) => void;
	onDelete: () => void;
}

export function DistributionRule({ rule, variant = 'default', onChange, onDelete }: IDistributionRuleProps) {
	return (
		<div className={css.distributionRule}>
			<Input
				className={cn(css.item, css.wallet)}
				variant={variant === 'error' && rule.walletAddress === '' ? 'error' : undefined}
				value={rule.walletAddress}
				placeholder="wallet address"
				onChange={(e) => onChange({ ...rule, walletAddress: e.target.value })}
			/>
			<InputNumber
				className={cn(css.item, css.gpTokens)}
				value={rule.tokens ?? ''}
				placeholder="GP tokens"
				variant={variant === 'error' && !rule.tokens ? 'error' : undefined}
				sizeVariant="small"
				onUpdate={(value) => onChange({ ...rule, tokens: Number(value) })}
			/>
			<div className={cn(css.item, css.percent)}>{rule.percent?.toFixed(1)}%</div>
			<div className={cn(css.item, css.cancel)} onClick={onDelete}>
				<Icon.Common.Cancel />
			</div>
		</div>
	);
}
