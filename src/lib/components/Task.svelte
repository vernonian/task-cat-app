<script lang="ts">
  
  import {daysOfTheWeek} from "$lib/daysOfTheWeek";
	import type { TodoTaskType } from "$lib/types/TodoTask";

  //Props
  export let taskProps:TodoTaskType;
  
  /* taskText, status, repeatsWeekly, timesPerWeek, category */

  let checked:boolean = false;

  
  // Search the daysOfWeek array to find index matching prop.dayTarget - Used to render day marker
  let dayIndex:number = daysOfTheWeek.findIndex(obj => obj.day === taskProps.dayTarget);
  console.log(dayIndex);

  //todo - handle case when day index is not defined since its an optional parameter

  //Update props when checked value changes (user input)

</script>

<div class="task-item">
  <label>
    <input type="checkbox" 
      id={taskProps.id}
      bind:checked={checked}
      />
    {taskProps.name}
  </label>
  
  
  <span>{daysOfTheWeek[dayIndex].abbr}</span>
  {#if taskProps.repeatsWeekly === true}
    <span>(R)</span>
  {/if}
</div>

<style>
  /* .task-item {

  } */
</style>