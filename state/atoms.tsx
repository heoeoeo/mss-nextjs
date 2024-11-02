import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    b_nm: null,
  },
});
