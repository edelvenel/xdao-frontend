import cn from 'classnames';
import css from './styles.module.scss';
import { ITab } from './types';

interface ITabsProps {
	selectedTabIdx: number;
	tabs: ITab[];
	onSelect: (tabId: number) => void;
}

export function Tabs({ selectedTabIdx, tabs, onSelect }: ITabsProps) {
	return (
		<div className={css.tabs}>
			<div className={css.tabButtonList}>
				{tabs.flatMap((tab, index) => (
					<div
						key={index}
						className={cn(css.tabButton, selectedTabIdx === index && css.selected)}
						onClick={() => onSelect(index)}
					>
						{tab.title}
					</div>
				))}
			</div>
			<div className={css.tabContent}>{tabs[selectedTabIdx].content}</div>
		</div>
	);
}
