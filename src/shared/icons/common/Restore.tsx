import { IIconProps } from "shared/types";

export function RestoreIcon({ ...props }: IIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M23 4.00001V10M23 10H17M23 10L18.37 5.64001C16.9906 4.25975 15.2 3.3652 13.268 3.09116C11.3359 2.81711 9.36717 3.17843 7.65836 4.12065C5.94954 5.06288 4.59325 6.53496 3.79386 8.31508C2.99448 10.0952 2.79531 12.0869 3.22637 13.9901C3.65743 15.8932 4.69536 17.6047 6.18376 18.8667C7.67216 20.1286 9.53038 20.8726 11.4784 20.9866C13.4265 21.1006 15.3588 20.5783 16.9842 19.4985C18.6096 18.4187 19.84 16.8399 20.49 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
