<script lang="ts">
    import type {TaskContent} from "$lib/api/item";
    import {createEventDispatcher, getContext} from "svelte";
    import type {ItemStore} from "$lib/stores/page";

    const items: ItemStore = getContext("items")
    const dispatch = createEventDispatcher()

    export let item: TaskContent
    export const focus = () => {
        titleInput.focus()
    }

    $: console.log({task: item})

    let titleInput: HTMLInputElement

    const handleEnter = (event: KeyboardEvent) => {
        if (document.activeElement !== titleInput) return
        if (event.code !== "Enter") return
        items.create("task")
    }

    const handleTitleChange = (event: InputEvent) => {
        dispatch("update", {...item, title: event.target.value})
    }

    const handleCompleteChange = (event: InputEvent) => {
        dispatch("update", {...item, completed: event.target.checked})
    }
</script>

<div class:task-completed={item.completed}>
    <input type="checkbox" checked={item.completed ?? false} on:change={handleCompleteChange}>
    <input type="text" placeholder="no title"
           on:keydown={handleEnter}
           on:change={handleTitleChange}
           bind:this={titleInput}>
</div>

<style>
    .task-completed > input[type="text"] {
        text-decoration: line-through;
    }
</style>