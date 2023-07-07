<script lang="ts">
    import type {AppInfo} from "$lib/api/app";
    import type {Writable} from "svelte/store";
    import SidebarPages from "$lib/components/sidebar/SidebarPages.svelte";
    import SidebarSettings from "$lib/components/sidebar/SidebarSettings.svelte";

    export let app: Writable<AppInfo>

    export let settingsOpen: boolean = false
    $: view = settingsOpen ? SidebarSettings : SidebarPages
</script>

<aside class="sidebar-container">
    <header>
        <h1>pomo.site</h1>
        <button class="icon-button" on:click|preventDefault={() => settingsOpen = !settingsOpen}><img
                src="/gear-solid.svg" alt="settings icon"/></button>
    </header>
    <hr>
    <nav class="sidebar-nav">
        <svelte:component this={view} {app}/>
    </nav>
</aside>