<script>
  import L from 'leaflet'
  import { onMount } from 'svelte';
  import { bubble } from 'svelte/internal';
  import { map, selectedSector } from "../store"

  const tiles = 10
  const tileSize = 415

  const xTiles = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
  const yTiles = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

  function drawGrid() {
    let lines = []
    const gridStyle = {
      fill: true,
      fillOpacity: 0,
      color: "white",
      opacity: 0.05,
      weight: 2,
    }
    xTiles.forEach((xTile, x) => {
      yTiles.forEach((yTile, y) => {
        lines.push(L.rectangle([
          [tileSize * (tiles - y), tileSize * x], 
          [tileSize * (tiles - y - 1), tileSize * (x + 1)]
        ], gridStyle)
        .on('mouseover', (e) => {
          $selectedSector = [xTile, yTile]
        })
        .on('mouseout', (e) => {
          $selectedSector = []
        }))
      })
    })
    const gridLayer = L.layerGroup(lines).addTo($map);
    gridLayer.addTo($map)
  }

  onMount(drawGrid)
</script>

<div>
</div>

<style>

</style>