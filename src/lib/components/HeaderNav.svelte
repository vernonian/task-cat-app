<script>
	import CatIcon from "$lib/icons/CatIcon.svelte";
</script>

<header>
  <nav class="nav">
    <section class="content-wrap f-row f-c-c gap-s">
      <CatIcon fillColor="white" />
      <p>Welcome to Task Kat, let's do some tasks!</p>
    </section>
  </nav>
</header>

<style>
  .nav {
    width: 100%;
    padding: var(--s);
    background-color: var(--primary-4);
    color: var(--white);
  }
</style>