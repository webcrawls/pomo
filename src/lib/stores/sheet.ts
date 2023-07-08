import type { Writable } from "svelte/store";
import type { SheetData } from "$lib/api";
import { localStore } from "$lib/stores/local";

export interface SheetStore extends Writable<SheetData> {
  changePage: (id: string, defaultValue?: SheetData) => void;
}

/**
 * Constructs a {@code SheetStore}.
 *
 * @param storageId the storage ID of the target store
 * @param initial the initial sheet value
 */
export const sheetStore = (
  storageId?: string,
  initial?: SheetData,
): SheetStore => {
  const { set, update, subscribe, target } = localStore<SheetData>();

  // @ts-ignore for now but todo :D
  let _storageId: string = storageId;

  const changePage = (newStorageId: string, df?: SheetData) => {
    _storageId = newStorageId;
    target({
      key: "pomo:sheet:" + _storageId,
      defaultValue: df,
    });
  };

  // If a storageId is present, update the localStore's target
  if (_storageId) {
    target({ key: "pomo:sheet:" + _storageId });
  }

  // subscribe((sheet) => console.log({ sheet }));

  return {
    set,
    update,
    subscribe,
    changePage,
  };
};
