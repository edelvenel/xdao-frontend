import { delay, http, HttpResponse } from "msw";
import { API_URL } from "shared/constants";

export const handlers = [
  http.all("*", async () => {
    await delay(Math.random() * 500 + 500);
  }),

  http.post(`${API_URL}/auth`, async () => {
    await delay(Math.random() * 500 + 1000);
    return HttpResponse.json({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpva",
    });
  }),

  http.get(`${API_URL}/user/me`, () => {
    return HttpResponse.json({
      id: "3234214",
      walletAddress: "1111",
      firstName: "Alex",
      lastName: null,
      languageCode: "ru",
      username: "str232l",
      isPremium: true,
      addedToAttachmentMenu: false,
      allowsWriteToPm: true,
      photoUrl: null,
      isBot: false,
    });
  }),
];
