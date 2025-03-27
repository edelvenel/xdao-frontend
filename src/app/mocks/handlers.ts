import { delay, http } from "msw";

export const handlers = [
  http.all("*", async () => {
    await delay(Math.random() * 500 + 500);
  }),
];
