import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    email: null,
    name: null,
    user_id: null,
    phone: null,
    b_nm: null,
  },
});
