<script>
  import SearchResult from "./SearchResult.svelte";
  import { keys } from "../../key-data";
  export let searchTerm;

  let filteredKeys = [];

  function filterKeys(searchTerm) {
    return keys.filter((key) => {
      if (key.title.toLowerCase().includes(searchTerm.toLowerCase()))
        return key;
    });
  }

  $: filteredKeys = filterKeys(searchTerm);
</script>

<ul>
  {#each filteredKeys as key}
    <SearchResult {key} />
  {/each}
</ul>

<style>
  ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
    margin-top: 1rem;
  }
</style>
