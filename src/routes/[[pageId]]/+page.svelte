<script lang="ts">
    import type {AppInfo} from "$lib/api/app";
    import type {Writable} from "svelte/store";
    import type {SheetStore} from "$lib/stores";
    import {getContext} from "svelte";
    import SheetView from "$lib/components/SheetView.svelte";
    import DebugContainer from "$lib/components/debug/DebugContainer.svelte";

    const app: Writable<AppInfo> = getContext("app")
    const sheet: SheetStore = getContext("sheet")

    const handleSheetUpdate = (event) => $sheet = event.detail
</script>

{#if !sheet || !$sheet}
    <div class="page-full">
        <p>there's nothing here!</p>
    </div>
{:else}
    <SheetView sheet={$sheet} on:update={handleSheetUpdate}/>
{/if}
<DebugContainer sheet="{$sheet}"/>