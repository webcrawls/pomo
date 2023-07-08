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
    const handleDeleteBlock = (id: string) => dispatch("update", deleteContent(sheet, id))
    const handleUpdateBlock = (e: CustomEvent<ContentBlock>) => dispatch("update", updateContent(sheet, e.detail))
</script>
<article class="page-container">
    <header class="page-header">
        <h1 class="ellipses" on:input={handleTitleChange}
            contenteditable="true">{sheet._title ?? "unnamed page"}</h1>
        <nav class="page-nav">
            <a href="#" on:click|preventDefault={() => handleAddBlock(defaultTextBlock())}>+ text</a>
            <a href="#" on:click|preventDefault={() => handleAddBlock(defaultTasksBlock())}>+ task</a>
            <div class="spacer"/>
            <a href="#">debug</a>
        </nav>
    </header>
    <div class="page-items">
        {#if sheet._blocks.length === 0}
            <p>there's nothing here!</p>
        {/if}
        {#each sheet._blocks as item, i}
            <BlockWrapper on:delete={handleDeleteBlock.bind(this, item._id)} on:update={handleUpdateBlock} {i} {item}/>
        {/each}
    </div>
</article>
