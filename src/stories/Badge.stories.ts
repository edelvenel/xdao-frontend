import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "shared/ui/Badge";

const meta = {
  title: "Example/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Yellow: Story = {
  args: {
    text: "active",
    variant: "yellow",
  },
};

export const Blue: Story = {
  args: {
    text: "pending",
    variant: "blue",
  },
};
