import { SAVE_TOKEN } from "../constants";

export const saveToken = (jwt: string) => {
  return {
    type: SAVE_TOKEN,
    jwt,
  };
};
