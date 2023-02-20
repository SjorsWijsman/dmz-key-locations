<script>
	import { onMount } from "svelte";
	import Markers from "../Markers.svelte";

	export let title,
		iconUrl,
		data = [];

	let placeMarkers;

	data.forEach((marker) => {
		marker.popupContent = `<p>${title} - ${marker.title}</p>`;
	});

	onMount(() => placeMarkers(data));
</script>

<Markers bind:placeMarkers title={`Show ${title} Locations`} {iconUrl} />
