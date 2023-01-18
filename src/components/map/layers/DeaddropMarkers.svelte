<script>
  import { onMount } from "svelte";
  import { dead_drops } from "$data/dead_drops";
  import Markers from "../Markers.svelte";

  let placeMarkers;

  dead_drops.forEach((marker) => {
    marker.popupContent = `<p>Dead Drop - ${marker.title}</p>`;
  });

  onMount(() => placeMarkers(dead_drops));
</script>

<Markers
  bind:placeMarkers
  title={"Show Dead Drop Locations"}
  iconUrl={"icons/markers/location-deaddrop.svg"}
/>
