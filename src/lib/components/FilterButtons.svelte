<script lang="ts">
  import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';
  const dispatch = createEventDispatcher();

	// Props
	export let filter: string = 'all';  // Bound to parent "currentFilter"

  // Hanlders as a prop. The handler function is passed as a prop, so when a button is clicked, 
  // the function that executes is determnined by the parent.
	export let onclick = (f: string) => {};
	$: onclick(filter);
</script>

<section class="filters f-col gap-xs">
	<h3 class="body-1">Filters</h3>
	<div class="f-row gap-xxs">
		<!-- Reset filter to 'all' -->
		<Button
			id="test"
			usage="default"
			type="button"
			ariaPressed=true
			onClick={ () => dispatch('filter', 'all') }
		>All</Button>

		<!-- Set filter to 'undone' -->
		<Button
			id="test"
			usage="default"
			type="button"
			ariaPressed=true
			onClick={ () => dispatch('filter', 'undone') }
		>Undone</Button>

		<!-- Set filter to 'done' -->
		<Button
			id="test"
			usage="default"
			type="button"
			ariaPressed=true
			onClick={ () => dispatch('filter', 'done') }
		>Done</Button>
	</div>

	<!-- <button
		class:btn-active={filter === 'all'}
		type="button"
		aria-pressed="true"
		on:click={() => dispatch('filter', 'all')}>All</button
	>
	<button
		class:btn-active={filter === 'undone'}
		type="button"
		aria-pressed="false"
		on:click={() => dispatch('filter', 'undone')}>Undone</button
	>
	<button
		class:btn-active={filter === 'done'}
		type="button"
		aria-pressed="false"
		on:click={() => dispatch('filter', 'done')}>Done</button
	> -->
</section>

<style>
	.btn-active {
		background-color: aqua;
	}
</style>
