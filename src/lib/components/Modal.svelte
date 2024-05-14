<script lang="ts">
  // Components
	import Button from "./Button.svelte";

  // Props
  export let modalId:string;
  export let showModal:boolean = false; // Don't show modal by default

  // Scoped variables
  let dialog:HTMLDialogElement; // Reference to dialog element, will be 'undefined' until mounted
  let modalVisible:boolean = showModal; // Boolean to control in-out animation
  const modalAnimationDuration:number = 200;  // Animation duration (ms) 

  // Watch for change to show modal
  $: if (dialog && showModal) {
    dialog.showModal();
    modalVisible = true;  // Set modalVisible to true to trigger animation
  }

  // Watch for change to close modal
  $: if(dialog && !showModal) { closeModalHandler(); }

  // Helper function to handle closing the modal
  function closeModalHandler() {
    
    modalVisible = false; // Visibly close modal to trigger animation

    // Technically close the dialog after timeout to account for animation
    setTimeout(() => {
      showModal = false;
      dialog.close();
    }, modalAnimationDuration);
  }

  // Handle modal closing if escape key is pushed
  function handleEscapeKeyPress(e:any) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModalHandler();
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  class:opened={modalVisible}
  id={modalId}
  bind:this={dialog}
  on:click={closeModalHandler}
  on:keydown={handleEscapeKeyPress}
  >
  <!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="f-col f-s-s" on:click|stopPropagation>
		<slot></slot>

		<!-- svelte-ignore a11y-autofocus -->
    <Button 
      id="close-modal"
      type="button"
      usage="secondary"
      onClick={closeModalHandler}
    >Cancel</Button>
	</div>
</dialog>

<style>
  dialog {
    --modalAnimationDuration: 200ms;
    max-width: var(--mw-l);
    width: max-content;
    padding: 0px;
    border-radius: var(--s);
    box-shadow: 0 var(--xs) var(--s) 0px rgba(0,0,0,0.1);
    border:none;
  }

  dialog::backdrop {
    background-color: (--black);
  }

  /* Defauly (closed) state */
  dialog, dialog::backdrop {
    opacity: 0;
    transition: all var(--modalAnimationDuration);
  }

  dialog {
    /* animation: fade-zoom-in 0.2s ease-in normal both; */
    transform: scale(0.95);
  }

  /* Opened state */
  dialog.opened, dialog.opened::backdrop {
    opacity: 1;
  }
  
  dialog.opened {
    transform: scale(1);
  }

  dialog :first-child {
    margin: 0 auto;
    width: max-content;
    padding: var(--xl);
  }
</style>