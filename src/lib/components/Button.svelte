<script lang="ts">

  //Props
  export let id:string;
  export let type: 'button' | 'submit' = 'button';
  export let ariaPressed: 'true' | 'false' | true | false = false;
  export let onClick:any;
  export let usage: 'default' | 'primary' | 'secondary' | 'danger' | 'ghost' = 'default';
  export let visuallyActive:boolean = false;
  export let disabled:boolean = false;


</script>

<button
  id={id}
  class="{usage} {$$props.class} secondary"
  class:visually-active={visuallyActive}
  type={type}
  aria-pressed={ariaPressed}
  on:click={onClick}
  disabled={disabled}
>
  <slot></slot>
</button>

<style>
  /* Base styling */
  button {
    padding: var(--s);
    font-family: inherit;
    line-height: 1;
    border: none;
    cursor: pointer;
    border-radius: var(--xxs);
    transition: var(--transi-bg);

    &:focus {
      outline: dashed 2px var(--interactive-5);
      outline-offset: 1px;
    }

    &:disabled,  &:disabled:hover {
      background-color: var(--neutral-1);
      color: var(--neutral-6);
      cursor: not-allowed;
    }
  }

  /* Default */
  .default, .secondary {
    background-color: var(--neutral-2);

    &:hover {
      background-color: var(--neutral-3);
    }

    &:active {
      background-color: var(--neutral-4);
    }
  }

  /* Primary */
  .primary {
    background-color: var(--primary-5);
    color: var(--white);

    &:hover {
      background-color: var(--primary-4);
    }

    &:active {
      background-color: var(--primary-6);
    }
  }

  .visually-active {
    background-color: var(--primary-2);
    color: var(--black);

    &:hover {
      background-color: var(--primary-3);
    }

    &:active {
      background-color: var(--primary-4);
    }
  }

  .danger {
    background-color: var(--danger-5);
  }

  .ghost {
    background-color: transparent;
  }
</style>