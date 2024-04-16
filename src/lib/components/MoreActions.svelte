<script lang="ts">
	import type { TodoTaskType } from "$lib/types/TodoTask";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();


  export let todos:TodoTaskType[];

  let completed:boolean = true;

  const checkAll = () => {
    dispatch('checkAll', completed);
    completed = !completed;
  }

  const removeCompleted = () => {
    dispatch('removeCompleted');
  }

  $: completedTodoTasks = todos.filter( (t) => t.completed === true ).length;

  $: console.log(todos.length);

</script>

<section class="more-actions">
  <div>
    <button
      on:click={checkAll}
      class="btn"
      type="button"
      disabled={todos.length === 0}
    >{completed? 'Check' : 'Uncheck'} All</button>
    <button 
    class="btn"
      on:click={removeCompleted}
      type="button"
      disabled={completedTodoTasks === 0}
      >Remove Completed</button>
  </div>
</section>

<style>
.more-actions .btn {
  padding: var(--xs);
}

</style>