<script lang="ts">
  import IconChevronLeft from "$lib/icon/IconChevronLeft.svelte";
  import IconSearch from "$lib/icon/IconSearch.svelte";
  import Player from "$lib/components/Player.svelte";
  import axios from "axios";
  import type { YTItem, MP3 } from "$lib/types/yt";
  import { getThumbnail } from "$lib/types/yt";
  let openSearch = false;
  let currentSong: YTItem;
  let currentMP3: MP3;
  let test = new Array(100);
  let searchResult = [];
  let searchQuery = "";
  let searching = false;
  const doSearch = async () => {
    searchResult = [];
    searching = true;
    try {
      let result = await axios.get(`/search?q=${searchQuery}`);
      searchResult = result.data.items;
    } catch (error) {
      console.log(error);
    }
    searching = false;
  };
  const doOpenSearch = () => {
    openSearch = true;
  };
  const setSong = async (song) => {
    try {
      let result = await axios.get(`/song?id=${song.id}`);
      currentMP3 = result.data;
      currentSong = song;
      openSearch = false;
      console.log(currentMP3);
    } catch (error) {
      console.log(error);
    }
    // searchQuery = ""; //reset search
  };
  const onKeyPress = (e) => {
    if (e.charCode === 13) doSearch();
  };
</script>

<head>
  <title>YT Svelte API - by FlokiTV</title>
</head>

<!-- 400 x 560 -->
<div class="w-screen h-screen">
  <div class="flex items-center justify-center h-screen bg-gray-900 p-2">
    {#if currentSong == undefined || openSearch}
      <div
        style="max-width:400px;max-height:560px"
        class="bg-neutral-200 h-full shadow-lg rounded-lg flex-1 flex p-2 flex-col"
      >
        <header class="flex">
          <div class="flex-1 flex relative">
            {#if currentSong != undefined}
              <button
                class="h-full px-2 rounded-l-lg bg-green-500 text-white"
                on:click={() => {
                  openSearch = false;
                }}
              >
                <IconChevronLeft />
              </button>
            {/if}
            <input
              type="text"
              class={`flex-1 border p-2 ${
                currentSong != undefined ? "rounded-r-lg" : "rounded"
              } text-md`}
              bind:value={searchQuery}
              on:keypress={onKeyPress}
              placeholder="Buscar"
            />
            <button
              on:click={doSearch}
              class="absolute 
                right-0 top-0 
                h-full text-gray-600 px-2"><IconSearch /></button
            >
          </div>
        </header>
        <section class="flex flex-col mt-2 space-y-2 overflow-auto pr-2">
          {#if searchResult.length}
            {#each searchResult as song}
              <div
                class="shadow rounded bg-white flex cursor-pointer"
                on:click={() => setSong(song)}
              >
                <img src={getThumbnail(song)} class="w-1/3 rounded-l" alt="" />
                <p class="p-2">{song.title}</p>
              </div>
            {/each}
          {:else}
            <div
              class="py-10 flex justify-center items-center uppercase font-semibold opacity-40 text-lg"
            >
              {#if searching}
                Buscando...
              {:else}
                pesquise uma musica
              {/if}
            </div>
          {/if}
        </section>
      </div>
    {:else}
      <Player {doOpenSearch} {currentSong} bind:mp3URL={currentMP3.url} />
    {/if}
  </div>
</div>
