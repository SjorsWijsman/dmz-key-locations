import { writable } from "svelte/store";
import { persistStore } from "./scripts/persist-store";

export const map = writable(null);
export const layers = writable({});

export const waypoint = writable(null);
export const keyMarkers = writable([]);
export const selectedSector = writable(["A", "0"]);
export const selectedMarker = writable({ title: "" });
export const openKeyInfo = writable("");

export const activePanel = persistStore("dmzkeys-user-activePanel", "search");
export const searchTerm = persistStore("dmzkeys-user-searchTerm", "");
