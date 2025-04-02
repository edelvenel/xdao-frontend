import { IIconProps } from "shared/types";

export function EmptyRadioIcon({ ...props }: IIconProps) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="15"
        stroke="#9A9A9A"
        strokeWidth="2"
      />
    </svg>
  );
}
