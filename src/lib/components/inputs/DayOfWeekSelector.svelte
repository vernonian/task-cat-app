<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // Props
  export let type: 'checkbox' | 'radio';
  export let name:string; // The fieldset group it belongs to
  export let dayOfWeekValue:string;

  // Consts and vars
  const days:string[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayLabels:string[] = ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'];
  const forId:string = "day-of-week-input-" + dayOfWeekValue;
  
  let dayLabelIndex:number;
  
  // Set the day label index to show correct label
  for (let i=0; i<days.length; i++) {
    if (dayOfWeekValue === days[i]) {
      dayLabelIndex = i;
    }
  }

  // Dispatch event to let parent know the value has changed
  function onChange() {
    dispatch('dayOfWeekChange', dayOfWeekValue);
  }
</script>

<div class="day-input">
  <input
    type={type}
    id={forId}
    name={name}
    value={dayOfWeekValue}
    on:change={onChange}
    {...$$restProps}
  />
  <label class="day-label" 
    for={forId}>{dayLabels[dayLabelIndex]}</label>
</div>

<style>
  .day-input input {
    display: none;
    visibility :hidden;
  }

  .day-label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--l);
    height: var(--l);
    background-color: var(--interactive-0);
    color: var(--interactive-5);
    border-radius: var(--xxl);
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--interactive-1);
    }

    &:active {
      background-color: var(--interactive-2);
      color: var(--white);
    }

    &:focus {
      outline: dashed 2px var(--interactive-5);
      outline-offset: 1px;
    }
  }

  /* Checked State */
  .day-input:has(input:checked) .day-label {
    background-color: var(--interactive-5);
    color: var(--white);
  }
</style>