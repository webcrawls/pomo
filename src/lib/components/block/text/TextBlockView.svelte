<script lang="ts">
    import type {TextBlock} from "$lib/api";
    import TextModelView from "$lib/components/block/text/TextModelView.svelte";
    import {createEventDispatcher} from "svelte";

    export let item: TextBlock

    const dispatch = createEventDispatcher()
    let editing: boolean = true

    // const handleCreate = () => item = {
    //     ...item,
    //     content: [...item.content, {element: "p", text: "hello", style: ""}]
    // }

    const handleUpdate = (index: number, e) => {
        dispatch("update", {
            ...item,
            content: item.content.map((v, i) => i === index ? e.detail : v)
        })
    }
</script>


{#each item.content as model, i}
    <TextModelView {model}
                   editable={editing}
                   on:update={handleUpdate.bind(this, i)}/>
{/each}
