<script lang="ts">
    import type {ImageContent} from "$lib/api/item";
    import {createEventDispatcher, getContext} from "svelte";
    import type {ItemStore} from "$lib/stores/page";

    const items: ItemStore = getContext("items")
    const dispatch = createEventDispatcher()

    export let item: ImageContent
    export const focus = () => {
        urlInput.focus()
    }

    let urlInput: HTMLInputElement

    const setUrl = () => {
        dispatch("update", {...item, url: urlInput.value})
    }
</script>

{#if !item.url}
    <input type="text" bind:this={urlInput}>
    <button on:click={setUrl}>set URL</button>
{:else}
    <img src="{item.url}">
{/if}

<!--<div class:task-completed={content.completed}>-->
<!--    <input type="checkbox" on:change={handleCompleteChange}>-->
<!--    <input type="text" placeholder="no title"-->
<!--           on:keydown={handleEnter}-->
<!--           on:change={handleTitleChange}-->
<!--           bind:this={titleInput}>-->
<!--</div>-->

<style>
    .task-completed > input[type="text"] {
        text-decoration: line-through;
    }
</style>