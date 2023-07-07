<script lang="ts">
    import type {ContentBlock} from "$lib/api";
    import {createEventDispatcher} from "svelte";
    import TextBlockView from "$lib/components/block/text/TextBlockView.svelte";
    import TasksBlockView from "$lib/components/block/task/TasksBlockView.svelte";

    const dispatch = createEventDispatcher()

    export let item: ContentBlock
    export let createHook

    $: type = (() => {
        switch (item._type) {
            case "text":
                return TextBlockView
            case "tasks":
                return TasksBlockView
        }
    })()
</script>

<article class="item-layout">
    <aside>
        <button on:click={() => dispatch("delete")}>x</button>
    </aside>
    <main>
        <svelte:component {dispatch} this={type} {item} {createHook} on:update on:create on:delete/>
    </main>
</article>