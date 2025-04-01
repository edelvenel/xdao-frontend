import { IIconProps } from "shared/types";

export function UserIcon({ ...props }: IIconProps) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.1667 16V14.3333C15.1667 13.4493 14.8155 12.6014 14.1904 11.9763C13.5653 11.3512 12.7174 11 11.8334 11H5.16671C4.28265 11 3.43481 11.3512 2.80968 11.9763C2.18456 12.6014 1.83337 13.4493 1.83337 14.3333V16"
        fill="currentColor"
      />
      <path
        d="M15.1667 16V14.3333C15.1667 13.4493 14.8155 12.6014 14.1904 11.9763C13.5653 11.3512 12.7174 11 11.8334 11H5.16671C4.28265 11 3.43481 11.3512 2.80968 11.9763C2.18456 12.6014 1.83337 13.4493 1.83337 14.3333V16H15.1667Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.50008 7.66667C10.341 7.66667 11.8334 6.17428 11.8334 4.33333C11.8334 2.49238 10.341 1 8.50008 1C6.65913 1 5.16675 2.49238 5.16675 4.33333C5.16675 6.17428 6.65913 7.66667 8.50008 7.66667Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
