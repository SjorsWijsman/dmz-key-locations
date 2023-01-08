<script>
  import { fadeSlide } from "$scripts/fade-slide";
  import { favorites, openKeyInfo } from "$store";
  import Icon from "../Icon.svelte";

  export let title, description, loot, tags;
</script>

{#if $openKeyInfo === title}
  <section transition:fadeSlide|local={{ duration: 200 }}>
    {#if $favorites?.includes(title)}
      <span class="favorite" transition:fadeSlide|local={{ duration: 100 }}>
        <Icon icon={"star"} color={"var(--color-favorite-light)"} size={1.5} />
        Favorite
      </span>
    {/if}

    {#if tags?.includes("mission")}
      <span class="mission">
        <Icon
          icon={"exclamation-circle"}
          color={"var(--color-mission)"}
          size={1.5}
        />
        Mission Requirement
      </span>
    {/if}

    {#if tags?.includes("fortress")}
      <span class="fortress">
        <Icon icon={"fortress"} size={1.5} />
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
    /* Offset for icon padding */
    margin-left: -0.225rem;
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

  span :global(.icon) {
    margin-right: 0.2rem;
  }

  p:last-child {
    padding-bottom: 0;
  }
</style>
