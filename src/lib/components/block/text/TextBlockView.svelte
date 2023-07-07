<script lang="ts">
    import type {TextBlock} from "$lib/api";
    import TextModelView from "$lib/components/block/text/TextModelView.svelte";
    import {noop} from "svelte/internal";

    export let item: TextBlock

    let editing: boolean = true

    const handleModelUpdate = (index, event) => updateModel(index, event.detail)
    const handleCreate = () => item = {
        ...item,
        content: [...item.content, {element: "p", text: "hello", style: ""}]
    }

    const updateModel = (index, model) => {
        item = {
            ...item,
            content: item.content.map((m, i) => i === index ? model : m)
        }
    }
</script>


{#each item.content as model, i}
    <TextModelView on:create={handleCreate}
                   on:update={handleModelUpdate.bind(this, i)}
                   on:click={noop}
                   bind:model={item.content[i]} editable={editing}/>
{/each}
