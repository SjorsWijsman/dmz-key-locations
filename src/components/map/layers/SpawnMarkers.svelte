<script>
  import { onMount } from "svelte";
  import { spawns } from "$data/spawns";
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
  iconUrl={"icons/markers/location-spawn.svg"}
/>
