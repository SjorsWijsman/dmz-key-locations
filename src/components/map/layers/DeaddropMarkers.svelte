<script>
  import { onMount } from "svelte";
  import { deaddrops } from "$data/map-data";
  import Markers from "../Markers.svelte";

  let placeMarkers;

  deaddrops.forEach((marker) => {
    marker.popupContent = `<p>Dead Drop - ${marker.title}</p>`;
  });

  onMount(() => placeMarkers(deaddrops));
</script>

<Markers
  bind:placeMarkers
  title={"Show Dead Drop Locations"}
  iconUrl={"icons/markers/location-deaddrop.svg"}
/>
