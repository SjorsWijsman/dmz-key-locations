import { writable } from "svelte/store";
import { persistStore } from "./scripts/persist-store";
import { keys } from "./data/key-data";

// Leaflet map, for global reference
export const map = writable(null);
// Map layers (bottom right)
export const layers = writable([]);

// Waypoint when user clicks a location that is not a marker
export const waypoint = writable(null);
// List of all key location markers
export const keyMarkers = writable([]);
// List of all key location markers
export const customMarkers = writable([]);
// Sector user is currently hovering over
export const selectedSector = writable(["A", "0"]);
// Marker user currently has selected
export const selectedMarker = writable(
  window.location.hash ? getHashKey() : { title: "" }
);
// Expanded key info block
export const openKeyInfo = writable(
  window.location.hash ? getHashKey().title : ""
);
// Search term input
export const searchTerm = writable("");
// Retain panel height
export const panelHeight = writable(null);

// Persists in localStorage
// Active sidebar panel
export const activePanel = persistStore("dmzkeys-user-activePanel", "search");
// Active map layers
export const activeLayers = persistStore("dmzkeys-user-activeLayers", [
  "Show Dead Drop Locations",
  "Show Key Locations",
  "Show Sector Grid",
]);
// Favorite markers
export const favorites = persistStore("dmzkeys-user-favorites", []);
// Custom markers
export const customMarkerData = persistStore(
  "dmzkeys-user-customMarkerData",
  []
);
// Display video above marker
export const showVideo = persistStore("dmzkeys-user-showVideo", true);
// Selected filter
export const filter = persistStore("dmzkeys-user-filter", "all");

function getHashKey() {
  return keys.filter(
    (key) => key.id === window.location.hash.replace("#", "")
  )[0];
}
