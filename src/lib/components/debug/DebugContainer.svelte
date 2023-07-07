<script lang="ts">
    import {localStore} from "$lib/stores/local";
    import {browser} from "$app/environment";
    import {writable} from "svelte/store";
    import {getContext} from "svelte";

    const debug = browser ? localStore("app:debug", {}) : writable({})

    const app = getContext("app")
    const page = getContext("page")
    const items = getContext("items")

    const toggle = (key: string, value: boolean) => {
        $debug = {...$debug, [key]: value}
    }
</script>

<article id="debug">
    <h1>debug information</h1>
    <form>
        <label>Show App</label><input type="checkbox" checked={$debug['showApp']}
                                      on:input={(event) => toggle('showApp', event.target.checked)}>
        <label>Show Page</label><input type="checkbox" checked={$debug['showPage']}
                                      on:input={(event) => toggle('showPage', event.target.checked)}>
        <label>Show Items</label><input type="checkbox" checked={$debug['showItems']}
                                      on:input={(event) => toggle('showItems', event.target.checked)}>
    </form>
    <h3>$debug</h3>
    <pre><code>{JSON.stringify($debug, null, 4)}</code></pre>
    {#if $debug["showApp"]}
        <h3>app store</h3>
        <pre><code>{JSON.stringify($app, null, 4)}</code></pre>
    {/if}
    {#if $debug["showPage"]}
        <h3>page store</h3>
        <pre><code>{JSON.stringify($page, null, 4)}</code></pre>
    {/if}
    {#if $debug["showItems"]}
        <h3>items store</h3>
        <pre><code>{JSON.stringify($items, null, 4)}</code></pre>
    {/if}
    <button on:click={() => localStorage.clear()}>Clear localStorage</button>
</article>

<style>
    #debug {
        border: 1px solid black;
        color: gray;
        background-color: #d2d2d2;

        position: absolute;
        top: 0;
        right: 0;

        display: flex;
        flex-direction: column;

        padding-inline: 1rem;
        margin: 1rem;

        max-width: 20rem;
    }

    pre {
        background-color: white;
        color: gray;
        border: 1px solid black;
        min-height: 1rem;
        display: flex;
        flex-direction: column;
    }

    code {
        word-wrap: break-word;
    }
</style>