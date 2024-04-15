<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {daysOfTheWeek} from "$lib/daysOfTheWeek";
	import type { TodoTaskType } from "$lib/types/TodoTask";

  const dispatch = createEventDispatcher();

  // Props
  export let todo:TodoTaskType;

  let editing:boolean = false;
  let name:string = todo.name;

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

  // Enter editing mode
  function onEdit() {
    editing = true;
  }

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
      <div>
        <label
          for="todo-{todo.id}"
          class="todo-task-label"
          >New name for '{todo.name}'</label>
        <input
          bind:value={name}
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
        type="button">Edit</button>
      <button type="button"
        on:click={onRemove}
      >Delete</button>
    </div>
  {/if}
</div>


<style>
  /* .task-item {

  } */
</style>