import { atom } from "jotai";

export const SubProcessAtom = atom({
  pID: null,
  pName: "", 
  rawMaterial: [],
  humanResource: [],
  subname: "",
  subdesc: "",
  substart: null,
  subend: null,
});

export const UpdateSubHumanResourceAtom = atom(null, (get, set, update) => {
  const value = get(SubProcessAtom);
  set(SubProcessAtom, {
    ...value,
    humanResource: update,
  });
});

export const UpdateSubRawMaterialAtom = atom(null, (get, set, update) => {
  const value = get(SubProcessAtom);
  set(SubProcessAtom, {
    ...value,
    rawMaterial: update,
  });
});
