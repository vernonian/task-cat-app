<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { daysOfTheWeek } from '$lib/daysOfTheWeek';
	import type { TodoTaskType } from '$lib/types/TodoTask';
	import { focusOnInit, selectAllTextOnFocus } from '$lib/actions';
	import Repeat from '$lib/Repeat.svelte';

	const dispatch = createEventDispatcher();

	// Props
	export let todo: TodoTaskType;

	let editing: boolean = false; // Used to render edit or view UI
	let editButtonPressed: boolean = false; // Used to track edit button press, to give focus to other elements

	let name: string = todo.name;

	let dayAbbr: string | undefined = setDayAbbrBasedOnTaskDay(todo.dayTarget);

	// Search the daysOfWeek array to find index matching prop.dayTarget - Used to render day marker
	let dayIndex: number = daysOfTheWeek.findIndex((obj) => obj.day === todo.dayTarget);
	// console.log(dayIndex);

	function update(updatedTask: any) {
		todo = { ...todo, ...updatedTask }; // "spreads" modifications on to todo
		dispatch('update', todo); // Emit the "update" event
	}

	// Enter editing mode and give input focus (handled by the focusOnInit action)
	function onEdit() {
		editButtonPressed = true;

		// Enter edit mode
		editing = true;
	}

	// User cancels editing mode so new inputs are saved
	function onCancel() {
		// Reset name to props' original value
		name = todo.name;

		// Leave edit mode
		editing = false;
		console.log('Task name edit canceled');
		console.log('todo.name: ' + todo.name + ' | name: ' + name);
	}

	// User saves changed in editing mode, so the todoTask must be updated
	function onSave() {
		console.log('blur');
		// Update props
		update({ name: name });

		// Leave edit mode
		editing = false;
	}

	// Emit the remove event
	function onRemove() {
		dispatch('remove', todo);
		console.log('Task removed');
	}

	// const focusEditButton = (node: any) => editButtonPressed && node.focus();

	// Toggle the completed value & emit the update event via update()
	function onToggle() {
		todo.completed = !todo.completed;
		update(todo);
	}

	// Toggle the repeats weekly property and update todo
	function onRepeatWeeklyToggle() {
		todo.repeatsWeekly = !todo.repeatsWeekly;
		update(todo);
	}

	// Map task's day of the week string to abbreviation
	function setDayAbbrBasedOnTaskDay(d: string | undefined): string | undefined {
		// get index of a match in the daysofweek array to the todo.dayTarget
		// use index to display abbreviation
		if (todo.dayTarget) {
			let i = daysOfTheWeek.findIndex((d) => d.day === todo.dayTarget);
			return daysOfTheWeek[i].abbr;
		} else {
			return undefined;
		}
	}

	function onTextInputKeyDownHandler(e: KeyboardEvent) {
		switch (e.key) {
			case 'Escape':
				// Cancel the editing state
				onCancel();
				break;
			case 'Enter':
				// Save the value
				onSave();
				break;
			default:
				break;
		}
	}
</script>

<div class="todo-task">
	<div class="input-group f-row gap-xxs">
		<input 
      class="todo-check"
      type="checkbox" 
      id="todo-{todo.id}" 
      on:click={onToggle} 
      checked={todo.completed} />

		<div class="f-row f-c-b">
			<div class="f-row f-c-s gap-s">
				<!-- View mode -->
				{#if !editing}
					<button
						on:click={onEdit}
						class="todo-task-label-button"
						disabled={todo.completed}
						type="button"
					>
						{name}
					</button>

					<!-- Edit mode -->
				{:else}
					<input
						bind:value={name}
						on:blur={onSave}
						on:keydown={onTextInputKeyDownHandler}
						use:focusOnInit
						use:selectAllTextOnFocus
						class="todo-task-input"
						type="text"
						id="task-{todo.id}"
						autocomplete="off"
					/>
				{/if}

				<!-- Day Target -->
				{#if todo.dayTarget}
					<span class="target-day">({dayAbbr})</span>
				{/if}

				<!-- Repeats Weekly Indicator -->
				<div class="repeats-weekly">
					<input
						type="checkbox"
						on:click={onRepeatWeeklyToggle}
						id="{todo.id}-repeat"
						class="hidden"
						checked={todo.repeatsWeekly}
					/>
					<label class:does-repeat={todo.repeatsWeekly} for="{todo.id}-repeat">
						<Repeat />
					</label>
				</div>

				<!-- Times Repeating per Week -->
				<span class="times-per-week">(x{todo.timesPerWeek})</span>
			</div>
			<!-- </label> -->
			<div class="btn-group">
				<button type="button" on:click={onRemove} disabled={todo.completed} class="danger delete"
					>Delete</button
				>
			</div>
		</div>
	</div>
</div>

<style>
	.todo-task {
    color: var(--textcolor-body);
    transition: var(--transi-bg);
	}

  .todo-task:has(.todo-check:checked) {
    background-color: var(--success-0);
  }

	.input-group {
		display: grid;
		grid-template-columns: auto 1fr;
	}

  .todo-check {
    padding: 0px;
    /* margin: 0px; */
  }

  /* Task checked state */
	.todo-check:checked ~ div {
		text-decoration: line-through;
		color: var(--success-5);
	}

  /* Task unchecked state */
	.todo-task-input,
	.todo-task-label-button {
		display: inline-block;
		background-color: transparent;
		padding: var(--xs);
    border: solid 1px transparent;
    border-radius: var(--xs);
		font-size: var(--fontsize-body-2);
		text-align: left;
		width: 100%;
		max-width: max-content;
    transition: var(--transi-bg), var(--transi-color);
	}
  
  /* The label button hover state when not disabled */
  .todo-task-label-button:not(:disabled):hover {
		background-color: var(--interactive-0);
		cursor: text;
	}

	.todo-task-input {
    background-color: var(--interactive-0);
		border-color: var(--interactive-5);
    border-style: dotted;
	}

  /* Target day & times per week */
  .target-day, .times-per-week  {
		font-size: var(--fontsize-body-3);
    transition: var(--transi-color);
	}

	.times-per-week {
		display: none;
	}

  /* Weekly repetition indicator */
	.repeats-weekly {
		width: 12px;
	}

	.repeats-weekly label {
    fill: var(--neutral-5);
		transition: var(--transi-fill);
	}

	.repeats-weekly label.does-repeat {
    fill: var(--interactive-3);
	}

  /* Delete button */
  .delete {
    padding: var(--xs);
    background-color: transparent;
    color: var(--gray-6);
    border: none;
    border-radius: var(--xxs);
    transition: var(--transi-bg), var(--transi-color), var(--transi-opacity);
  }

  .delete:not(:disabled):hover {
    background-color: var(--danger-0);
    color: var(--textcolor-body);
  }

  .todo-check:checked ~ div .delete {
    opacity: 0;
  }

  /* Cursors */
  .todo-check, .repeats-weekly label, .delete {
    cursor: pointer;
  }

  .todo-check:checked ~ div button {
    cursor: not-allowed;
  }

	.hidden {
		display: none;
	}
</style>
