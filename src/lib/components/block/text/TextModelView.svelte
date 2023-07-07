<script lang="ts">
    import type {TextModel} from "$lib/api";
    import {ignoredEditorKeys} from "$lib/util";

    export let model: TextModel
    export let editable: boolean = false
    export let dispatch

    const handleKeyDown = (event: KeyboardEvent) => processModelInput(event.key)
    const processModelInput = (input: string) => {
        // ignored keys
        if (input === "Backspace") {
            model = {
                ...model,
                text: model.text.slice(0, model.text.length - 1)
            }
            return
        } else if (input === "Enter") {
            dispatch("create")
            return
        } else if (ignoredEditorKeys.indexOf(input) !== -1) {
            return
        }

        model = {
            ...model,
            text: model.text + input
        }
    }
</script>

<svelte:element class="text-block"
                contenteditable={editable}
                on:click
                on:keydown|preventDefault={handleKeyDown}
                this={model.element}>{model.text}</svelte:element>
