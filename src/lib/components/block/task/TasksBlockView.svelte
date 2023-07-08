<script lang="ts">
    import type {TasksBlock} from "$lib/api";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher()
    export let item: TasksBlock
    $: dispatch("update", item)

    const handleTaskKey = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            event.preventDefault()
            item = {
                ...item,
                tasks: [
                    ...item.tasks,
                    {name: "", completed: false}
                ]
            }
        }
    }

    const handleTaskInput = (index: number, event: InputEvent) => {
        const value = event.target.innerText
        item = {
            ...item,
            tasks: item.tasks.map((v, i) => index === i ? {...v, name: value} : v)
        }
    }

    const handleTaskDelete = (index: number) => {
        item = {
            ...item,
            tasks: item.tasks.filter((v, i) => i !== index)
        }

        if (item.tasks.length === 0) {
            dispatch("delete")
        }
    }
</script>

<ul class="task-block">
    {#each item.tasks as task, i}
        <li class="task-item"
            class:task-item-completed={task.completed}
            class:task-item-placeholder={!task?.name}>
            <button on:click={handleTaskDelete.bind(this, i)}>x</button>
            <p on:keydown={handleTaskKey}
               on:input={handleTaskInput.bind(this, i)}
               contenteditable="true">{task?.name ?? ""}</p>
        </li>
    {/each}
</ul>
