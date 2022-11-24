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
    background-color: var(--color-black);
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
    padding-top: 1rem;
    margin: 10px;
    border-radius: 0.5rem;
    opacity: 0.9;
    resize: vertical;
    width: 20rem;
    min-height: 6rem;
    max-height: 80vh;
    overflow: auto;
  }
</style>
