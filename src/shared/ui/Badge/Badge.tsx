import cn from 'classnames';
import css from './styles.module.scss';

interface IBadgeProps {
	text: string;
	capitalized?: boolean;
	variant: 'yellow' | 'blue';
}

export function Badge({ text, capitalized = false, variant }: IBadgeProps) {
	return <div className={cn(css.badge, css[variant], capitalized && css.capitalized)}>{text}</div>;
}
