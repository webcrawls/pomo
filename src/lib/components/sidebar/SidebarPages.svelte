<script lang="ts">
    import {page} from "$app/stores";
    import {nextId} from "$lib/util.js";
    import type {Writable} from "svelte/store";
    import type {AppInfo} from "$lib/api/app";
    import {fadeQuick} from "$lib/util.js";

    export let app: Writable<AppInfo>

    const addPage = () => {
        $app = {
            ...$app, pages: [...($app?.pages ?? []), nextId($app.pages)]
        }
    }

    const removePage = (id: string) => {
        $app = {
            ...$app,
            pages: $app.pages.filter(page => page !== id),
        }
    }

</script>
<ul transition:fadeQuick class="sidebar-pages">
    <li class="sidebar-page button"><a href="/" class:button-active={!$page.params.pageId}>🏠 Home</a></li>
    {#each ($app?.pages ?? []) as pageId}
        <li class="sidebar-page button">
            <a class:button-active={$page.params.pageId === pageId}
               class="sidebar-page-title ellipses"
               href="/{pageId}">📝 {pageId}</a>
            <a href="#" on:click={removePage.bind(this, pageId) } class="sidebar-page-delete">x</a>
        </li>
    {/each}
    <li><a class="button" href="#" on:click={addPage}>+</a></li>
</ul>
