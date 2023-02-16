<script>
	import L from "leaflet";
	import { onMount } from "svelte";
	import CustomMarkers from "$components/map/layers/CustomMarkers.svelte";
	import KeyMarkers from "$components/map/layers/KeyMarkers.svelte";
	import MiscMarkers from "$components/map/layers/MiscMarkers.svelte";
	import POILabels from "$components/map/layers/POILabels.svelte";
	import Grid from "$components/map/layers/Grid.svelte";
	import WaypointMarker from "$components/map/WaypointMarker.svelte";
	import MousePos from "$components/ui/widgets/MousePos.svelte";
	import WaypointPos from "$components/ui/widgets/WaypointPos.svelte";
	import LayerControl from "$components/ui/widgets/LayerControl.svelte";
	import ZoomControl from "$components/ui/widgets/ZoomControl.svelte";
	import { map } from "$store";
	import { isTouchDevice } from "$scripts/platform-check";

	export let mapName;
	export let mapData;
	export let keys;

	let mapContainer;

	onMount(() => {
		setupMap(mapData);
	});

	function setupMap(mapData) {
		if (!mapData || !mapContainer) return;

		$map?.remove();

		$map = L.map(mapContainer, {
			crs: L.CRS.Simple,
			maxZoom: 5,
			minZoom: -4,
			zoomControl: false,
		});

		const bounds = [
			[0, 0],
			[mapData.height, mapData.width],
		];

		const image = L.imageOverlay(mapData.image, bounds);
		image.addTo($map);

		$map.fitBounds(bounds);
		$map.setMaxBounds([
			[-3000, -3000],
			[mapData.height + 3000, mapData.width + 3000],
		]);
		$map.setZoom(-1);
	}

	$: setupMap(mapData);
</script>

{#key mapData}
	{#if $map}
		<CustomMarkers />
		<KeyMarkers keys={keys.filter((key) => key.map === mapName)} />
		{#each mapData?.locations?.misc ?? [] as misc}
			<MiscMarkers {...misc} />
		{/each}

		<POILabels pois={mapData.options.pois} />
		<Grid mapHeight={mapData.height} mapWidth={mapData.width} grid={mapData.options.grid} />

		<WaypointMarker xMax={mapData.width} yMax={mapData.height} />

		{#if !isTouchDevice()}
			<MousePos xMax={mapData.width} yMax={mapData.height} />
		{/if}
		<WaypointPos xMax={mapData.width} yMax={mapData.height} />
		<ZoomControl />
		<LayerControl />
	{/if}
{/key}
<section bind:this={mapContainer} />

<style>
	section {
		height: 100vh;
		background-color: transparent;
	}

	section :global(*) {
		color: var(--color-black-dark);
	}

	section :global(.leaflet-control-attribution) {
		display: none;
	}
</style>
