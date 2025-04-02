import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Dropdown } from "shared/ui/Dropdown";

const testArray: string[] = ["Option 1", "Option 2", "Option 3"];

const meta = {
  title: "Example/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onSelect: fn() },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selected: undefined,
    options: testArray,
    placeholder: "Select...",
  },
};
