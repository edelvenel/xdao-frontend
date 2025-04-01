import { IIconProps } from "shared/types";

export function FilterIcon({ ...props }: IIconProps) {
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
        d="M3 9.15381H5.58824"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.353 9.15381L25 9.15381"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.853 9.15385C12.853 11.2042 11.3073 12.8077 9.47061 12.8077C7.63388 12.8077 6.08826 11.2042 6.08826 9.15385C6.08826 7.10351 7.63388 5.5 9.47061 5.5C11.3073 5.5 12.853 7.10351 12.853 9.15385Z"
        stroke="currentColor"
      />
      <path
        d="M25 18.8462H22.4118"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.647 18.8462L2.99998 18.8462"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.147 18.8462C15.147 20.8965 16.6927 22.5 18.5294 22.5C20.3661 22.5 21.9117 20.8965 21.9117 18.8462C21.9117 16.7958 20.3661 15.1923 18.5294 15.1923C16.6927 15.1923 15.147 16.7958 15.147 18.8462Z"
        stroke="currentColor"
      />
    </svg>
  );
}
