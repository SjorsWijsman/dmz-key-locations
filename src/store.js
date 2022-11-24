import { writable } from "svelte/store";

export const map = writable(null);
export const layers = writable({});

export const waypoint = writable(null);
export const keyMarkers = writable([]);
export const selectedSector = writable(["A", "0"]);

export const activePanel = writable("search");
