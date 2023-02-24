import { atom } from "recoil";

export const themeSelectAtom = atom({
  key:"themeSelect",
  default: "dark"
})

export const ethBalanceAtom = atom({
  key:"ethBalanceAtom",
  default: "0"
})