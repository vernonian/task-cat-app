<script lang="ts">
	import CatIcon from "$lib/icons/CatIcon.svelte";
import type { TodoTaskType } from "$lib/types/TodoTask";

  // Props
  export let todos:TodoTaskType[];

  // Reactive variables
  $: totalTodos = todos.length;
  $: completedTodos = todos.filter( (t) => t.completed).length;
  $: percentageDone = (completedTodos / totalTodos) * 100;

  // DOM element reference
  let headingElement:any;

  // Functions
  export function focus() {
    headingElement.focus();
  }
</script>

<section class="todo-status f-col gap-s">
  <h3 class="heading-4"
      bind:this={headingElement}
      tabindex="-1"
    >Progress</h3>
    <div class="progress-bar">
      <div class="done-bar" style="width: {percentageDone}%;"></div>
      <div class="undone-bar"></div>
      <div class="icon-wrap" style="left: {percentageDone}%;">
        <CatIcon fillColor="var(--success-5)"/>
      </div>
    </div>
    <div class="f-row f-c-b">
      <span>{completedTodos} Done</span>
      <span>{totalTodos - completedTodos} Undone</span>
    </div>
</section>

<style>
  .todo-status {
    font-size: var(--fontsize-body-3);
  }

  .progress-bar {
    width: 100%;
    height: var(--s);
    background-color: var(--neutral-5);
    position: relative;

  }

  .done-bar {
    background-color: var(--success-1);
    width: 50%;
    height: 100%;
    position: absolute;
    transition: width 0.2s ease-in-out;
  }

  .icon-wrap {
    position: absolute;
    bottom: -2px;
    transition: left 0.2s ease-in-out;
    transform: translateX(-50%);
  }
  
</style>