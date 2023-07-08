<script lang="ts">
    import type {TextModel} from "$lib/api";
    import {ignoredEditorKeys} from "$lib/util";
    import {createEventDispatcher} from "svelte";

    export let model: TextModel
    export let editable: boolean = false

    const dispatch = createEventDispatcher()

    const handleKeyDown = (event: KeyboardEvent) => processModelInput(event.key)
    const processModelInput = (input: string) => {
        if (input === "Backspace") {
            model = {
                ...model,
                text: model.text.slice(0, model.text.length - 1)
            }
            dispatch("update", model)
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
        dispatch("update", model)
    }
</script>

<svelte:element this={model.element}
                contenteditable={editable}
                class="text-block"
                on:keydown|preventDefault={handleKeyDown}>{model.text}</svelte:element>
