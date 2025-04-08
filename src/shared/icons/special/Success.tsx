import { IIconProps } from "shared/types";

export function SuccessIcon({ ...props }: IIconProps) {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="80" height="80" rx="40" fill="#DDF600" />
      <path
        d="M53.3332 30L34.9998 48.3333L26.6665 40"
        stroke="black"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
