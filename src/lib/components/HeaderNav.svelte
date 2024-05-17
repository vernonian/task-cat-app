<script>
	import CatIcon from "$lib/icons/CatIcon.svelte";
</script>

<header>
  <nav class="nav">
    <section class="content-wrap f-row f-c-c gap-s">
      <CatIcon fillColor="white" />
      <p>Done or undone, these tasks don’t sum up your self-worth!</p>
      <CatIcon fillColor="white" />
    </section>
  </nav>
</header>

<style>
  .nav {
    width: 100%;
    padding: var(--s);
    background-color: var(--primary-3);
    color: var(--white);
  }
</style>