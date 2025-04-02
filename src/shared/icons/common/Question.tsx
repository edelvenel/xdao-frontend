import { IIconProps } from "shared/types";

export function QuestionIcon({ ...props }: IIconProps) {
  return (
    <svg
      width="9"
      height="15"
      viewBox="0 0 9 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.06873 3.97133C1.34547 3.18462 1.89172 2.52124 2.61071 2.09869C3.3297 1.67613 4.17504 1.52167 4.997 1.66265C5.81896 1.80364 6.56451 2.23098 7.10158 2.86899C7.63866 3.507 7.93261 4.31449 7.93136 5.14846C7.93136 7.50271 4.39999 8.67983 4.39999 8.67983"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.49414 13.3882H4.50648"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
