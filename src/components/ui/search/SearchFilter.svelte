<script>
  import { fadeSlide } from "$scripts/fade-slide";
  import { filter } from "$store";
</script>

<div transition:fadeSlide={{ duration: 200 }}>
  <h3>Filter By Tag</h3>
  <button on:click={() => ($filter = "all")} class:off={$filter !== "all"}>
    <img src="./icons/key.svg" alt="" />
    All
  </button>
  <button
    on:click={() => ($filter = "favorite")}
    class:off={$filter !== "favorite"}
  >
    <img src="./icons/star-favorite.svg" alt="" />
    Favorite
  </button>
  <button
    on:click={() => ($filter = "mission")}
    class:off={$filter !== "mission"}
  >
    <img src="./icons/circle-exclamation.svg" alt="" />
    Mission Requirement
  </button>
  <button
    on:click={() => ($filter = "fortress")}
    class:off={$filter !== "fortress"}
  >
    <img src="./icons/fortress.svg" alt="" />
    Fortress
  </button>
</div>

<style>
  div {
    position: absolute;
    top: 4.5rem;
    left: 0;
    width: 100%;
    padding: 1.5rem 1rem;
    padding-bottom: 1.5rem;
    background-color: var(--color-black-dark);
    box-shadow: 0 1rem 1rem rgba(10, 10, 12, 0.671);
  }

  h3 {
    font-size: 1rem;
    font-weight: 300;
    padding-bottom: 0.5rem;
    margin: 0;
  }

  button {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 2.5rem;
    width: 100%;
    padding: 0.55rem 0rem;
    border: none;
    background: transparent;
    cursor: pointer;
    transition: all 0.1s ease-out;
  }

  button.off {
    opacity: 0.5;
  }

  img {
    display: inline-block;
    height: 100%;
    width: 2rem;
    margin-right: 0.5rem;
  }
</style>
