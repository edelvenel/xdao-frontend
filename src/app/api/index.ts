import { API_URL } from "shared/constants";
import { Api, HttpClient } from "./codegen";

export const api = new Api(new HttpClient({
  baseUrl: API_URL,
}));
