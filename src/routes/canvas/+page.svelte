<script>

    import CanvasInput from "$lib/canvasSideBar/CanvasInput.svelte";
    import Sticker from "$lib/canvasSideBar/Sticker.svelte";
    import UploadBackground from "$lib/canvasSideBar/UploadBackground.svelte";
</script>

<div id="canvasContainer" class=" flex w-4/12 h-auto   flex-col   items-center bg-gray-300 ">
    <div
            id="canvasHolder"
            class="  text-black dark:text-white cursor-move w-full h-4/6   self-center  "
    >


      <CanvasInput/>
    </div> <div
            class="  text-black dark:text-white cursor-move w-full h-auto   self-center   "
    >


      <Sticker/>
    </div> <div
            class="  text-black dark:text-white cursor-move w-full h-4/6  self-center   "
    >


      <UploadBackground/>
    </div>

</div>

<slot/>

<!-- </div> -->
