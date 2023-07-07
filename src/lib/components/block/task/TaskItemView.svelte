<script lang="ts">
    import type {TaskItem} from "$lib/api";

    export let task: TaskItem

    const handleTaskToggle = () => {
        task = {
            ...task,
            completed: !task.completed
        }
    }
</script>

<p on:click={handleTaskToggle} class:completed-task={task.completed}> {task.name}</p>

<style>
    .completed-task {
        text-line-through: single;
    }
</style>