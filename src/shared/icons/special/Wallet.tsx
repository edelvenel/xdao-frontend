import { IIconProps } from 'shared/types';

export function WalletIcon({ ...props }: IIconProps) {
	return (
		<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<rect width="44" height="44" rx="22" fill="#262525" />
			<path
				d="M29 13C31.2091 13 33 14.7909 33 17V27C33 29.2091 31.2091 31 29 31H14C11.7909 31 10 29.2091 10 27V17C10 14.7909 11.7909 13 14 13H29ZM27.5 19.5C26.1193 19.5 25 20.6193 25 22C25 23.3807 26.1193 24.5 27.5 24.5C28.8807 24.5 30 23.3807 30 22C30 20.6193 28.8807 19.5 27.5 19.5Z"
				fill="#D9D9D9"
			/>
		</svg>
	);
}
