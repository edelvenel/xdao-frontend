import { IIconProps } from "shared/types";

export function QuestionTinyIcon({ ...props }: IIconProps) {
  return (
    <svg
      width="5"
      height="8"
      viewBox="0 0 5 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.54541 2.47489C0.665084 2.13469 0.901298 1.84782 1.21221 1.6651C1.52313 1.48237 1.88868 1.41557 2.24412 1.47654C2.59957 1.53751 2.92196 1.72231 3.15421 1.9982C3.38646 2.2741 3.51357 2.62328 3.51304 2.98392C3.51304 4.00197 1.98596 4.511 1.98596 4.511"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.02661 6.54706H2.03195"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
