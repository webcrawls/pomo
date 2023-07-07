import type {ContentBlock} from "$lib/api/content";

/**
 * Interface for objects containing the data of a sheet.
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

export type PartialSheetData = Omit<SheetData, "_id" | "_title" | "_creationDate">