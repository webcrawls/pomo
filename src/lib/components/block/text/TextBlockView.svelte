<script lang="ts">
    import type {TextBlock, TextModel} from "$lib/api";
    import {createEventDispatcher} from "svelte";
    import {ignoredEditorKeys} from "$lib/util";

    export let item: TextBlock

    $: dispatch("update", item)

    const dispatch = createEventDispatcher()
    const handleKeyDown = (index: number, model: TextModel, event: KeyboardEvent) => processModelInput(index, model, event.key)
    const processModelInput = (index: number, model: TextModel, input: string) => {
        if (input === "Enter") {
            // handle Enter -> create new text elemnet
            dispatch("create")
            return
        } else if (ignoredEditorKeys.indexOf(input) !== -1) {
            // ignore certain special keys
            return
        } else if (input === "Backspace") {
            // handle backspace
            const newModel = {
                ...model,
                text: model.text.slice(0, model.text.length - 1)
            }
            item = {
                ...item,
                content: item.content.map((m, i) => i === index ? newModel : m)
            }
        } else {
            // handle regular input
            const newModel = {
                ...model,
                text: model.text + input
            }

            item = {
                ...item,
                content: item.content.map((m, i) => i === index ? newModel : m)
            }
        }
    }
</script>


{#each item.content as model, i}
    <svelte:element this={model.element}
                    contenteditable="true"
                    class="text-block"
                    on:keydown|preventDefault={handleKeyDown.bind(this, i, model)}>{model.text}</svelte:element>
{/each}
