<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import { onMount } from "svelte";
  import { selectAllTextOnFocus  } from "$lib/actions";

  export let autofocus:boolean = false;

  let name:string = '';
  let nameInputElement:any; // Reference to the input element DOM node

  function resetName() { name = '' };

  function addTodoTask() {
    dispatch('addTodoTask', name);
    resetName();
    nameInputElement.focus(); // Give this element focus
  }

  function onCancel() {
    resetName();
    nameInputElement.focus(); // Give this element focus
  }
 
  // If autofocus is true, focus the element
  onMount( () => autofocus && nameInputElement.focus() );
</script>

<form
  on:submit|preventDefault={addTodoTask}
  on:keydown={(e) => e.key === 'Escape' && onCancel()}
  class="f-col"
  >
  <h2><label for="todo-0">What to do?</label></h2>
  <div class="f-row">
    <input 
      bind:value={name}
      bind:this={nameInputElement}
      use:selectAllTextOnFocus
      class="text-input"
      type="text" 
      name="todo-0" 
      autocomplete="off"
    />
    <button 
      disabled={!name}
      type="submit">Add</button>
  </div>
</form>
