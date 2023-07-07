<script lang="ts">
    import BlockWrapper from "$lib/components/block/BlockWrapper.svelte";
    import {getContext} from "svelte";
    import type {Writable} from "svelte/store";
    import type {AppInfo} from "$lib/api/app";
    import {defaultTasksBlock, defaultTextBlock} from "$lib/util";
    import {goto} from "$app/navigation";
    import type {ContentBlock, SheetData} from "$lib/api";

    export let sheet: Writable<SheetData>

    const app: Writable<AppInfo> = getContext("app")

    const addBlock = (block: ContentBlock) => $sheet = {...$sheet, _blocks: [...($sheet._blocks ?? []), block]}
    const handleBlockUpdate = (evt) => $sheet = {
        ...$sheet,
        _blocks: $sheet._blocks?.map(i => i._id === evt.detail.id ? evt.detail : i)
    }

    const deleteBlock = (block: ContentBlock) => {
        console.log({deleting: block})
        $sheet = {
            ...$sheet,
            _blocks: ($sheet._blocks ?? []).filter(item => item._id !== block._id)
        }
    }

    const handleTitleUpdate = (e: InputEvent) => {
        if (!e.target.innerText) return
        const oldId = $sheet._id
        $sheet = {
            ...$sheet,
            _title: e.target.innerText.replaceAll("\\n", ""),
            _id: e.target.innerText.replaceAll(" ", "-").toLowerCase(),
        }

        goto(`/${$sheet._id}`, {replaceState: true, noScroll: true, keepFocus: true})

        $app = {
            ...$app,
            pages: $app.pages.map(id => id === oldId ? $sheet._id : id)
        }
    }
</script>
<article class="page-container">
    <header class="page-header">
        <h1 class="ellipses" on:input={handleTitleUpdate}
            contenteditable="true">{$sheet._title ?? "unnamed page"}</h1>
    </header>
    <div class="page-items">
        {#if $sheet._blocks.length === 0}
            <p>there's nothing here!</p>
            <a href="#" on:click|preventDefault={() => addBlock(defaultTextBlock())}>add some text?</a>
            <a href="#" on:click|preventDefault={() => addBlock(defaultTasksBlock())}>add some tasks?</a>
        {/if}
        {#each $sheet._blocks as item}
            <BlockWrapper on:update={handleBlockUpdate}
                          on:delete={deleteBlock.bind(this, item)}
                          {item}/>
        {/each}
    </div>
</article>
