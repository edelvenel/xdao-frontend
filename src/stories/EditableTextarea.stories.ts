import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { EditableTextarea } from 'shared/ui/EditableTextarea';

const meta = {
	title: 'Example/EditableTextarea',
	component: EditableTextarea,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
	args: { onSave: fn(), onInput: fn(), onCancel: fn() },
} satisfies Meta<typeof EditableTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EditMode: Story = {
	args: {
		value: 'Editable text',
	},
};

export const ReadMode: Story = {
	args: {
		value: 'Not editable text',
	},
};
