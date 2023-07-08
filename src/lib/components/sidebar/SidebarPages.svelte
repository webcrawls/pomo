<script lang="ts">
    import {fadeQuick, nextId} from "$lib/util";
    import {page} from "$app/stores";
    import {getContext} from "svelte";
    import type {Writable} from "svelte/store";
    import type {AppInfo} from "$lib/api";

    const app: Writable<AppInfo> = getContext("app")
    const {createPage, removePage} = getContext("controller")
</script>

<ul transition:fadeQuick class="sidebar-pages">
    <li class="sidebar-page button" class:button-active={!$page.params.pageId}><a href="/">🏠 Home</a></li>
    {#each ($app?.pages ?? []) as pageId}
        <li class="sidebar-page button" class:button-active={$page.params.pageId === pageId}>
            <a class="sidebar-page-title ellipses"
               href="/{pageId}">📝 {pageId}</a>
            <a href="#" on:click={removePage.bind(this, pageId) } class="sidebar-page-delete">x</a>
        </li>
    {/each}
    <li><a class="button" href="#" on:click={() => createPage()}>+</a></li>
</ul>
