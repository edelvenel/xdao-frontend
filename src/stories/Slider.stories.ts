import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Slider } from "shared/ui/Slider";

const meta = {
  title: "Example/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onDone: fn(() => console.log("Done")) },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SliderEnabled: Story = {
  args: {},
};

export const SliderDisabled: Story = {
  args: { disabled: true },
};
