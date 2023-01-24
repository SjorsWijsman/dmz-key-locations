<script>
	import Map from "$components/map/Map.svelte";
	import SearchPanel from "$components/ui/panels/SearchPanel.svelte";
	import UserPanel from "$components/ui/panels/UserPanel.svelte";
	import InfoPanel from "$components/ui/panels/InfoPanel.svelte";
	import { showVideo } from "$store";
	import { maps } from "$data/maps";

	// This will go via slug parameters in the future when there are multiple maps
	const mapData = maps["al-mazrah"].data;
</script>

<main class:video-disabled={!$showVideo}>
	<SearchPanel />
	<UserPanel />
	<InfoPanel />
	<Map {mapData} />
</main>
