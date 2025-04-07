import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Radio } from "shared/ui/Radio";

const meta = {
  title: "Example/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onSelect: fn(), renderLabel: fn() },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    selected: { id: 0, value: "Option 1" },
    options: [
      { id: 0, value: "Option 1" },
      { id: 1, value: "Option 2" },
      { id: 2, value: "Option 3" },
    ],
  },
};
