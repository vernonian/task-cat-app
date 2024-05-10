<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  
  /**
   * Toggle Button 
   * The toggle button is used to make a boolean selection in relation to a form field.
   * It contains two radio buttons. The first is the 'false' value; the second is the 'true' value.
   * When either of the inputs change, it will emit a custom event, named 'onToggleButtonChange'
  */

  /* #=# Props #=# */
  export let name:string; // Used to group the inputs
  export let option1:string = 'No';   // Text for the 'false' option
  export let option2: string = 'Yes'; // Text for the 'true' option
  export let initialSelection:boolean = false;

  /* #=# Scoped Variables #=# */
  let selected:boolean = initialSelection;
  let option1Name:string = name + "-" + option1;  // Used to link label and input
  let option2Name:string = name + "-" + option2;  // Used to link label and input

  /* #=# Functions #=# */
  // Emit custom event and pass in the selected value
  function onChange() {
    dispatch('onToggleButtonChange', selected);
    console.log(selected);
  }
</script>

<fieldset class="toggle-button-group">
  <div class="toggle-button">
    <input 
      id={option1Name} 
      name={name}
      type="radio"
      value={false}
      bind:group={selected}
      on:change={onChange}>
    <label for={option1Name}>{option1}</label>
  </div>

  <div class="toggle-button">
    <input 
      id={option2Name}
      name={name}
      type="radio"
      value={true}
      bind:group={selected}
      on:change={onChange}>
    <label for={option2Name}>{option2}</label>
  </div>
  
</fieldset>

<style>
  .toggle-button-group {
    display: flex;
    justify-content: start;
    align-items: center;
  }

  .toggle-button > input[type="radio"] {
    display: none;
    visibility: hidden;
  }

  .toggle-button > label {
    padding: var(--s) var(--m);
    background-color: var(--interactive-0);
    color: var(--interactive-5);
    transition: color 0.2s, background-color 0.2s;
    cursor: pointer;
  }

  .toggle-button:has(input:checked) > label {
    background-color: var(--interactive-5);
    color: var(--interactive-0);
  }
  
  
  .toggle-button-group .toggle-button:first-of-type label {
    border-radius: var(--xs) 0 0 var(--xs);
  }

  .toggle-button-group .toggle-button:last-of-type label {
    border-radius:  0 var(--xs) var(--xs) 0;
  }
</style>