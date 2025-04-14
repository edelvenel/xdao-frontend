import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Collapse } from "shared/ui/Collapse";

const meta = {
  title: "Example/Collapse",
  component: Collapse,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof Collapse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Opened: Story = {
  args: {
    isOpen: true,
    label: "Transaction details",
    children: "Hidden text",
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    label: "Transaction details",
    children: "Hidden text",
  },
};
