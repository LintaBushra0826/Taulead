import { atom } from "jotai";

export const ProcessAtom = atom({
  rawMaterial: [],
  humanResource: [],
  name: "",
  desc: "",
  start: null,
  duration: 0,
});

export const UpdateHumanResourceAtom = atom(null, (get, set, update) => {
  const value = get(ProcessAtom);
  set(ProcessAtom, {
    ...value,
    humanResource: update,
  });
});

export const UpdateRawMaterialAtom = atom(null, (get, set, update) => {
  const value = get(ProcessAtom);
  set(ProcessAtom, {
    ...value,
    rawMaterial: update,
  });
});
