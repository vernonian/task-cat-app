<script lang="ts">
  //Props
  export let id:string;
  export let type: 'button' | 'submit' = 'button';
  export let ariaPressed: 'true' | 'false' | true | false = false;
  export let onClick:any;
  export let usage: 'default' | 'primary' | 'secondary' | 'danger' | 'ghost' = 'default';

</script>


<button
  id={id}
  class="{$$props.class} secondary"
  type={type}
  aria-pressed={ariaPressed}
  on:click={onClick}
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
  }



  .default, .secondary {
    background-color: var(--neutral-2);

    &:hover {
      background-color: var(--neutral-3);
    }

    &:active {
      background-color: var(--neutral-4);
    }
  }

  .primary {
    background-color: var(--primary-5);
  }

  .danger {
    background-color: var(--danger-5);
  }

  .ghost {
    background-color: transparent;
  }



</style>