<script lang="ts">
	import type { TodoTaskType } from "$lib/types/TodoTask";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // Props
  export let todos:TodoTaskType[];

  // Variables
  let completed:boolean = true;

  // Reactive Variables
  $: completedTodoTasks = todos.filter( (t) => t.completed === true ).length;

  // Functions
  const checkAll = () => {
    dispatch('checkAll', completed);
    completed = !completed;
  }

  const removeCompleted = () => {
    dispatch('removeCompleted');
  }
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