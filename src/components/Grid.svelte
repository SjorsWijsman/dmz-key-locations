<script>
  import L from 'leaflet'
  import { onMount } from 'svelte';
  import { map, layers } from "../store"

  const tiles = 10
  const tileSize = 415

  const xTiles = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
  const yTiles = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

  let gridLayer
  let selectedSector

  function drawGrid() {
    // Create grid lines
    const lines = drawLines()
    // Add lines to layerGroup
    gridLayer = L.layerGroup(lines)
    // Add layer to map
    $map.addLayer(gridLayer)

    $layers = {...$layers, "Show Grid": gridLayer}

    var marker = L.marker([39.5, -77.3], { opacity: 0.01 }); //opacity may be set to zero
    marker.bindTooltip("My Label", {permanent: true, className: "my-label", offset: [0, 0] });
    marker.addTo($map);
  }

  function drawLines() {
    const lines = []
    const gridStyle = {
      fill: true,
      fillOpacity: 0,
      color: "white",
      opacity: 0.05,
      weight: 2,
    }
    xTiles.forEach((xTile, x) => {
      yTiles.forEach((yTile, y) => {
        // Draw rectangle for each grid section starting from top left
        lines.push(L.rectangle([
          [tileSize * (tiles - y), tileSize * x], 
          [tileSize * (tiles - y - 1), tileSize * (x + 1)]
        ], gridStyle)
        .on('mouseover', (e) => {
          selectedSector = [xTile, yTile]
        })
        .on('mouseout', (e) => {
          selectedSector = []
        }))
      })
    })
    return lines
  }

  onMount(drawGrid)
</script>

<h2>{selectedSector?.join("") || ""}</h2>

<style>
  :global(.my-label) {
    background-color: red;
  }

  h2 {
    z-index: 500;
    position: fixed;
    left: 50%;
    transform: translate(-50%);
  }
</style>