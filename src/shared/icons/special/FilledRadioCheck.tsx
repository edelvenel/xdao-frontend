import { IIconProps } from "shared/types";

export function FilledRadioCheckIcon({ ...props }: IIconProps) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="32" height="32" rx="16" fill="#DDF600" />
      <path
        d="M22.6668 11L13.5002 20.1667L9.3335 16"
        stroke="#272727"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
