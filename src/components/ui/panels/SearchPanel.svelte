<script>
	import SearchBar from "$components/ui/search/SearchBar.svelte";
	import SearchResultsList from "$components/ui/search/SearchResultsList.svelte";
	import Panel from "../Panel.svelte";
</script>

<Panel panelTitle={"search"} icon={"key"}>
	<SearchBar slot="header" />
	<SearchResultsList />
</Panel>
