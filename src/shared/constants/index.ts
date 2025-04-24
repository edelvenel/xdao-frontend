import { IOptionWithNote } from "shared/types";

export const API_URL = import.meta.env.VITE_API_URL;
export const TOAST_DURATION = 5000;

export const TOKENS: IOptionWithNote[] = [
  { id: 1, value: "GP", note: "only GP holders can vote" },
  { id: 2, value: "LP" },
  { id: 3, value: "Custom token" },
];

export const VOTING_TYPES: string[] = [
  "One wallet = one vote",
  "Proportional to token amount",
];
