import { Icon } from 'shared/icons';
import { IconButton } from 'shared/ui/IconButton';
import { Search } from 'shared/ui/Search';
import css from './styles.module.scss';

interface ISearchBlockProps {
	searchText: string;
	placeholder: string;
	isCreateShown?: boolean;
	onChange: (value: string) => void;
	onFilter: () => void;
	onCreate: () => void;
}

export function SearchBlock({
	searchText,
	placeholder,
	isCreateShown = true,
	onChange,
	onFilter,
	onCreate,
}: ISearchBlockProps) {
	return (
		<div className={css.searchBlock}>
			<div className={css.input}>
				<Search value={searchText} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
			</div>
			<IconButton variant="secondary" onClick={onFilter}>
				<Icon.Common.Filter />
			</IconButton>
			{isCreateShown && (
				<IconButton onClick={onCreate}>
					<Icon.Common.Plus />
				</IconButton>
			)}
		</div>
	);
}
