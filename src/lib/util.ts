import type { SheetData, TasksBlock, TextBlock } from "$lib/api";
import format from "date-fns/format/index";
import parse from "date-fns/parse/index";
import isValid from "date-fns/isValid/index";
import { fade } from "svelte/transition";

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const stringifyDate = (date: Date): string => {
  return format(date, "M-d-y");
};

export const unstringifyDate = (date?: string): Date | undefined => {
  if (!date) return undefined;
  const parsed = parse(date, "M-d-y", new Date());
  if (!isValid(parsed)) {
    return undefined;
  }
  return parsed;
};

export const nextId = (pages: string[] = []) => {
  const date = stringifyDate(new Date());
  let guessed = date;
  let its = 0;

  while ((pages ?? []).indexOf(guessed) !== -1) {
    guessed = `${date}-${its}`;
    its += 1;
  }

  return guessed;
};

export const defaultSheet = (id: string): SheetData => {
  return {
    _id: id,
    _title: id,
    _blocks: [],
    // todo fix heer vvv
    _storageUuid: String(new Date().getDate()),
    _creationDate: new Date().getDate(),
  };
};

export const defaultTextBlock = (id: string): TextBlock => {
  return {
    _id: String(id ?? new Date().getTime()),
    _type: "text",
    content: [
      {
        text: "",
        element: "p",
        style: "",
      },
    ],
    _children: [],
  };
};

export const defaultTasksBlock = (id: string): TasksBlock => {
  return {
    _id: String(id ?? new Date().getTime()),
    _type: "tasks",
    tasks: [{ name: "new task", completed: false }],
    _children: [],
  };
};

export const fadeQuick = (element: HTMLElement) =>
  fade(element, { duration: 100 });

export const ignoredEditorKeys = [
  "Alt",
  "Shift",
  "Control",
  "ArrowRight",
  "ArrowLeft",
  "ArrowUp",
  "ArrowDown",
  "Clear",
  "Escape",
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "F8",
  "F9",
  "F10",
  "F11",
  "F12",
];
