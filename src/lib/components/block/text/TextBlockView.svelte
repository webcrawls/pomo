<script lang="ts">
    import type {TextBlock} from "$lib/api";
    import TextModelView from "$lib/components/block/text/TextModelView.svelte";

    export let dispatch
    export let item: TextBlock

    let editing: boolean = true

    const handleCreate = () => item = {
        ...item,
        content: [...item.content, {element: "p", text: "hello", style: ""}]
    }
</script>


{#each item.content as model, i}
    <TextModelView on:create={handleCreate}
                   bind:model={item.content[i]}
                   editable={editing}/>
{/each}
