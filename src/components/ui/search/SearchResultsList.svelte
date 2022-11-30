<script>
  import SearchResult from "./SearchResult.svelte";
  import { keys } from "$data/key-data";
  import { searchTerm, selectedMarker } from "$store";

  let filteredKeys = keys;

  // Filter keys with search result
  function filterKeys(string) {
    return keys
      .filter((key) => {
        if (sanitize(key.title).includes(sanitize(string))) return key;
      })
      .sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
      });
  }

  searchTerm.subscribe((value) => {
    // Empty to clear result list - prevents some rendering issues
    filteredKeys = [...filterKeys(value)];
  });

  function sanitize(string) {
    string = string.toLowerCase();
    string = string.replaceAll("-", " ");
    string = string.replaceAll(".", " ");
    string = string.replaceAll(" ", "");
    return string;
  }
</script>

<ul>
  {#if $selectedMarker.title && !$searchTerm}
    <SearchResult {...$selectedMarker} />
  {:else}
    {#each filteredKeys as key (key.title)}
      <SearchResult {...key} />
    {:else}
      <li>
        No results found. Did you find a key that is not on the map? Please let
        me know through <a
          href="https://discord.gg/vqCwgh8buH"
          target="_blank"
          rel="noreferrer">Discord</a
        >!
      </li>
    {/each}
  {/if}
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
