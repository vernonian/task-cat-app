<script lang='ts'>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  /* #=# Props #=# */
  export let selectListData:string[];
  export let name:string;
  export let required:boolean = false;

  /* #=# Scoped Variables #=# */
  let categoryInput:any;

  /* #=# Functions #=# */
  // Emit custom change event to update parent value
  function onSelectListChange() {
    dispatch('selectListChange', categoryInput.value);
  }
</script>

<select 
  on:change={e => onSelectListChange()}
  bind:this={categoryInput} 
  name={name} 
  id={name}
  required={required}>
  {#each selectListData as option}
    <option value={option}>{option[0].toUpperCase() + option.substring(1)}</option>
  {/each}
</select>

<style>
  select {
    padding: var(--s);
    border: solid 1px var(--neutral-5);
    color: var(--textcolor-body);
    border-radius: var(--xs);
    font-size: var(--fontsize-body-1);
    line-height: 1;
    cursor: pointer;
    transition: all 0.2s;
  
    &:hover {
      border-color: var(--interactive-3);
    }

    &:active, &:focus {
      border-color: var(--interactive-5);
    }

    &:focus {
      outline: dashed 2px var(--interactive-5);
      outline-offset: 1px;
    }
  }
</style>