import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Input } from "shared/ui/Input";

const meta = {
  title: "Example/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onChange: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    placeholder: "Select DAO name",
    fieldName: "DAO Name",
  },
};

export const Filled: Story = {
  args: {
    placeholder: "Select DAO name",
    fieldName: "DAO Name",
    value: "Example Dao 1",
  },
};
