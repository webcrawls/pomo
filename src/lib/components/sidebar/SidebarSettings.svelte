<script lang="ts">
    import {layouts, themes} from "$lib/api/theme";
    import {getContext} from "svelte";

    const app = getContext("app")

    const clearLocalStorage = () => {
        localStorage.clear()

    }
</script>

<section class="settings-section">
    <h1>theme</h1>
    <form>
        <label>Layout</label>
        <select bind:value={$app.layout}>
            {#each Object.values(layouts) as layout}
                <option value={layout.id}>{layout.id}</option>
            {/each}
        </select>
        <label>Theme</label>
        <select bind:value={$app.theme}>
            {#each Object.values(themes) as theme}
                <option value={theme.id}>{theme.id}</option>
            {/each}
        </select>
    </form>
</section>
<section class="settings-section">
    <h1>the bone zone</h1>
    <button on:click|preventDefault={clearLocalStorage}>Clear localStorage (Refreshes page)</button>
</section>
