<script>
  import { fadeSlide } from "../../scripts/fade-slide";
  import { favorites } from "../../store";

  export let title, missionRequirement, fortress, description, loot;
  export let isOpen = false;
</script>

{#if isOpen}
  <section transition:fadeSlide|local={{ duration: 200 }}>
    {#if $favorites.includes(title)}
      <p class="favorite" transition:fadeSlide|local={{ duration: 100 }}>
        <img src="./icons/star-favorite.svg" alt="" />
        Favorite
      </p>
    {/if}
    {#if missionRequirement}
      <p class="mission">
        <img src="./icons/circle-exclamation.svg" alt="" />
        Mission Requirement
      </p>
    {/if}
    {#if fortress}
      <p class="fortress">
        <img src="./icons/fortress.svg" alt="" />
        Fortress
      </p>
    {/if}

    <h3>Description</h3>
    {#if description?.length > 0}
      {#each description as paragraph}
        <p>
          {paragraph}
        </p>
      {/each}
    {:else}
      <p>WIP</p>
    {/if}

    <h3>Loot</h3>
    {#if loot?.length > 0}
      {#each loot as item}
        <p>
          {item}
        </p>
      {/each}
    {:else}
      <p>WIP</p>
    {/if}
  </section>
{/if}

<style>
  p {
    display: flex;
    align-items: center;
    margin: 0;
    padding-bottom: 1rem;
    font-weight: 350;
    opacity: 0.85;
  }

  p.mission,
  p.favorite,
  p.fortress {
    position: relative;
    padding: 0;
    padding-top: 0.1rem;
  }

  p.mission {
    color: var(--color-mission);
  }

  p.favorite {
    color: var(--color-favorite-light);
  }

  p.fortress {
    opacity: 0.75;
  }

  p img {
    width: 1rem;
    height: 1rem;
    margin-right: 0.3rem;
  }

  p:last-child {
    padding-bottom: 0;
  }

  h3 {
    font-size: 1rem;
    opacity: 0.5;
    margin: 0;
    padding-bottom: 0.1rem;
    padding-top: 1rem;
    font-weight: 350;
  }
</style>
