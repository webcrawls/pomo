<script lang="ts">
    import Sidebar from "$lib/components/sidebar/Sidebar.svelte";
    import {browser} from "$app/environment";
    import {writable} from "svelte/store";
    import {localStore} from "$lib/stores";
    import {setContext} from "svelte";
    import {layouts, themes} from "$lib/api/theme";
    import CommandBar from "$lib/components/CommandBar.svelte";

    const app = browser ? localStore("pomo:app", {pages: []}) : writable({pages: []})

    setContext("app", app)

    $: layout = layouts[$app?.layout ?? 'default']
    $: theme = themes[$app?.theme ?? 'default']
</script>

<svelte:head>
    <link rel="stylesheet" href="/css{layout.path}"/>
    <link rel="stylesheet" href="/css{theme.path}"/>
</svelte:head>

<main class="content-layout">
    <Sidebar {app}/>
    <slot/>
</main>
<CommandBar/>
