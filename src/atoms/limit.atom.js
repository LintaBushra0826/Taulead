import { atom } from "jotai";

export const LimitAtom = atom({
  itemlimit: 0,
});

export const UpdateLimitAtom = atom(null, (get, set, update) => {
  const value = get(LimitAtom);
  set(LimitAtom, {
    ...value,
    ...update,
  });
});
