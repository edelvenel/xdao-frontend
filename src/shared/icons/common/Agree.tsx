import { IIconProps } from "shared/types";

export function AgreeIcon({ ...props }: IIconProps) {
  return (
    <svg
      width="21"
      height="16"
      viewBox="0 0 21 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.5 2L7.125 14L1.5 8.54545"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
