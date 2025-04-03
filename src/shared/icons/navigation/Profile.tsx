import { IIconProps } from "shared/types";

export function ProfileIcon({ ...props }: IIconProps) {
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
        d="M25 26.6249V23.8194C25 22.3312 24.4088 20.904 23.3565 19.8517C22.3042 18.7994 20.877 18.2083 19.3889 18.2083H8.16665C6.67849 18.2083 5.25128 18.7994 4.199 19.8517C3.14671 20.904 2.55554 22.3312 2.55554 23.8194V26.6249"
        fill="currentColor"
      />
      <path
        d="M25 26.6249V23.8194C25 22.3312 24.4088 20.904 23.3565 19.8517C22.3042 18.7994 20.877 18.2083 19.3889 18.2083H8.16665C6.67849 18.2083 5.25128 18.7994 4.199 19.8517C3.14671 20.904 2.55554 22.3312 2.55554 23.8194V26.6249H25Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.7777 12.5972C16.8767 12.5972 19.3888 10.085 19.3888 6.98611C19.3888 3.88718 16.8767 1.375 13.7777 1.375C10.6788 1.375 8.16663 3.88718 8.16663 6.98611C8.16663 10.085 10.6788 12.5972 13.7777 12.5972Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
