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
        d="M24.2222 25.5V22.9444C24.2222 21.5889 23.6837 20.2888 22.7252 19.3303C21.7667 18.3718 20.4667 17.8333 19.1111 17.8333H8.88888C7.53333 17.8333 6.2333 18.3718 5.27478 19.3303C4.31626 20.2888 3.77777 21.5889 3.77777 22.9444V25.5"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 12.7222C16.8228 12.7222 19.1111 10.4339 19.1111 7.61112C19.1111 4.78833 16.8228 2.5 14 2.5C11.1772 2.5 8.88889 4.78833 8.88889 7.61112C8.88889 10.4339 11.1772 12.7222 14 12.7222Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
