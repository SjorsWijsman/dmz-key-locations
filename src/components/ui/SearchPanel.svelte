<script>
  import SearchBar from "./SearchBar.svelte";
  import SearchResultsList from "./SearchResultsList.svelte";
  import Panel from "./Panel.svelte";
</script>

<Panel panelTitle={"search"} openIcon={"./icons/key.svg"}>
  <SearchBar />
  <SearchResultsList />
</Panel>
