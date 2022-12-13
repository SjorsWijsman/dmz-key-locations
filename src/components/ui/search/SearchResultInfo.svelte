<script>
  import { fadeSlide } from "$scripts/fade-slide";
  import { favorites, openKeyInfo } from "$store";

  export let title, description, loot, tags;
</script>

{#if $openKeyInfo === title}
  <section transition:fadeSlide|local={{ duration: 200 }}>
    {#if $favorites.includes(title)}
      <span class="favorite" transition:fadeSlide|local={{ duration: 100 }}>
        <img src="./icons/star-favorite.svg" alt="" />
        Favorite
      </span>
    {/if}

    {#if tags.includes("mission")}
      <span class="mission">
        <img src="./icons/circle-exclamation.svg" alt="" />
        Mission Requirement
      </span>
    {/if}

    {#if tags.includes("fortress")}
      <span class="fortress">
        <img src="./icons/fortress.svg" alt="" />
        Fortress
      </span>
    {/if}

    <div>
      <h3>Description</h3>
      {#if description?.length > 0}
        {#each description as paragraph}
          <p>
            {@html paragraph}
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
    </div>
  </section>
{/if}

<style>
  h3 {
    padding-bottom: 0.2rem;
    padding-top: 1rem;
  }

  p {
    margin: 0;
    padding-bottom: 1rem;
    font-weight: 350;
    opacity: 0.85;
  }

  span {
    display: flex;
    align-items: center;
  }

  span.mission,
  span.favorite,
  span.fortress {
    position: relative;
    padding: 0;
    padding-top: 0.1rem;
  }

  span.mission {
    color: var(--color-mission);
  }

  span.favorite {
    color: var(--color-favorite-light);
  }

  span.fortress {
    opacity: 0.75;
  }

  span img {
    width: 1rem;
    height: 1rem;
    margin-right: 0.3rem;
  }

  p:last-child {
    padding-bottom: 0;
  }
</style>
