import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { RadioToken } from 'shared/ui/RadioToken';

const meta = {
	title: 'Example/RadioToken',
	component: RadioToken,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
	args: { onSelect: fn() },
} satisfies Meta<typeof RadioToken>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		selected: {
			address: '0',
			name: 'TON',
			imgUrl: 'https://cryptologos.cc/logos/toncoin-ton-logo.png',
			amount: 125,
			rate: 10.0987,
			decimals: 9,
		},
		options: [
			{
				address: '0',
				name: 'TON',
				imgUrl: 'https://cryptologos.cc/logos/toncoin-ton-logo.png',
				amount: 125,
				rate: 10.0987,
				decimals: 9,
			},
			{
				address: '1',
				name: 'BTC',
				imgUrl: 'https://cryptologos.cc/logos/toncoin-ton-logo.png',
				amount: 59,
				rate: 3.0953,
				decimals: 9,
			},
			{
				address: '2',
				name: 'USDT',
				imgUrl: 'https://cryptologos.cc/logos/toncoin-ton-logo.png',
				amount: 12,
				rate: 8.362,
				decimals: 9,
			},
		],
	},
};
