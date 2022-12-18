<script>
  import { onMount } from "svelte";
  import { spawns } from "$data/map-data";
  import Markers from "../Markers.svelte";

  let placeMarkers;

  spawns.forEach((marker) => {
    marker.popupContent = `<p>Spawn - ${marker.title}</p>`;
  });

  onMount(() => placeMarkers(spawns));
</script>

<Markers
  bind:placeMarkers
  title={"Show Spawn Locations"}
  iconUrl={"icons/location-spawn.svg"}
/>
