<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import { onMount } from "svelte";
  import { selectAllTextOnFocus  } from "$lib/actions";
	import Button from "./Button.svelte";
	import Modal from "./Modal.svelte";


  export let autofocus:boolean = false;

  // Property to control modal, bound to Modal's prop
  let showModal:boolean = false;

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

  // Open the modal by updating the showModal prop (bound to Modal component)
  function onOpenModal() {
    showModal = true;
  }
</script>

<Button
  id="add-task-button"
  type="button"
  usage="primary"
  onClick={onOpenModal}
>
  Add Task Item</Button>
  <Modal modalId="new-task-modal" bind:showModal>
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->

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
</Modal>
