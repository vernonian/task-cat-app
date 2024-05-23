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
  function setAllTaskStatus(b:boolean) {
    completed = b;
    dispatch('setAllStatus', completed);
  }
</script>

<section class="more-actions f-col gap-xs">
  <h4 class="body-1">List Actions</h4>
  <div class="f-row gap-xxs">
    <Button 
      id="toggle-all-button"
      type="button"
      usage="default"
      onClick={() => setAllTaskStatus(true)}
      disabled={todos.length === completedTodoTasks}
    >Check All</Button>

    <Button 
      id="reset-all-button"
      type="button"
      usage="default"
      onClick={() => setAllTaskStatus(false)}
      disabled={completedTodoTasks === 0}
    >Reset All Tasks</Button>
  </div>
</section>
