<script>
  import { fadeSlide } from "$scripts/fade-slide";
  import { clickOutside } from "$scripts/click-outside";
  import { filter } from "$store";

  export let openFilter;

  function handleClickOutside(event) {
    // Force click outside to happen after filter button click close
    // There's a better way to do this.
    setTimeout(() => (openFilter = !openFilter), 1);
  }
</script>

<div
  transition:fadeSlide={{ duration: 200 }}
  use:clickOutside
  on:click_outside={handleClickOutside}
>
  <h3>Filter By Tag</h3>
  <button
    class="filter"
    on:click={() => ($filter = "all")}
    class:off={$filter !== "all"}
  >
    <img src="./icons/key.svg" alt="" />
    All
  </button>
  <button
    class="filter"
    on:click={() => ($filter = "favorite")}
    class:off={$filter !== "favorite"}
  >
    <img src="./icons/star-favorite.svg" alt="" />
    Favorite
  </button>
  <button
    class="filter"
    on:click={() => ($filter = "mission")}
    class:off={$filter !== "mission"}
  >
    <img src="./icons/circle-exclamation.svg" alt="" />
    Mission Requirement
  </button>
  <button
    class="filter"
    on:click={() => ($filter = "fortress")}
    class:off={$filter !== "fortress"}
  >
    <img src="./icons/fortress.svg" alt="" />
    Fortress
  </button>

  <button class="close" on:click={() => (openFilter = false)}>
    <img src="./icons/chevron-down.svg" alt="Close Filter Menu" />
  </button>
</div>

<style>
  div {
    position: absolute;
    top: 4.5rem;
    left: 0;
    width: 100%;
    padding: 0rem;
    padding-top: 1.5rem;
    background-color: var(--color-black-dark);
    box-shadow: 0 1rem 1rem rgba(10, 10, 12, 0.671);
  }

  h3 {
    font-size: 1rem;
    font-weight: 300;
    padding-bottom: 0.5rem;
    margin: 0 1rem;
  }

  button {
    transition: all 0.1s ease-out;
  }

  button.filter {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 2.2rem;
    width: 100%;
    padding: 0.4rem 1rem;
    border: none;
    background: transparent;
    cursor: pointer;
  }

  button.off {
    opacity: 0.5;
  }

  button.close {
    width: 100%;
    margin-top: 1rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.25rem;
  }

  button.close:hover {
    background-color: var(--color-black-light);
  }

  button.close img {
    opacity: 0.8;
    height: 1rem;
    transform: rotate(180deg);
  }

  img {
    display: inline-block;
    height: 100%;
    width: 2rem;
    margin-right: 0.5rem;
  }
</style>
