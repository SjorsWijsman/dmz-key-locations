<script>
	import "leaflet/dist/leaflet.css";
	import "../../map.css";
	import Map from "$components/map/Map.svelte";
	import SearchPanel from "$components/ui/panels/SearchPanel.svelte";
	import UserPanel from "$components/ui/panels/UserPanel.svelte";
	import InfoPanel from "$components/ui/panels/InfoPanel.svelte";
	import MapSwitcher from "$components/ui/MapSwitcher.svelte";
	import { mapData, showVideo, waypoint, language } from "$store";
	import { maps } from "$data/maps";
	import { keys } from "$data/keys";
	import { page } from "$app/stores";

	let translatedKeys = keys;

	$: setMapData($page.params?.map);

	function setMapData(map) {
		if ($mapData?.title !== maps[map]?.title) {
			// Change map data
			$mapData = maps[map];
			$waypoint = null;
		}
	}

	function translateKeys(locale) {
		if (locale && locale !== "en") {
			translatedKeys = keys.map((key) => {
				return {
					...key,
					...key.locales[locale],
				};
			});
		} else {
			translatedKeys = keys;
		}
	}

	language.subscribe((locale) => translateKeys(locale));
</script>

<MapSwitcher />
<main class:video-disabled={!$showVideo}>
	<UserPanel />
	<InfoPanel />
	<SearchPanel keys={translatedKeys} />
	<Map keys={translatedKeys} />
	<slot />
</main>
