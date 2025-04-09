import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { TOAST_DURATION } from "shared/constants";

import { http } from "app/http";
import { ILoginPayload } from "./payloads";
import { ILoginResponse } from "./responses";
export const login = async (
  payload: ILoginPayload
): Promise<ILoginResponse | undefined> => {
  try {
    const response = await http.post("/auth", payload);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      return undefined;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status !== 422) {
        toast.error(error.response?.data.error ?? error.message, {
          duration: TOAST_DURATION,
        });
        throw error;
      } else {
        toast.error(error.response?.data.error ?? "", {
          duration: TOAST_DURATION,
        });
      }
    }
  }
};

export default { login };
