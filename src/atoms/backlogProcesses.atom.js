import { atom } from "jotai";

export const BackLogProcessAtom = atom({
  rawMaterial: [],
  humanResource: [],
  name: "",
  desc: "",
  start: null,
  end: null,
  newNamw: "",
  status: "",
  duration: "",
  processId:"",
});
