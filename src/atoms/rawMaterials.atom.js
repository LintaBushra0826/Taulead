import { atom } from "jotai";

export const RawMaterialAtom = atom({
  name: "",
  desc: "",
  unit: "",
  quan: 0,
  expdate: null,
  price: 0,
  totcost: 0,
  itemlimit: 0,
  processRecords: [],
});

export const UpdateRawMaterialAtom = atom(null, (get, set, update) => {
  const value = get(RawMaterialAtom);
  const { processRecords, quanIncrement } = update;

  // Update 'quan' field and 'processRecords' array
  set(RawMaterialAtom, {
    ...value,
    quan: value.quan + quanIncrement,
    processRecords: [...value.processRecords, ...processRecords],
  });
});
