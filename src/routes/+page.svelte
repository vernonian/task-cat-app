<script lang="ts">
  import "$lib/css/zen.css";
	import Todos from "$lib/components/Todos.svelte";
  import sampleData from "$lib/sampleData";
	import type { TodoTaskType } from "$lib/types/TodoTask";
  import '$lib/css/zen.css';

  let todos:TodoTaskType[] = sampleData;
  //   { id: 1, name: "Create a Svelte starter app", completed: true },
  //   { id: 2, name: "Create your first component", completed: true },
  //   { id: 3, name: "Complete the rest of the tutorial", completed: false }
  // ];
</script>

<Todos todos={todos}/>