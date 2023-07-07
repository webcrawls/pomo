<script lang="ts">
    import type {TasksBlock} from "$lib/api";
    import TaskItemView from "$lib/components/block/task/TaskItemView.svelte";

    export let item: TasksBlock
</script>

{#each item.tasks as task, i}
    <TaskItemView bind:task={item.tasks[i]}/>
{/each}