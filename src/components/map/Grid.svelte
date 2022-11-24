<script>
  import L from "leaflet";
  import { onMount } from "svelte";
  import { map, layers, selectedSector } from "../../store";

  const tiles = 10;
  const tileSize = 415;

  const xTiles = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const yTiles = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  function drawGrid() {
    // Create grid lines
    const lines = drawLines();
    const labels = drawLabels();
    // Add lines to layerGroup
    const gridLayer = L.layerGroup([...labels, ...lines]);
    // Add layer to map
    $map.addLayer(gridLayer);

    $layers = { ...$layers, "Show Sector Grid": gridLayer };
  }

  function drawLines() {
    const lines = [];
    const gridStyle = {
      fill: true,
      fillOpacity: 0,
      color: "white",
      opacity: 0.05,
      weight: 2,
    };
    xTiles.forEach((xTile, x) => {
      yTiles.forEach((yTile, y) => {
        // Draw rectangle for each grid section starting from top left
        lines.push(
          L.rectangle(
            [
              [tileSize * (tiles - y), tileSize * x],
              [tileSize * (tiles - y - 1), tileSize * (x + 1)],
            ],
            gridStyle
          ).on("mouseover", (e) => {
            $selectedSector = [xTile, yTile];
          })
          // .on("mouseout", (e) => {
          //   $selectedSector = [];
          // })
        );
      });
    });
    return lines;
  }

  function drawLabels() {
    const labels = [];
    const labelSettings = {
      direction: "center",
      permanent: true,
      className: "sector-label",
    };
    xTiles.forEach((xTile, x) => {
      labels.push(
        L.tooltip(labelSettings)
          .setLatLng([tileSize * tiles + 100, tileSize * x + tileSize / 2])
          .setContent(xTile)
      );
    });
    yTiles.forEach((yTile, y) => {
      labels.push(
        L.tooltip(labelSettings)
          .setLatLng([tileSize * tiles - tileSize * y - tileSize / 2, -100])
          .setContent(yTile)
      );
    });
    return labels;
  }

  onMount(drawGrid);
</script>
