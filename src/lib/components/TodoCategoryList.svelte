<script lang="ts">
  import { onMount } from "svelte";
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
  }
</script>

<section class="f-col category">
  {#if categorizedTasks.length === 0}
    <span class="f-row gap-s no-items">
      <h4 class="category-title">{readableCategoryName}</h4><span>|</span><p>No tasks in this kat-egory 😺</p>
    </span>
  {:else}
    <h4 class="category-title">{readableCategoryName}</h4>
    <ul 
      class="todo-list list-wrap gap-xxs"
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
      {/each}
    </ul>
  {/if}
</section>

<style>
  .category {
    border-top: dashed 1px var(--neutral-5);
    padding-top: var(--m);
  }

  .no-items {
    opacity: 0.6;
  }
  .category-title {
    text-transform: uppercase;
    font-size: var(--fontsize-body-3);
    font-weight: var(--fontweight-m);
  }

  .todo-list {
    list-style: none;
    padding: 0 0 var(--m);
    border-bottom: solid 1px var(--gray-1);
  }
</style>