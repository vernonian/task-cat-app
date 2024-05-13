<script lang="ts">
  // Types
  import type {DaysType} from "$lib/types/DaysType";
  import type { TodoTaskType } from "$lib/types/TodoTask";
  import type {TodoTaskCategoriesType} from "$lib/types/TodoTaskCategoriesType";
  // Svelte
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  // Sample Data
  import CATEGORIES from "$lib/sampleCategories";
  // Components
  import { selectAllTextOnFocus  } from "$lib/actions";
	import Button from "./Button.svelte";
	import Modal from "./Modal.svelte";
	import TextInput from "./inputs/TextInput.svelte";
	import DayOfWeekSelector from "./inputs/DayOfWeekSelector.svelte";
	import ToggleButton from "./inputs/ToggleButton.svelte";
	import SelectList from "./inputs/SelectList.svelte";
  
  // Props
  export let todosLength:number;  // Used ot generate newTodoTask's id
  // export let autofocus:boolean = false;

  // Property to control modal, bound to Modal's prop
  $: showModal = true;

  // This property will be passed to parent component via event emission
  let newTodoTask:TodoTaskType = {
    id: todosLength,
    name: '',
    completed: false,
    tag: 'default',
    repeatsWeekly: false,
    timesPerWeek: 1,
    category: 'misc',
  };

  // let name:string = '';
  // let nameInputElement:any; // Reference to the input element DOM node
  let categoryInput:any; //Reference to select input element

  // Form variables
  let newTodoForm:HTMLFormElement;
  let selectedCategoryValue:TodoTaskCategoriesType;
  let addAnother:boolean = false; // Used to control modal behavior after form submit
  let categoryNameString:string = 'category';
  

  function resetNewTodoTask() {
    newTodoTask = {
      id: todosLength,
      name: '',
      completed: false,
      tag: 'default',
      repeatsWeekly: false,
      timesPerWeek: 1,
      category: 'misc',
      dayTarget: undefined
    }
  }

  /**
   * TODO
   * Bug -> id is not being updated as when form is submitted multiple times
   * reset all form elements to default when submitted
   *
   */

  function addTodoTask() {
    dispatch('addTodoTask', newTodoTask);
    resetNewTodoTask();
    // console.log(addAnother);
    if (!addAnother) {
      showModal = false;
      console.log(showModal);
    }
    // nameInputElement.focus(); // Give this element focus
  }

  function onCancel() {
    resetNewTodoTask();
    // nameInputElement.focus(); // Give this element focus
  }
 
  // If autofocus is true, focus the element
  // onMount( () => autofocus && nameInputElement.focus() );

  // Open the modal by updating the showModal prop (bound to Modal component)
  function onOpenModal() {
    showModal = true;
  }

  /* Setter functions for creating new todo task object */

  // Updates newTodoTask's category property based on event listener
  function updateCategory(category:TodoTaskCategoriesType) {
    newTodoTask.category = category;
    console.log(newTodoTask.category);
  }

  // Updates newTodoTask's repeatsWeekly property based on event listener
  function updateRepeatsWeeky(doesRepeat:boolean) {
    newTodoTask.repeatsWeekly = doesRepeat;
  }

  // Updates targetDayValue based on component event listener
  function updateTargetDay(targetDay:DaysType) {
    newTodoTask.dayTarget = targetDay;
  }

  // $: () => { console.log("newTodoTask:"); console.log(newTodoTask)}

</script>

<Button
  id="add-task-button"
  type="button"
  usage="primary"
  onClick={onOpenModal}
>
  Add Task Item</Button>
  <Modal modalId="new-task-modal" bind:showModal>
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
    <section class="f-col gap-l">
      <h2 class="heading-2">Create New Task</h2>
      <form
        bind:this={newTodoForm}
        on:submit|preventDefault={addTodoTask}
        on:keydown={(e) => e.key === 'Escape' && onCancel()}
        class="f-col gap-l"
      >

        <!-- Task Name -->
        <div class="f-col gap-xs">
          <label for="todo-0">What's the task?</label>
          <TextInput bind:value={newTodoTask.name}
            action={selectAllTextOnFocus}
            class="text-input"
            type="text" 
            id="todo-0" 
            name="todo-0"
            placeholder="Scoop the litterbox "
            autocomplete="off"
          />
        </div>

        <!-- Category -->
        <div class="f-col gap-xs">
          <label for={categoryNameString}>What's this task's category?</label>
          <SelectList 
            name={categoryNameString}
            required={true}
            on:selectListChange={e => updateCategory(e.detail)}
            selectListData={CATEGORIES}
          />
        </div>

        <!-- Repeats Weekly -->
        <div class="f-col gap-xs">
          <label for="new-task-times-per-week">Will this task repeat weekly?</label>
          <ToggleButton 
            name="new-task-repeats-weekly"
            option1="No"
            option2="Yes"
            on:onToggleButtonChange={e => updateRepeatsWeeky(e.detail)}
          />
        </div>

        <!-- Target Day -->
        <div class="f-col gap-xs">
          <label for="category">What day do you plan to complete this task?</label>
          <!-- Bind each input to a group -->
          <fieldset class="f-row gap-xs f-c-s">
            <DayOfWeekSelector 
              name="new-task-target-day"
              dayOfWeekValue="sunday"  
              type="radio" 
              on:dayOfWeekChange={e => updateTargetDay(e.detail)}/>
            <DayOfWeekSelector 
              name="new-task-target-day"
              dayOfWeekValue="monday"  
              type="radio"
              on:dayOfWeekChange={e => updateTargetDay(e.detail)}/>
            <DayOfWeekSelector 
              name="new-task-target-day"
              dayOfWeekValue="tuesday"  
              type="radio"
              on:dayOfWeekChange={e => updateTargetDay(e.detail)}/>
            <DayOfWeekSelector 
              name="new-task-target-day"
              dayOfWeekValue="wednesday"  
              type="radio"
              on:dayOfWeekChange={e => updateTargetDay(e.detail)}/>
            <DayOfWeekSelector 
              name="new-task-target-day"
              dayOfWeekValue="thursday"  
              type="radio"
              on:dayOfWeekChange={e => updateTargetDay(e.detail)}/>
            <DayOfWeekSelector 
              name="new-task-target-day"
              dayOfWeekValue="friday"  
              type="radio"
              on:dayOfWeekChange={e => updateTargetDay(e.detail)}/>
            <DayOfWeekSelector 
              name="new-task-target-day"
              dayOfWeekValue="saturday"  
              type="radio"
              on:dayOfWeekChange={e => updateTargetDay(e.detail)}/>
            <div>
              <input 
                type="radio"
                name="new-task-target-day"
                id="no-target-day"
                value="no-target-day"
                on:change={e => updateTargetDay('any')}/>
              <label for="no-target-day">None</label>
            </div>
              
          </fieldset>
        </div>

        <!-- Add another task after form submit? (keeps modal open) -->
        <div class="f-row gap-xs">
          <input 
            bind:value={addAnother}
            type="checkbox"
            id="add-another" 
            name="add-another"/>
          <label for="add-another">Add another task</label>
        </div>
          
        <!-- Submit the form with the button -->
        <Button 
          type="submit"
          disabled={!newTodoTask.name}
          usage="primary"
          id="new-todo-submit"
          onClick={ () => newTodoForm.requestSubmit() }
          >Add</Button>
    </form>
  </section>
</Modal>
