import { atom } from "jotai";

export const SubProcessAtom = atom({
  rawMaterial: [],
  humanResource: [],
  subname: "",
  subdesc: "",
  substart: null,
  subduration: 0,
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
