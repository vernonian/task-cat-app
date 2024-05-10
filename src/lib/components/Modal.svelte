<script lang="ts">
	import Button from "./Button.svelte";

  // Props
  export let modalId:string;
  export let showModal:boolean = true;

  // Scoped variables
  let dialog:HTMLDialogElement; // Reference to dialog element
  let modalVisible:boolean = false; // Boolean to control in-out animation
  const modalAnimationDuration:number = 200;  // Animation duration (ms)

  $: if (dialog && showModal) {
    dialog.showModal();

    // Set modalVisible to true so the modal appears and transitions
    modalVisible = true;
  }

  function closeModalHandler() {
    // Set modalVisible to true to trigger animation
    modalVisible = false;

    // Technically close the dialog after timeout to account for animation
    setTimeout(() => {
      showModal = false;
      dialog.close();
    }, modalAnimationDuration);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  class:opened={modalVisible}
  id={modalId}
  bind:this={dialog}
  on:click={closeModalHandler}
  >
  <!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="f-col" on:click|stopPropagation>
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
    padding: var(--m);
    max-width: var(--mw-m);
    width: 100%;
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
</style>