import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from 'shared/ui/ProgressBar';

const meta = {
	title: 'Example/ProgressBar',
	component: ProgressBar,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
	args: {},
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AdditionalNotShown: Story = {
	args: {
		currentPercent: 45,
		totalPercent: 52,
		additionalPercent: 7,
		isAdditionalPercentShown: false,
	},
};

export const AdditionalShown: Story = {
	args: {
		currentPercent: 45,
		totalPercent: 52,
		additionalPercent: 7,
		isAdditionalPercentShown: true,
	},
};

export const AdditionalShownNotFinish: Story = {
	args: {
		currentPercent: 30,
		totalPercent: 52,
		additionalPercent: 10,
		isAdditionalPercentShown: true,
	},
};

export const ZeroCurrent: Story = {
	args: {
		currentPercent: 0,
		totalPercent: 52,
		additionalPercent: 10,
		isAdditionalPercentShown: true,
	},
};

export const ZeroCurrentNotShown: Story = {
	args: {
		currentPercent: 0,
		totalPercent: 52,
		additionalPercent: 10,
		isAdditionalPercentShown: false,
	},
};
