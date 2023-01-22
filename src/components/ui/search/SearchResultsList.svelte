<script>
  import SearchResult from "./SearchResult.svelte";
  import { keys } from "$data/al-mazrah/locations/keys";
  import { searchTerm, selectedMarker, favorites, filter } from "$store";

  let filteredKeys = keys;
  let searchString = "";

  // Filter keys with search result
  function filterKeys() {
    const sanitizedSearchString = sanitize(searchString);
    return keys
      .filter((key) => {
        // Filter by search
        if (sanitize(key.title).includes(sanitizedSearchString)) return key;
        if (sanitize(key.keyName).includes(sanitizedSearchString)) return key;
      })
      .filter((key) => {
        // Filter by selected filter
        if ($filter === "all") {
          return key;
        } else if ($filter === "favorite" && $favorites.includes(key.title)) {
          return key;
        } else if ($filter === "mission" && key.tags?.includes("mission")) {
          return key;
        } else if ($filter === "fortress" && key.tags?.includes("fortress")) {
          return key;
        }
      })
      .sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
      });
  }

  searchTerm.subscribe((value) => {
    searchString = value;
    // Empty to clear result list - prevents some rendering issues
    filteredKeys = [...filterKeys()];
  });

  filter.subscribe(() => {
    filteredKeys = [...filterKeys()];
  });

  function sanitize(string) {
    string = string.toLowerCase();
    string = string.replaceAll("-", " ");
    string = string.replaceAll(".", " ");
    string = string.replaceAll("'", " ");
    string = string.replaceAll(" ", "");
    return string;
  }
</script>

<ul>
  {#if $selectedMarker?.title && !$searchTerm}
    <SearchResult {...$selectedMarker} />
  {:else}
    {#each filteredKeys as key (key.title)}
      <SearchResult {...key} />
    {:else}
      {#if !$favorites.length && !$searchTerm}
        <li>
          You have no favorites. Add a favorite by clicking the star button on
          the right side of the key info box!
        </li>
      {:else}
        <li>
          No results found. Did you find a key that is not on the map? Please
          let me know through <a
            href="https://discord.gg/vqCwgh8buH"
            target="_blank"
            rel="noreferrer">Discord</a
          >!
        </li>
      {/if}
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
    opacity: 0.5;
    text-align: center;
    padding-top: 2rem;
  }
</style>
