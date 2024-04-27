<script lang="ts">
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import type { CategoryTaskListType } from "$lib/types/CategoryTaskList";
	import type { TodoTaskType } from "$lib/types/TodoTask";
  import TodoTask from "./TodoTask.svelte";

  // Props
  export let todos:TodoTaskType[];
  export let category:string;

  // Variables
  // Array to hold the categorized todo tasks
  let categorizedTasks:TodoTaskType[];
  
  // Capitalize category name for UI purposes
  let readableCategoryName:string = category[0].toUpperCase() + category.substring(1);

  // Functions
  function categorizeTodos() {
    categorizedTasks = todos.filter( t => t.category === category);
  }

  // Mount
  onMount(categorizeTodos);
 
  // If todos changes then rebuild the categorizedTodos array to keep UI in sync with changes to todos
  $: if (todos) {
    categorizeTodos();
    // console.log("TodoCategoryList todos:");
    // console.log(todos)
  }
</script>

<section class="f-col">
  <h4>{readableCategoryName}</h4>
  <ul 
    class="todo-list list-wrap"
    role="list"
    aria-labelledby="list-heading"
  >
    <!-- For each task in category Tasks, render the task -->
    {#each categorizedTasks as todo (todo.id)}
    <li>
      <!-- Allow the remove and update events to bubble up through this component -->
      <TodoTask todo={todo} 
        on:remove
        on:update
      />
    </li>      
    {:else}
      <li>Nothing to do!</li>
  {/each}
  </ul>
</section>

<style>
  .todo-list {
    list-style: none;
    padding: 0px;
  }
</style>