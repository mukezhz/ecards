
<script>

    import CanvasInput from "$lib/canvasSideBar/CanvasInput.svelte";
    import Sticker from "$lib/canvasSideBar/Sticker.svelte";
    import UploadBackground from "$lib/canvasSideBar/UploadBackground.svelte";
</script>
<div class="flex  ">

<div id="canvasContainer" class=" flex  flex-col h-screen   items-center bg-gray-300 ">
    <div
            id="canvasHolder"
            class="  text-black dark:text-white cursor-move w-full   self-center  "
    >


        <CanvasInput/>
    </div> <div
        class="  text-black dark:text-white cursor-move w-full    self-center   "
>


    <Sticker/>
</div> <div
        class="  text-black dark:text-white cursor-move w-full   self-center   "
>

    <UploadBackground/>
</div>

</div>

<slot/>
</div>

<!-- </div> -->
