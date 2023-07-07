<script lang="ts">
    import type {AppInfo} from "$lib/api/app";
    import type {Writable} from "svelte/store";
    import {page} from "$app/stores";
    import {sheetStore} from "$lib/stores";
    import {defaultSheet} from "$lib/util";
    import {getContext} from "svelte";
    import SheetView from "$lib/components/SheetView.svelte";

    const app: Writable<AppInfo> = getContext("app")
    $: sheet = sheetStore($page.params.pageId, defaultSheet($page.params.pageId))

    const handleSheetUpdate = (event) => {
        $sheet = event.detail
    }
</script>

{#if !sheet || !$sheet}
    <div class="page-full">
        <p>there's nothing here!</p>
    </div>
{:else}
    <SheetView sheet={$sheet} pageId={$page.params.pageId}
               on:update={handleSheetUpdate}/>
{/if}
