<script>
  import L from 'leaflet'
  import { onMount } from 'svelte';
  import { map, layers } from "../../store"

  const tiles = 10
  const tileSize = 415

  const xTiles = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
  const yTiles = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

  let selectedSector

  function drawGrid() {
    // Create grid lines
    const lines = drawLines()
    const labels = drawLabels()
    // Add lines to layerGroup
    const gridLayer = L.layerGroup([...labels, ...lines])
    // Add layer to map
    $map.addLayer(gridLayer)

    $layers = { ...$layers, "Show Sector Grid": gridLayer }
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

  function drawLabels() {
    const labels = []
    const labelSettings = {direction: 'center', permanent: true, className: "sector-label"}
    xTiles.forEach((xTile, x) => {
      labels.push(L.tooltip(labelSettings)
        .setLatLng([tileSize * tiles + 100, tileSize * x + tileSize / 2])
        .setContent(xTile)
      )
    })
    yTiles.forEach((yTile, y) => {
      labels.push(L.tooltip(labelSettings)
        .setLatLng([(tileSize * tiles) - (tileSize * y) - (tileSize / 2), -100])
        .setContent(yTile)
      )
    })
    return labels
  }

  onMount(drawGrid)
</script>

{#if selectedSector?.length > 0}
  <span>{selectedSector.join("")}</span>
{/if}

<style>
  /* TODO: work around the !important rules */
  :global(.sector-label) {
    opacity: 0.3 !important;
    color: white !important;
    font-size: 1.2rem !important;
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important; 
  }

  span {
    z-index: 500;
    position: fixed;
    left: 50%;
    transform: translate(-50%);
    background-color: rgba(19, 19, 22, 0.7);
    text-shadow: 0 0 2rem rgba(0, 0, 50, 20%);
    font-size: 1rem;
    padding: 0.2rem 0.5rem;
    margin-top: 0.5rem;
    border-radius: 0.2rem;
  }
</style>