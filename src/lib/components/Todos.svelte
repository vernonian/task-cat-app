<script lang="ts">
	import type { TodoTaskType } from "$lib/types/TodoTask";


  // Props
  export let todos:TodoTaskType[];

  // Reactive variables
  $: totalTodos = todos.length;
  $: completedTodos = todos.filter((todo) => todo.completed).length;
  
  let currentFilter:string = 'all';
  let newTodoName:string = '';
  let newTodoId:number;
  $: {
    if(completedTodos === 0) {
      newTodoId = 1;
    }
    else {
      newTodoId = Math.max(...todos.map( (t) => t.id )) + 1;
    }
  }

  // Functions
  
  /* Removes a todo item by filtering it out via its id. */
  function removeTodo(itemToRemove:TodoTaskType) {
    todos = todos.filter( (t) => t.id !== itemToRemove.id );
  }

  /* Adds a todo item to the todos array. */
  function addTodoItem() {   
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
    // Reset new todo name to clear input value
    newTodoName = ""
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

  // Debug
  // $: console.log("newTodoName: " + newTodoName);

</script>



<section class="section-wrap">
  <section class="content-wrap">
    <h1>Task Kat</h1>

    <!-- Create form to add new todo list item -->
    <form
      on:submit|preventDefault={() => addTodoItem()}
    >
      <h2><label for="todo-0">What needs to be done?</label></h2>
      <input 
        bind:value={newTodoName}
        type="text" 
        name="todo-0" 
        autocomplete="off"
      />
      <button type="submit">Add</button>
    </form>

    <!-- Filter -->
    <section class="filters">
      <button class:btn-active={currentFilter === 'all'} type="button" aria-pressed="true"
        on:click={() => filterTodoItems('all', todos)}
      >All</button>
      <button class:btn-active={currentFilter === 'undone'} type="button" aria-pressed="false"
        on:click={() => filterTodoItems('undone', todos)}
      >Undone</button>
      <button class:btn-active={currentFilter === 'done'} type="button" aria-pressed="false"
        on:click={() => filterTodoItems('done', todos)}
      >Done</button>
    </section>

    <!-- Progress -->
    <section>
      <p>List progression: {completedTodos}/{totalTodos}</p>
    </section>

    <!-- Todo list -->
    <ul 
      class="todo-list"
      role="list"
      aria-labelledby="list-heading">
      <!-- Todo edit mode -->

      {#each filterTodoItems(currentFilter, todos) as todo (todo.id)}
        <li>
          <div>
            <input 
              type="checkbox" 
              id="todo-{todo.id}"
              on:click={() => todo.completed = !todo.completed}
              checked={todo.completed}
              />
              <label for="todo-{todo.id}">{todo.name} ({todo.id})</label>
            </div>
            <div class="btn-group">
              <button type="button">Edit</button>
              <button type="button"
                on:click={() => removeTodo(todo)}
              >Delete</button>
            </div>
          </li>      
        {:else}
          <li>Nothing to do!</li>
      {/each}
      
      
    </ul>

  </section>
</section>

<style>
  .content-wrap {
    max-width: var(--maxwidth-l);
  }

  .btn-active {
    background-color: aqua;
  }

  .todo-list {
    list-style: none;
    padding: 0px;
  }
</style>
