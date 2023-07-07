<script lang="ts">
    import type {ContentBlock} from "$lib/api";
    import {createEventDispatcher} from "svelte";
    import {determineType} from "$lib/components/block/index";

    const dispatch = createEventDispatcher()

    export let item: ContentBlock
    export let createHook

    $: type = determineType(item._type)
</script>

<article class="item-layout">
    <aside>
        <button on:click={() => dispatch("delete")}>x</button>
    </aside>
    <main>
        <svelte:component {dispatch} this={type} {item} {createHook} on:create on:delete on:update/>
    </main>
</article>