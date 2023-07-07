import type {Writable} from "svelte/store";
import type {ContentBlock, PartialContentBlock, SheetData} from "$lib/api";
import {localStore} from "$lib/stores/local";

export interface SheetStore extends Writable<SheetData> {
    addBlock: (block: PartialContentBlock) => void;
    deleteBlock: (block: ContentBlock) => void;
    setBlock: (index: number, item: ContentBlock) => void;
}

export const sheetStore = (id: string, initial: SheetData): SheetStore => {
    const {set, update, subscribe} = localStore<SheetData>(
        "pomo:sheet:" + id,
        initial,
    );

    const addBlock = (block: PartialContentBlock) =>
        update((data) => ({
            ...data,
            _blocks: [
                ...(data?._blocks ?? []),
                {...block, _id: String(new Date().getTime())},
            ],
        }));

    const deleteBlock = (block: ContentBlock) =>
        update((data) => ({
            ...data,
            _blocks: (data?._blocks ?? []).filter((b) => b._id !== block._id),
        }));

    const setBlock = (index: number, content: ContentBlock): void =>
        update((data) => ({
            ...data,
            _blocks: (data?._blocks ?? []).map((b, i) => (i === index ? content : b)),
        }));

    subscribe(console.log);

    return {set, update, subscribe, addBlock, deleteBlock, setBlock};
};
