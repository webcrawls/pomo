import type { ContentBlock } from "$lib/api/content";

/**
 * Interface for objects containing sheet data.
 */
export interface SheetData {
  /**
   * The ID of this sheet.
   */
  _id?: string;
  _title?: string;
  _creationDate?: number;
  _blocks?: ContentBlock[];
}

export const addContent = (
  sheet: SheetData,
  block: ContentBlock,
): SheetData => ({
  ...sheet,
  _blocks: [...(sheet?._blocks ?? []), block],
});

export const deleteContent = (
  sheet: SheetData,
  block: ContentBlock | number | string,
): SheetData => {
  return {
    ...sheet,
    _blocks: (sheet?._blocks ?? []).filter((item, i) => {
      switch (typeof block) {
        case "string":
          return item._id !== block;
        case "number":
          return i !== block;
        default:
          return item !== block;
      }
    }),
  };
};

export const updateTitle = (sheet: SheetData, title: string): SheetData => ({
  ...sheet,
  _title: title,
});

export const updateContent = (
  sheet: SheetData,
  block: ContentBlock,
): SheetData => ({
  ...sheet,
  _blocks: (sheet?._blocks ?? []).map((item) =>
    block._id === item._id ? block : item,
  ),
});
