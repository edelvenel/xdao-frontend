import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { InputStep } from "shared/ui/InputStep";

const meta = {
  title: "Example/InputStep",
  component: InputStep,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onChange: fn() },
} satisfies Meta<typeof InputStep>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    current: 50,
    renderLabel: (value: number) => {
      return `${value}%`;
    },
  },
};
