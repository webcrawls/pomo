<script lang="ts">
    import type {ContentBlock, SheetData} from "$lib/api";
    import {addContent, deleteContent, updateContent, updateTitle} from "$lib/api";
    import {defaultTasksBlock, defaultTextBlock} from "$lib/util";
    import BlockWrapper from "$lib/components/block/BlockWrapper.svelte";
    import {createEventDispatcher} from "svelte";

    export let sheet: SheetData

    const dispatch = createEventDispatcher()
    const handleTitleChange = (e: InputEvent) => dispatch("update", updateTitle(sheet, e.target.innerText))
    const handleAddBlock = (block: ContentBlock) => dispatch("update", addContent(sheet, block))
    const handleDeleteBlock = (block: ContentBlock) => dispatch("update", deleteContent(sheet, block))
    const handleUpdateBlock = (block: ContentBlock) => dispatch("update", updateContent(sheet, block))
</script>
<article class="page-container">
    <header class="page-header">
        <h1 class="ellipses" on:input={handleTitleChange}
            contenteditable="true">{sheet._title ?? "unnamed page"}</h1>
    </header>
    <div class="page-items">
        {#if sheet._blocks.length === 0}
            <p>there's nothing here!</p>
            <a href="#" on:click|preventDefault={handleAddBlock.bind(this, defaultTextBlock())}>add some text?</a>
            <a href="#" on:click|preventDefault={handleAddBlock.bind(this, defaultTasksBlock())}>add some tasks?</a>
        {/if}
        {#each sheet._blocks as item, i}
            <BlockWrapper on:delete={handleDeleteBlock} on:update={handleUpdateBlock} {item}/>
        {/each}
    </div>
</article>
