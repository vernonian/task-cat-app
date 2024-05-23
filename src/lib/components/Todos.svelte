<script lang="ts">
  import { SvelteComponent, createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
  import type { TodoTaskType } from "$lib/types/TodoTask";
	import FilterButtons from "./FilterButtons.svelte";
  import MoreActions from "./MoreActions.svelte";
	import NewTodoFrom from "./NewTodoFrom.svelte";
	import TodosStatus from "./TodosStatus.svelte";
	import TodoCategoryList from "./TodoCategoryList.svelte";
	import DashboardHeader from "./DashboardHeader.svelte";
  import CATEGORIES from "$lib/sampleCategories";
	import WeekDates from "./WeekDates.svelte";
	import AboutTaskKat from "./AboutTaskKat.svelte";

  // Props
  export let todos:TodoTaskType[];

  // Variables
  let currentFilter:string = 'all'; // bound to <FilterButtons>

  // Reactive variables
  $: todosLength = todos.length;
  $: console.log("todosLength (Todos): " + todosLength.toString());

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
  function addTodoItem(newTodoTask:TodoTaskType) {   
    let itemToAdd:TodoTaskType = newTodoTask;
    // console.log(itemToAdd);

    // Add the new TodoTaskType item to the todos array
    todos = [...todos, itemToAdd];
  }

  /* Return a filtered array based on the filter prop */
  function filterTodoItems(filter:string, arr:TodoTaskType[]): TodoTaskType[] {
    
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
   
  $: console.log(todos);
</script>


<section class="section-wrap">
  <section class="content-wrap f-col gap-l">

    <div class="main-grid">
      <!-- Col 1 - List actions -->
      <div class="todo-extras">
        <div class="sticky f-col gap-s">
          <!-- NewTodoForm -->
          <NewTodoFrom 
            todosLength={todosLength}
            on:addTodoTask={ (e) => addTodoItem(e.detail) }
          />
  
          <!-- Filters -->
          <FilterButtons 
            bind:filter = {currentFilter}
            on:filter={ (e) => {filterTodoItems(e.detail, todos)}}
          />
  
          <!-- MoreActions -->
          <MoreActions 
            todos={todos}
            on:setAllStatus={ e => checkAllTasks(e.detail) }
          />
        </div>
      </div>        

      <!-- Col 2 - The list -->
      <div class="f-col todo-list">
        <div class="f-col gap-s">
          <h2 class="heading-2">Tasks for <span><WeekDates/></span></h2>
        </div>

         <!-- Status -->
         <TodosStatus 
         bind:this={todosStatus} 
         todos={todos} />

        <!-- Todo list: for each category, render a categorized todo list -->
        {#each CATEGORIES as category}
        <!-- Pass the filtered array (result of filteredTodoItems() function) as the todos prop -->
          <TodoCategoryList category={category} todos={ filterTodoItems(currentFilter, todos) } 
            on:remove={(e) => removeTodo(e.detail)}
            on:update={(e) => updateTodoItem(e.detail)}
          />
        {/each}
      </div>

      <!-- Col 3 - About -->
      <div class="todo-about">
        <AboutTaskKat/>
      </div>
    </div>
  </section>
</section>

<style>
  .content-wrap {
    max-width: var(--mw-page);
    container-type: normal;
  }

  .todo-list { grid-area: list; }
  .todo-extras { grid-area: extras; }
  .todo-about{ grid-area: about; }

  /* Small screen */
  .main-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas: 
      'extras'
      'list'
      'about';
    gap: var(--m);
  }

  /* Mid screen */
  @media screen and (min-width: 768px) {
    .main-grid {
      grid-template-columns: 2fr 1fr;
      grid-template-areas: 
      'list extras'
      'about extras';
      gap: var(--l);
    }

    .sticky {
      position: sticky;
      top: var(--m);
      width: 100%;
    }
  }

  /* Wide screen */
  @media screen and (min-width: 1024px) {
    .main-grid {
      grid-template-columns: 1fr 1.75fr 1fr;
      grid-template-areas: 
      'extras list about';
    }
  }
</style>
