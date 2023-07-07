import TextBlockView from "$lib/components/block/text/TextBlockView.svelte";
import ImageBlockView from "$lib/components/block/image/ImageBlockView.svelte";
import TasksBlockView from "$lib/components/block/task/TasksBlockView.svelte";

export * from './task/TasksBlockView.svelte'
export * from './text/TextBlockView.svelte'
export * from './image/ImageBlockView.svelte'

/**
 * Returns the class reference to a view component based on {@code type}.
 * Currently supported: "text", "image", "tasks", "task"
 * @param type the type ID
 */
export const determineType = (type: string): Object | undefined => {
    if (type === "text") {
        return TextBlockView
    } else if (type === "image") {
        return ImageBlockView
    } else if (type === "tasks" || type === "task") {
        return TasksBlockView
    }

    return undefined
}