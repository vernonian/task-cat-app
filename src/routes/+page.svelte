<script lang="ts">
  import "$lib/css/zen.css";
  import Task from "$lib/components/Task.svelte";
	import Todos from "$lib/components/Todos.svelte";
  import sampleData from "$lib/sampleData";
	import type { TodoTaskType } from "$lib/types/TodoTask";

  let todos:TodoTaskType[] = sampleData;
  //   { id: 1, name: "Create a Svelte starter app", completed: true },
  //   { id: 2, name: "Create your first component", completed: true },
  //   { id: 3, name: "Complete the rest of the tutorial", completed: false }
  // ];
</script>

<Todos {todos} />
<!-- {#each sampleData as task (task.id)}
  <Task 
    taskProps={task}
  />
{/each} -->
