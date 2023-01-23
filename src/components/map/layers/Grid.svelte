<script>
	import L from "leaflet";
	import { onMount } from "svelte";
	import { layers, selectedSector } from "$store";

	export let mapHeight, mapWidth, grid;

	const xTiles = grid.xTiles;
	const yTiles = grid.yTiles;

	const xTileSize = mapWidth / xTiles;
	const yTileSize = mapHeight / yTiles;

	function drawGrid() {
		// Create grid lines
		const lines = drawLines();
		const labels = grid.labels ? drawLabels() : [];

		// Add lines to layerGroup
		const gridLayer = L.layerGroup([...labels, ...lines]);

		// Add to layers store if it has not been added yet
		if (!$layers.map((item) => item.title).includes("Show Sector Grid")) {
			$layers = [...$layers, { title: "Show Sector Grid", layer: gridLayer }];
		}
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
		for (let x = 0; x < xTiles; x++) {
			for (let y = 0; y < yTiles; y++) {
				// Draw rectangle for each grid section starting from top left
				lines.push(
					L.rectangle(
						[
							[mapHeight - yTileSize * y, x * xTileSize],
							[mapHeight - (y + 1) * yTileSize, (x + 1) * xTileSize],
						],
						gridStyle
					).on("mouseover", (e) => {
						$selectedSector = [x, numberToLetters(y)];
					})
				);
			}
		}
		return lines;
	}

	function drawLabels() {
		const labels = [];
		const labelSettings = {
			direction: "center",
			permanent: true,
			className: "sector-label",
		};
		for (let x = 0; x < xTiles; x++) {
			labels.push(
				L.tooltip(labelSettings)
					.setLatLng([xTileSize * xTiles + 100, xTileSize * x + xTileSize / 2])
					.setContent(`${x}`)
			);
		}
		for (let y = 0; y < yTiles; y++) {
			labels.push(
				L.tooltip(labelSettings)
					.setLatLng([yTileSize * yTiles - yTileSize * y - yTileSize / 2, -100])
					.setContent(`${numberToLetters(y)}`)
			);
		}
		return labels;
	}

	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	function numberToLetters(num) {
		var base = "A".charCodeAt(0);
		var str = "";
		while (num >= 0) {
			var r = num % 26;
			str = String.fromCharCode(base + r) + str;
			num = Math.floor(num / 26) - 1;
		}
		return str;
	}

	onMount(drawGrid);
</script>
