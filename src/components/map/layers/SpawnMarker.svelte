<script>
    import L from "leaflet";
    import { onMount } from "svelte";
    import { layers, map, activeLayers } from "$store";
    import { spawns } from "$data/map-data";
  
    let spawnLayer = [];
    let spawnMarkers = [];
  
    const iconSettings = {
      iconUrl: "icons/flag.svg",
      iconSize: [20, 20], // size of the icon
      iconAnchor: [10, 20], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -15], // point from which the popup should open relative to the iconAnchor
    };
  
    function placeSpawnMarkers() {
      spawns.forEach((spawn) => {
        if (spawn.location) {
          const icon = L.icon(iconSettings);
  
          let marker = L.marker(
            [4150 - spawn.location.y, spawn.location.x],
            {
              title: spawn.title,
              icon,
            }
          )
            .bindPopup(`<p>Spawn - ${spawn.title}</p>`)
            .on("popupopen", () => openPopup(marker))
            .on("popupclose", () => closePopup(marker));
  
          spawnMarkers = [...spawnMarkers, marker];
        }
      });
  
      // Add markers to layerGroup
      spawnLayer = L.layerGroup(spawnMarkers);
  
      // Add layer to map
      if ($activeLayers.includes("Show Spawn Locations"))
        $map.addLayer(spawnLayer);
  
      // Add to layers store
      $layers = { ...$layers, "Show Spawn Locations": spawnLayer };
    }
  
    function openPopup(marker) {
      L.DomUtil.addClass(marker._icon, "active-marker");
    }
  
    function closePopup(marker) {
      if (marker._icon) L.DomUtil.removeClass(marker._icon, "active-marker");
    }
  
    onMount(placeSpawnMarkers);
  </script>
  