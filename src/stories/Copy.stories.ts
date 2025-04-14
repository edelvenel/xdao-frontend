import type { Meta, StoryObj } from "@storybook/react";
import { Copy } from "shared/ui/Copy";

const meta = {
  title: "Example/Copy",
  component: Copy,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Copy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CopyButton: Story = {
  args: {
    text: "This text may be copied",
  },
};
