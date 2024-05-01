<script lang="ts">
  import { SvelteComponent, createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
  import type { TodoTaskType } from "$lib/types/TodoTask";
	import FilterButtons from "./FilterButtons.svelte";
  import MoreActions from "./MoreActions.svelte";
	import NewTodoFrom from "./NewTodoFrom.svelte";
	import TodosStatus from "./TodosStatus.svelte";
	import TodoCategoryList from "./TodoCategoryList.svelte";

  // Props
  export let todos:TodoTaskType[];

  // Variables
  let currentFilter:string = 'all'; // bound to <FilterButtons>
  let newTodoName:string = '';
  let newTodoId:number;

  const categories:string[] = ['house','body','mind','hobbies','social','misc'];


  // Reactive variables
  $: newTodoId = todos.length ? Math.max(...todos.map( (t) => t.id + 1)) : 1;

  // Component DOM References
  let todosStatus:SvelteComponent;

  // Functions

 

  /* Updates a todo object in the todos array by a matching index */
  function updateTodoItem(todo:TodoTaskType) {
    // Find index of clicked todo task item
    const i = todos.findIndex( t => t.id === todo.id); 

    // Update the 'completed' property with that of the passed parameter 
    todos[i] = {...todos[i], ...todo};  
  }
  
  /* Removes a todo item by filtering it out via its id. */
  function removeTodo(itemToRemove:TodoTaskType) {
    todos = todos.filter( (t) => t.id !== itemToRemove.id );
    todosStatus.focus();
  }

  /* Adds a todo item to the todos array. */
  function addTodoItem(newTodoName:string) {   
    let itemToAdd:TodoTaskType = {
      id: newTodoId,
      name: newTodoName,
      completed: false,
      tag: 'default',
      repeatsWeekly: false,
      timesPerWeek: 1,
      category: 'misc',
    }
    // Add the new TodoTaskType item to the todos array
    todos = [...todos, itemToAdd];
  }

  /* Return a filtered array based on the filter prop */
  // Need to filter each category array since we moved them from a single todo array to a array of categories
  function filterTodoItems(filter:string, arr:TodoTaskType[]): TodoTaskType[] {
    console.log("in filterTodoItems()");
    console.log("filter: " + filter);
    console.log(todos);
    // Update currentFilter
    currentFilter = filter;
    // If filter is undone, return an array with only items that are not completed
    if (filter === 'undone') {
      return arr.filter( (t) => !t.completed );
    }
    // If filter is done, return an array with only items that are completed
    else if (filter === 'done') {
      return arr.filter( (t) => t.completed );
    }
    // Otherwise, return the original, unfiltered array. Includes filter = 'all' case
    else {
      return arr;
    }
  }

  function checkAllTasks(completed:boolean) {
    todos.forEach( (t, i) => {
      todos[i].completed = completed;
    });
  }

  function removeCompletedTasks() {
    // Updated the todo array with only items that are not complete
    todos = todos.filter( (t) => {
      return !t.completed;
    });
  }

  // $: console.log(todos);
</script>


<section class="section-wrap">
  <section class="content-wrap">
    <h1>Task Kat</h1>
    <FilterButtons 
      bind:filter = {currentFilter}
      on:filter={ (e) => {filterTodoItems(e.detail, todos)}}
    />
    <!-- MoreActions -->
    <MoreActions 
      todos={todos}
      on:checkAll={ (e) => {checkAllTasks(e.detail)} }
      on:removeCompleted={removeCompletedTasks}
    />
    <!-- NewTodoForm -->
    <NewTodoFrom 
      autofocus={true}
      on:addTodoTask={ (e) => addTodoItem(e.detail) }
    />
    <!-- Status -->
    <TodosStatus 
      bind:this={todosStatus} 
      todos={todos} />

    <!-- Todo list: for each category, render a categorized todo list -->
    {#each categories as category}
    <!-- Pass the filtered array (result of filteredTodoItems() function) as the todos prop -->
      <TodoCategoryList category={category} todos={ filterTodoItems(currentFilter, todos) } 
        on:remove={(e) => removeTodo(e.detail)}
        on:update={(e) => updateTodoItem(e.detail)}
      />
    {/each}
  </section>
</section>

<style>
  .content-wrap {
    max-width: var(--maxwidth-l);
  }
</style>
