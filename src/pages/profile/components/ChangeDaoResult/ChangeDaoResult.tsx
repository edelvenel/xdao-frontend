import { Icon } from 'shared/icons';
import { Button } from 'shared/ui/Button';
import { Title } from 'shared/ui/Title';
import css from './styles.module.scss';

interface IChangeDaoResultProps {
	success: boolean;
	onDone: () => void;
	onRetry: () => void;
}

export function ChangeDaoResult({ success, onDone, onRetry }: IChangeDaoResultProps) {
	if (success) {
		return (
			<div className={css.changeDaoResult}>
				<div className={css.content}>
					<div className={css.icon}>
						<Icon.Special.Success />
					</div>
					<Title variant={'large'} value="DAO changed successfully" />
					<div className={css.text}>You will now claim your $DAO tokens </div>
				</div>
				<div className={css.button}>
					<Button variant="accent" onClick={onDone}>
						Done
					</Button>
				</div>
			</div>
		);
	} else {
		return (
			<div className={css.changeDaoResult}>
				<div className={css.content}>
					<div className={css.icon}>
						<Icon.Special.Error />
					</div>
					<Title variant={'large'} value="DAO change failed" />
					<div className={css.text}>Something went wrong while changing your DAO. Please try again</div>
				</div>
				<div className={css.button}>
					<Button onClick={onRetry}>Retry</Button>
				</div>
			</div>
		);
	}
}
