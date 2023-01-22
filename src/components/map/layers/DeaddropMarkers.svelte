<script>
	import { onMount } from "svelte";
	import { deadDrops } from "$data/al-mazrah/locations/dead-drops";
	import Markers from "../Markers.svelte";

	let placeMarkers;

	deadDrops.forEach((marker) => {
		marker.popupContent = `<p>Dead Drop - ${marker.title}</p>`;
	});

	onMount(() => placeMarkers(deadDrops));
</script>

<Markers
	bind:placeMarkers
	title={"Show Dead Drop Locations"}
	iconUrl={"icons/markers/location-deaddrop.svg"}
/>
