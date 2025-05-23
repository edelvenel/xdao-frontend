import css from './styles.module.scss';

export function DAOLoader() {
	return (
		<div className={css.daoLoader}>
			<div className={css.block} />
			<div className={css.block} />
			<div className={css.block} />
			<div className={css.button} />
		</div>
	);
}
