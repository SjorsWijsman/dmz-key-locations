<script>
  import L from "leaflet";
  import { map, waypoint, customMarkers } from "$store";

  // @ts-ignore

  function saveCustomMarker(x, y) {
    let marker = {id: `${x}${y}`, lat: x, lng: y}
    $customMarkers = [...$customMarkers, marker]
  };

  const WaypointCoordinates = L.Control.extend({
    onAdd: ($map) => {
      const container = L.DomUtil.create("div");

      waypoint.subscribe((value) => {
        if (value) {
          let sector = $waypoint?.sector;
          let lat = $waypoint?.lat;
          let lng = $waypoint?.lng;
          const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
          const y = 4150 - Math.round(clamp(lat, 0, 4150));
          const x = Math.round(clamp(lng, 0, 4150));

          let span = L.DomUtil.create('span', 'mouse-position');

          let locationIcon = L.DomUtil.create('img');
          locationIcon.setAttribute('src', './icons/location-crosshairs.svg');

          let sectorSpan = L.DomUtil.create('span');
          sectorSpan.innerHTML = `${sector?.join("")}`;

          let xSpan = L.DomUtil.create('span')
          xSpan.innerHTML = `x:${x}m`;
          let ySpan = L.DomUtil.create('span')
          ySpan.innerHTML = `y:${y}m`;

          let customMarker = L.DomUtil.create('input');
          customMarker.setAttribute('type', 'image');
          customMarker.onclick = () => {saveCustomMarker(lat, lng)}
          customMarker.setAttribute('src', './icons/flag.svg');

          span.appendChild(locationIcon);
          span.appendChild(sectorSpan);
          span.appendChild(xSpan);
          span.appendChild(ySpan);
          span.appendChild(customMarker);

          container.appendChild(span);

        } else {
          container.innerHTML = "";
        }
      });

      return container;
    },
  });

  $map.addControl(new WaypointCoordinates({ position: "bottomleft" }));

</script>
