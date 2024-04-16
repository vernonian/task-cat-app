<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {daysOfTheWeek} from "$lib/daysOfTheWeek";
	import type { TodoTaskType } from "$lib/types/TodoTask";
  import { tick } from "svelte";
  import { focusOnInit, selectOnFocus } from "$lib/actions";

  const dispatch = createEventDispatcher();

  // Props
  export let todo:TodoTaskType;

  let editing:boolean = false;            // Used to render edit or view UI
  let editButtonPressed:boolean = false;  // Used to track edit button press, to give focus to other elements
  let name:string = todo.name;
  let nameInputElement:any;

  // Search the daysOfWeek array to find index matching prop.dayTarget - Used to render day marker
  // let dayIndex:number = daysOfTheWeek.findIndex(obj => obj.day === taskProps.dayTarget);
  // console.log(dayIndex);

  function update(updatedTask:any) {
    todo = {...todo, ...updatedTask} // "spreads" modifications on to todo
    dispatch('update', todo); // Emit the "update" event
  }

  // User cancels editing mode so new inputs are saved
  function onCancel() {
    name = todo.name; // 
    editing = false;  // Leave edit mode
  }

  // User saves changed in editing mode, so the todoTask must be updated
  function onSave() {
    update( {name: name} );
    editing = false; // Leave edit mode
  }

  // Emit the remove event
  function onRemove() {
    dispatch('remove', todo); 
  }

  // Enter editing mode, wait for tick promise, then assign focus
  function onEdit() {
    editButtonPressed = true;
    editing = true;
  }

  const focusEditButton = (node:any) => editButtonPressed && node.focus();

  // Toggle the completed value & emit the update event via update()
  function onToggle() {
    todo.completed = !todo.completed; 
    update(todo);
  }

  
</script>


<div class="todo-task">
  {#if editing}
  <!-- Edit mode  -->
    <form role="text"
      on:submit|preventDefault={onSave}
      on:keydown={(e) => {e.key === 'Escape' && onCancel()}}
      >
      <div class="f-col gap-xs">
        <label
          for="todo-{todo.id}"
          class="todo-task-label"
          >New name for '{todo.name}'</label>
        <input
          bind:value={name}
          bind:this={nameInputElement}
          use:selectOnFocus
          use:focusOnInit
          class="todo-task-input"
          type="text"
          id="todo-{todo.id}"
          autocomplete="off"
        />
      </div>
      <div>
        <button 
          on:click={onCancel}
          type="button"
          >Cancel</button>
        <button 
          on:click={onSave}
          disabled={!name}
          type="submit"
          >Save</button>
      </div>
    </form>
  {:else}
  <!-- View mode  -->
  <div class="f-row gap-s f-c-b">
    <div>
      <input 
        type="checkbox" 
        id="todo-{todo.id}"
        on:click={onToggle}
        checked={todo.completed}
        />
        <label for="todo-{todo.id}">{todo.name} ({todo.id})</label>
    </div>
    <div class="btn-group">
      <button 
        on:click={onEdit}
        use:focusEditButton
        type="button">Edit</button>
      <button type="button"
        on:click={onRemove}
        class="danger"
      >Delete</button>
    </div>
  </div>
  {/if}
</div>


<style>

  .todo-task {
    padding: var(--xs);
    border: dashed 1px var(--gray-5);
  }

  input:checked ~ label {
    text-decoration: line-through;
    color: var(--gray-6);
  }

  button {
    opacity: 0.8;
    transition: opacity 0.2s;
  }

  .todo-task:has(input:checked) button {
    opacity: 0.6;
  }

  .todo-task button:hover,
  .todo-task:has(input:checked) button:hover {
    opacity: 1;
  }

</style>