import { atom } from "jotai";

export const rawMaterialAtom = atom({
  name: "",
  desc: "",
  unit: "",
  quan: 0,
  expdate: null,
  price: 0,
  totcost: 0,
  itemlimit: 0,
});

export const UpdateRawMaterialAtom = atom(null, (get, set, update) => {
  const value = get(rawMaterialAtom);
  set(rawMaterialAtom, {
    ...value,
    ...update,
  });
});
