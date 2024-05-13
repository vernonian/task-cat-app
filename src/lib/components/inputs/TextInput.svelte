<script lang="ts">
  // Props
  export let value:string;
  export let action:any;
</script>

<input 
  bind:value={value}
  use:action
  {...$$restProps}
/>

<style>
  input {
    padding: var(--s);
    border: solid 1px var(--neutral-5);
    color: var(--textcolor-body);
    border-radius: var(--xs);
    font-size: var(--fontsize-body-1);
    line-height: 1;

    &:hover {
      border-color: var(--interactive-3);
    }

    &:active, &:focus {
      border-color: var(--interactive-5);
    }

    &:focus {
      outline: dashed 2px var(--interactive-5);
      outline-offset: 1px;
    }
  }

  input::placeholder {
    color: var(--interactive-3);
    font-style: italic;
  }
</style>