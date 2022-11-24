<script>
  import SearchResult from "./SearchResult.svelte";
  import { keys } from "../../key-data";
  export let searchTerm;

  let filteredKeys = [];

  function filterKeys(searchTerm) {
    return keys
      .filter((key) => {
        if (key.title.toLowerCase().includes(searchTerm.toLowerCase()))
          return key;
      })
      .sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
      });
  }

  $: filteredKeys = filterKeys(searchTerm);
</script>

<ul>
  {#each filteredKeys as key}
    <SearchResult {key} />
  {:else}
    <li>No results found</li>
  {/each}
</ul>

<style>
  ul {
    list-style: none;
    padding-left: 0;
    margin: 1rem 0;
  }

  li {
    padding: 1rem;
    opacity: 0.4;
    text-align: center;
  }
</style>
