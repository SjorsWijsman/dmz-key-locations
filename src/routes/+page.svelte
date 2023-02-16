<script>
	import { maps } from "$data/maps";
</script>

<main>
	<nav>
		<ul>
			{#each Object.keys(maps) as map}
				<li style:background-image={`url(${maps[map].image})`}>
					<a href="/{map}">
						<div>{maps[map].title}</div>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</main>

<style>
	main {
		height: 100vh;
		width: 100%;
		margin: 0 auto;
		padding: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	ul {
		list-style: none;
		padding-left: 0;
	}

	li {
		background-color: var(--color-black);
		background-size: 100%;
		background-position: center;
		background-repeat: no-repeat;
		margin: 2rem;
		border-radius: 1rem;
		width: 20rem;
		height: 20rem;
		overflow: hidden;
		transition: all 0.2s ease-out;
		box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
	}

	a {
		display: inline-block;
		text-decoration: none;
		height: 100%;
		width: 100%;
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0) 30%);
	}

	a div {
		padding: 1rem;
		font-size: 1.25rem;
		font-weight: 500;
	}

	li:hover {
		transform: scale(1.1);
	}
</style>
