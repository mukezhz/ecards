<script>
    // import Carousel from 'svelte-carousel';
    // onMount(() => {
    //     async function getSticker() {
    //         try {
    //             const stickerUrl = `${globalUrl}sticker/show-all-stickers`;
    //             const data = await (await fetch(stickerUrl)).json();
    //             stickerTabStore.set(data.allStickerList);
    //         } catch (e) {
    //             'error', e;
    //         }
    //     }
    //     getSticker();
    // });
</script>

<div
        class="w-64
 flex  text-black"
>
<!--    <Carousel particlesToShow={3} particlesToScroll={3} dots={false}>-->
<!--        <div id="drag-items" class="flex ">-->
<!--            Sticker here-->
<!--            {#each $stickerTabStore as item}-->
<!--                <div-->
<!--                        class="duration-700 ease-in-out  inset-0 transition-all transform translate-x-0 flex  mx-4 "-->
<!--                        data-carousel-item="active"-->
<!--                >-->
<!--                    <img src={item.url} class="rounded w-16 block mx-2" alt="" />-->
<!--                </div>-->
<!--            {/each}-->
<!--        </div>-->
<!--    </Carousel>-->
</div>

<!-- The button to open modal -->
<div class="flex justify-center  my-3 ">
    <button>
        <label for="my-modal-sticker" class=" modal-button">
            <span class="font-bold "> Show All Stickers</span>
        </label>
    </button>
</div>
<label
        for="my-modal-sticker"
        class="modal cursor-pointer bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-4xl bg-opacity-50  border border-gray-100"
>
</label>
