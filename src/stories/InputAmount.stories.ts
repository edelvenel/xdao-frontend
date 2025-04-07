import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { InputNumber } from "shared/ui/InputNumber";

const meta = {
  title: "Example/InputNumber",
  component: InputNumber,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onChange: fn(), onMaxAmount: fn() },
} satisfies Meta<typeof InputNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onUpdate: () => {},
    placeholder: "Enter token amount",
  },
};
