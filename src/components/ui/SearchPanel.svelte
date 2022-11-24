<script>
  import SearchBar from "./SearchBar.svelte";
  import SearchResultsList from "./SearchResultsList.svelte";

  let searchTerm = "";
</script>

<section>
  <SearchBar bind:searchTerm />
  <SearchResultsList {searchTerm} />
</section>

<style>
  section {
    position: fixed;
    z-index: 1000;
    width: 20rem;
    background-color: var(--color-black);
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
    padding: 1rem 0;
    margin: 10px;
    border-radius: 0.5rem;
    opacity: 0.9;
  }
</style>
