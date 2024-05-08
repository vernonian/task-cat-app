<script lang="ts">
	import type { TodoTaskType } from "$lib/types/TodoTask";
  import { createEventDispatcher } from "svelte";
  import Button from "$lib/components/Button.svelte";
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

<section class="more-actions f-col gap-xs">
  <h4 class="body-1">List Actions</h4>
  <div class="f-row gap-xxs">
    <Button 
      id="toggle-all-button"
      type="button"
      usage="default"
      onClick={checkAll}
      disabled={todos.length === 0}
    >{completed? 'Check' : 'Uncheck'} All</Button>

    <Button 
      id="remove-completed-button"
      type="button"
      usage="default"
      onClick={removeCompleted}
      disabled={completedTodoTasks === 0}
    >Remove Completed</Button>
  </div>
</section>
