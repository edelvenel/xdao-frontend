import { IIconProps } from "shared/types";

export function ErrorIcon({ ...props }: IIconProps) {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="80" height="80" rx="40" fill="#003BB9" />
      <path
        d="M50 30L30 50M30 30L50 50"
        stroke="#F3F3F3"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
