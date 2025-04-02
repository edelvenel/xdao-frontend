import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "shared/ui/Radio";

const meta = {
  title: "Example/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    selectedIdx: 0,
    options: ["Option 1", "Option 2", "Option 3"],
    onSelect: (idx) => console.log(idx),
  },
};
