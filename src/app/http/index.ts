import axios from "axios";
import { API_URL } from "shared/constants";

export const http = axios.create({ baseURL: API_URL });
