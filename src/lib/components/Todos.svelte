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

  function removeCompletedTasks() {
    // Updated the todo array with only items that are not complete
    todos = todos.filter( (t) => {
      return !t.completed;
    });
  }

  // $: console.log(todos);
</script>


<section class="section-wrap">
  <section class="content-wrap f-col gap-l">
    <div class="f-col gap-s">
      <h1 class="heading-4">This Week's Tasks</h1>
      <p>Done or undone, these tasks don’t sum up my self-worth 😸!</p>
    </div>

    <div class="main-grid">
      <!-- Col 1 -->
      <div class="f-col todo-list">

        <!-- NewTodoForm -->
        <NewTodoFrom 
          autofocus={true}
          on:addTodoTask={ (e) => addTodoItem(e.detail) }
        />
        
        <!-- Todo list: for each category, render a categorized todo list -->
        {#each categories as category}
        <!-- Pass the filtered array (result of filteredTodoItems() function) as the todos prop -->
          <TodoCategoryList category={category} todos={ filterTodoItems(currentFilter, todos) } 
            on:remove={(e) => removeTodo(e.detail)}
            on:update={(e) => updateTodoItem(e.detail)}
          />
        {/each}
      </div>

      <!-- Col 2 -->
      <div class="f-col todo-extras">
        <div class="f-col gap-s">
          <h2 class="heading-4">WEEK DATE RANGE</h2>
          <p>Done or undone, these tasks don’t sum up my self-worth 😸!</p>
        </div>

        <!-- Status -->
        <TodosStatus 
          bind:this={todosStatus} 
          todos={todos} />

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
      </div>

      <!-- Col 3 -->
      <div class="f-col gap-s todo-about">
        <pre class="heading-3">Mrow!</pre>      
        
        <details class="dropdown">
          <summary class="subheading-2">About Task Kat</summary>
          <div class="f-col details-content">
            <p>Add a task by giving it an actionable or identifiable name.</p>
            <p>You can give it optional organizational labels:</p>
            <ul class="list-wrap">
              <li>a target day of completion</li>
              <li>a number of times you plan to do the task</li>
              <li>a task category type</li>
              <li>a flag if the task is to repeat every week</li>
            </ul>
            <p>This list will reset on Mondays at 5 a.m. changing all task from 'done' to 'undone'.</p>
            <p>It will keep all tasks marked as repeating weekly and remove the others. </p>
          </div>
      </div>
    </div>
    
  </section>
</section>

<style>
  .content-wrap {
    max-width: var(--mw-l);
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
  @container (min-width: 768px) {
    .main-grid {
      grid-template-columns: 2fr 1fr;
    grid-template-areas: 
      'list extras'
      'about extras';
    }
  }

  /* Wide screen */
  @container (min-width: 1024px) {
    .main-grid {
      grid-template-columns: 2fr 1fr 1fr;
      grid-template-areas: 
      'list extras about';
      gap: var(--l);
    }
  }

  .details-content {
    padding: var(--m);
  }
</style>
