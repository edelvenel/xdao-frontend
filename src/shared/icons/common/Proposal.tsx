import { IIconProps } from "shared/types";

export function ProposalIcon({ ...props }: IIconProps) {
  return (
    <svg
      width="33"
      height="36"
      viewBox="0 0 33 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M32 6C32 3.23857 29.7614 1 27 1H6C3.23858 1 1 3.23858 1 6V24.2C1 26.4091 2.79086 28.2 5 28.2H9.61111V35L16.5 28.2H25.1111H26C29.3137 28.2 32 25.5137 32 22.2V6Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
