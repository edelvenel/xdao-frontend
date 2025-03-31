import { IIconProps } from "shared/types";

export function SearchIcon({ ...props }: IIconProps) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.6667 23.3334C18.5578 23.3334 23.3334 18.5578 23.3334 12.6667C23.3334 6.77565 18.5578 2 12.6667 2C6.77565 2 2 6.77565 2 12.6667C2 18.5578 6.77565 23.3334 12.6667 23.3334Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.0002 26L20.2001 20.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
