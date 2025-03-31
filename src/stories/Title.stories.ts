import type { Meta, StoryObj } from "@storybook/react";
import { Title } from "shared/ui/Title";

const meta = {
  title: "Example/Title",
  component: Title,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    value: "Large Title",
    variant: "large",
  },
};

export const Medium: Story = {
  args: {
    value: "Medium Title",
    variant: "medium",
  },
};
