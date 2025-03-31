import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Search } from "shared/ui/Search";

const meta = {
  title: "Example/Search",
  component: Search,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onChange: fn() },
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Search text...",
  },
};
