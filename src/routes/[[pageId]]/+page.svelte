<script lang="ts">
    import type {SheetData} from "$lib/api";
    import type {AppInfo} from "$lib/api/app";
    import type {Writable} from "svelte/store";
    import {page} from "$app/stores";
    import {sheetStore} from "$lib/stores";
    import {defaultSheet} from "$lib/util";
    import {getContext} from "svelte";
    import SheetView from "$lib/components/SheetView.svelte";

    const app: Writable<AppInfo> = getContext("app")
    let sheet: Writable<SheetData>

    $: pageId = $page.params.pageId ?? "home"
    $: sheet = sheetStore(pageId, defaultSheet(pageId))
</script>

{#if !sheet || !$sheet}
    <div class="page-full">
        <p>there's nothing here!</p>
    </div>
{:else}
    <SheetView {sheet} {pageId}/>
{/if}
