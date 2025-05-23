import cn from 'classnames';
import css from './styles.module.scss';

export function DistributionRuleLoader() {
	return (
		<div className={css.distributionRuleLoader}>
			<div className={cn(css.item, css.wallet)} />
			<div className={cn(css.item, css.gpTokens)} />
			<div className={cn(css.item, css.percent)} />
			<div className={cn(css.item, css.link)} />
			<div className={cn(css.item, css.cancel)} />
		</div>
	);
}
