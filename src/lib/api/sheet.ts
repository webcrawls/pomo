import type {ContentBlock} from "$lib/api/content";

/**
 * Interface for objects containing sheet data.
 */
export interface SheetData {
    /**
     * The ID of this sheet.
     */
    _storageUuid?: string
    _id?: string
    _title?: string
    _creationDate?: number
    _blocks?: ContentBlock[]
}

export const addContent = (sheet: SheetData, block: ContentBlock): SheetData => ({
    ...sheet,
    _blocks: [...(sheet?._blocks ?? []), block]
})

export const deleteContent = (sheet: SheetData, block: ContentBlock): SheetData => ({
    ...sheet,
    _blocks: (sheet?._blocks ?? []).filter(item => item._id !== block._id)
})

export const updateTitle = (sheet: SheetData, title: string): SheetData => ({
    ...sheet,
    _title: title
})

export const updateContent = (sheet: SheetData, block: ContentBlock): SheetData => ({
    ...sheet,
    _blocks: (sheet?._blocks ?? []).map(item => block._id === item._id ? block : item)
})