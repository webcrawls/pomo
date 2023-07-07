<script lang="ts">
    import {createEventDispatcher, onDestroy} from "svelte";

    export let id: string
    export let type: string

    let deletePending: boolean = false
    let timeoutNumber: number | undefined = undefined

    const dispatch = createEventDispatcher()

    const handleDelete = () => {
        if (!deletePending) {
            deletePending = true
            timeoutDelete()
            return
        }

        if (timeoutNumber) clearTimeout(timeoutNumber)
        deletePending = false
        dispatch("delete")
    }

    const timeoutDelete = () => {
        timeoutNumber = setTimeout(() => deletePending = false, 1500)
    }

    onDestroy(() => {
        if (timeoutNumber) {
            clearTimeout(timeoutNumber)
        }
    })
</script>

<nav class="item-control">
    <button class="item-delete" on:click={handleDelete}>x</button>
    {#if deletePending}
        <p class="text-error">Are you sure?</p>
        <p class="text-subtitle">(click again)</p>
    {:else}
        <p>{type}</p>
    {/if}
</nav>


<style>
    .item-control {
        display: flex;
        flex-direction: row;
        column-gap: 0.45rem;
    }
</style>