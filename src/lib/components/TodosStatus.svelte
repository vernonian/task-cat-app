<script lang="ts">
	import type { TodoTaskType } from "$lib/types/TodoTask";

  // Props
  export let todos:TodoTaskType[];

  // Reactive variables
  $: totalTodos = todos.length;
  $: completedTodos = todos.filter( (t) => t.completed).length;

  // DOM element reference
  let headingElement:any;

  // Functions
  export function focus() {
    headingElement.focus();
  }
</script>

<section>
  <h3 
      bind:this={headingElement}
      tabindex="-1"
    >List Progress</h3>
  <p>{completedTodos}/{totalTodos}</p>
</section>

<style>
  
</style>