<script>
	import { layers, keyMarkers } from "$store";
	import { keys } from "$data/keys";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

	onMount(() => {
		// Open currently selected key from page params
		const keyId = keys.filter((key) => key.id === $page.params?.id)[0]?.id;
		if (keyId) {
			$layers = $layers.map((item) => {
				if (item.title === "Show Key Locations") item.on = true;
				return item;
			});
			const waitForKeyMarkers = keyMarkers.subscribe((value) => {
				for (const marker of $keyMarkers) {
					if (marker.options.title === keyId) {
						marker.openPopup();
						waitForKeyMarkers();
					}
				}
			});
		} else {
			goto(`/${$page.params?.map}${$page.url?.search ?? ""}`);
		}
	});
</script>
