import { IIconProps } from "shared/types";

export function FilledRadioIcon({ ...props }: IIconProps) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="32" height="32" rx="16" fill="#E6FF00" />
    </svg>
  );
}
