<script lang="ts">
  import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';
  const dispatch = createEventDispatcher();

	// Props
	export let filter: string = 'all';  // Bound to parent "currentFilter"

	// Handle active styling
	let isActive:boolean[] = [true, false, false];

  // Hanlders as a prop. The handler function is passed as a prop, so when a button is clicked, 
  // the function that executes is determnined by the parent.
	export let onclick = (f: string) => {};

	$: onclick(filter);

	/**
	 * Updates the isActive array by setting the passed index's element to true. Used to indicate which filter button is active.
	 * @param index
	*/
	function updateActive(index:number) {
		console.log("in updateActive()");
		// Reset all to false
		for (let i = 0; i<isActive.length; i++) {
			isActive[i] = false;
		}
		
		// Set clicked button (via index) to true and update isActive
		isActive[index] = true;
		isActive = isActive
	}
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
			onClick={ () => {dispatch('filter', 'all'); updateActive(0)} }
			visuallyActive={isActive[0]}
		>All</Button>

		<!-- Set filter to 'undone' -->
		<Button
			id="test"
			usage="default"
			type="button"
			ariaPressed=true
			onClick={ () => { dispatch('filter', 'undone'); updateActive(1) } }
			visuallyActive={isActive[1]}
		>Undone</Button>

		<!-- Set filter to 'done' -->
		<Button
			id="test"
			usage="default"
			type="button"
			ariaPressed=true
			onClick={ () => { dispatch('filter', 'done'); updateActive(2) } }
			visuallyActive={isActive[2]}
		>Done</Button>
	</div>
</section>
