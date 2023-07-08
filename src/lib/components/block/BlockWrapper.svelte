<script lang="ts">
    import type {ContentBlock} from "$lib/api";
    import {createEventDispatcher} from "svelte";
    import {determineType} from "$lib/components/block/index";

    const dispatch = createEventDispatcher()

    export let item: ContentBlock

    $: type = item ? determineType(item._type) : null
</script>

<article class="item-layout">
    <aside>
        <button on:click={() => dispatch("delete")}>x</button>
    </aside>
    <main>
        {#if !type}
            <p>no component - todo better style here</p>
        {:else}
            <svelte:component this={type} {item} on:create on:delete on:update/>
        {/if}
    </main>
</article>