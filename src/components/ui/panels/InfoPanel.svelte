<script>
	import Panel from "../Panel.svelte";
	import Icon from "../Icon.svelte";
	import poweredByVercel from "$assets/powered-by-vercel.svg";
</script>

<Panel panelTitle={"info"} icon={"heart"} openIconOffset={2}>
	<div>
		<h2>DMZ Key Locations</h2>
		<p>
			Thanks for using my map! Please contact me through the Discord server (link below) if you find
			a key location that isn't on the map, found a typo, bugs, suggestions, etc. I will also be
			using this Discord for future update notes.
		</p>
		<p style:margin-bottom={"1rem"}>If you enjoy using this map please consider donating!</p>
		<p style:opacity={0.5}>
			Huge thanks to
			<a href="https://www.youtube.com/@TroubleChuteBasics" target="_blank" rel="noreferrer">
				TroubleChute
			</a>
			for allowing his videos to be used for the project!
		</p>
		<p style:opacity={0.5} style:margin-bottom={"2rem"}>
			Map by <a href="https://www.activision.com/" target="_blank" rel="noreferrer">
				Activision Publishing, Inc.
			</a>
		</p>
		<a
			href="https://vercel.com/?utm_source=dmz-keys&utm_campaign=oss"
			target="_blank"
			rel="noreferrer"
			class="button vercel"
		>
			<img src={poweredByVercel} alt="Powered by Vercel" />
		</a>
	</div>
	<svelte:fragment slot="footer">
		<a href="https://discord.gg/vqCwgh8buH" target="_blank" rel="noreferrer" class="button">
			<Icon icon={"discord"} size={3} />
		</a>
		<a href="https://twitter.com/DmzKeys" target="_blank" rel="noreferrer" class="button">
			<Icon icon={"twitter"} size={3} />
		</a>
		<a
			href="https://github.com/SjorsWijsman/dmz-key-locations"
			target="_blank"
			rel="noreferrer"
			class="button"
		>
			<Icon icon={"github"} size={3} />
		</a>
		<a
			href="https://www.paypal.com/donate/?hosted_button_id=L599J6499CT5W"
			target="_blank"
			rel="noreferrer"
			class="button"
		>
			<Icon icon={"heart"} size={3} />
			<span>Donate</span>
		</a>
	</svelte:fragment>
</Panel>

<style>
	div {
		display: flex;
		flex-direction: column;
		padding: 1rem;
	}

	div > p {
		opacity: 0.9;
		line-height: 1.3rem;
		margin-bottom: 0.5rem;
	}

	a.button {
		display: block;
		display: flex;
		align-items: center;
		height: 3rem;
		width: 3rem;
		margin-right: 1rem;
		background-color: var(--color-black-dark);
		border-radius: 0.5rem;
		text-decoration: none;
		font-weight: bold;
		transition: all 0.1s ease-out;
	}

	@media (hover: hover) {
		a.button:hover {
			background-color: var(--color-main);
			transform: scale(1.2);
		}
	}

	a.button:last-of-type {
		width: 9rem;
		padding: 0.3rem 1rem;
		padding-left: 0.4rem;
		background-color: var(--color-contrast);
		font-weight: bold;
		font-size: 1.2rem;
	}

	@media (hover: hover) {
		a.button:last-of-type:hover {
			background-color: var(--color-contrast-light);
		}
	}

	a.button.vercel {
		height: 3.2rem;
		width: unset;
		padding: 0;
		margin-right: auto;
		background-color: var(--color-black-dark);
	}

	a.button.vercel img {
		height: 100%;
		width: 100%;
	}

	@media (hover: hover) {
		a.button.vercel:hover {
			background-color: var(--color-main);
			transform: scale(1.05);
		}
	}
</style>
