<script lang="ts">
    import type {ContentBlock} from "$lib/api";
    import {createEventDispatcher} from "svelte";
    import {determineType} from "$lib/components/block/index";

    const dispatch = createEventDispatcher()

    export let item: ContentBlock

    $: type = item ? determineType(item._type) : null
</script>

<article class="item-layout">
    <header class="item-header">
        <p>{item._id}</p>
    </header>
    <div class="item-content">
        <aside class="item-aside">
            <button class="item-button" on:click={() => dispatch("delete")}>x</button>
        </aside>
        <main class="item-main">
            {#if !type}
                <p>no component - todo better style here</p>
            {:else}
                <svelte:component this={type} {item} on:create on:delete on:update/>
            {/if}
        </main>
    </div>
</article>