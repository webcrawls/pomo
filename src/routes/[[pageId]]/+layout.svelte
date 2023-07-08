<script lang="ts">
    import Sidebar from "$lib/components/sidebar/Sidebar.svelte";
    import {browser} from "$app/environment";
    import {type Writable, writable} from "svelte/store";
    import {localStore, type SheetStore, sheetStore} from "$lib/stores";
    import {setContext} from "svelte";
    import {layouts, themes} from "$lib/api/theme";
    import CommandBar from "$lib/components/CommandBar.svelte";
    import {page} from "$app/stores";
    import {defaultSheet, nextId} from "$lib/util";
    import {goto} from "$app/navigation";
    import type {AppInfo} from "$lib/api";

    const app: Writable<AppInfo> = browser ? localStore({
        key: "pomo:app", defaultValue: {pages: []}
    }) : writable({pages: []})
    const sheet: SheetStore = sheetStore()

    setContext("app", app)
    setContext("sheet", sheet)

    // throw a dumb glue object into context to make certain tasks easier
    setContext("controller", {
        createPage: () => {
            let id = nextId($app.pages ?? [])
            console.log({generated: id})
            sheet.changePage(id, defaultSheet(id))
            $app = {
                ...$app, pages: [...($app?.pages ?? []), id]
            }
        },
        removePage: (id: string) => {
            // Remove reference to page ID from app state
            $app = {
                ...$app,
                pages: $app.pages.filter(page => page !== id),
            }

            // Navigate off removal target if necessary
            if ($page.params.pageId === id) {
                goto('/', {replaceState: false, invalidateAll: true})
            }

            // Remove page from storage
            if (browser) localStorage.removeItem("pomo:sheet:" + id)
        }
    })

    $: sheet.changePage($page.params.pageId)
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
