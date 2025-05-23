import css from './styles.module.scss';

export function JettonLoader() {
	return (
		<div className={css.jettonLoader}>
			<div className={css.loader} />
			<div className={css.button} />
		</div>
	);
}
