<script lang="ts">
    import type {ContentBlock} from "$lib/api";
    import {createEventDispatcher} from "svelte";
    import {determineType} from "$lib/components/block/index";

    const dispatch = createEventDispatcher()

    export let item: ContentBlock

    $: type = determineType(item._type)
</script>

<article class="item-layout">
    <aside>
        <button on:click={() => dispatch("delete")}>x</button>
    </aside>
    <main>
        <svelte:component this={type} {item} on:create on:delete on:update/>
    </main>
</article>