import { atom } from "jotai";

export const ExecutedProcessAtom = atom({
  name: "", 
  start: null, 
  end: null,
  duration: 0, 
  humanresource: [], 
  rawmaterial: [], 
});