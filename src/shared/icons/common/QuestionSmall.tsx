import { IIconProps } from "shared/types";

export function QuestionSmallIcon({ ...props }: IIconProps) {
  return (
    <svg
      width="8"
      height="10"
      viewBox="0 0 8 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.81836 2.71226C1.99787 2.20196 2.35219 1.77166 2.81856 1.49757C3.28494 1.22348 3.83326 1.12329 4.36643 1.21474C4.8996 1.30619 5.38319 1.58339 5.73156 1.99723C6.07994 2.41107 6.27061 2.93485 6.2698 3.4758C6.2698 5.00288 3.97918 5.76642 3.97918 5.76642"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.04004 8.82056H4.04804"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
