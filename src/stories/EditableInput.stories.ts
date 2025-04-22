import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { EditableInput } from "shared/ui/EditableInput";

const meta = {
  title: "Example/EditableInput",
  component: EditableInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onSave: fn() },
} satisfies Meta<typeof EditableInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EditMode: Story = {
  args: {
    value: "Editable text",
  },
};

export const ReadMode: Story = {
  args: {
    value: "Not editable text",
  },
};
