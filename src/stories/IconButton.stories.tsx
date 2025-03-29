import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Icon } from "shared/icons";
import { IconButton } from "shared/ui/IconButton";

const meta = {
  title: "Example/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text" },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryWithIcon: Story = {
  args: {
    children: <Icon.Navigation.Home />,
  },
};

export const SecondaryWithText: Story = {
  args: {
    children: "+",
    variant: "secondary",
  },
};

export const Disabled: Story = {
  args: {
    children: "+",
    disabled: true,
  },
};
