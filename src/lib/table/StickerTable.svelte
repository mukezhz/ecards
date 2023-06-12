<script>
    import { onMount } from 'svelte';

    let isPageLoaded = true;




</script>


{#if !isPageLoaded}
    <div class="text-lg  spinnerClass text-black  flex flex-col justify-center item-center">
        <span class="text-red-700 text-lg ">Loading...</span>
    </div>
{:else}
    <div class="flex mt-4 ">
        <table class="shadow-lg text-sm w-full mx-5   bg-white  dark:bg-gray-800 dark:text-white text-black  ">
            <tr id="templatesTableRow" >
                <th class="bg-red-700 dark:bg-gray-800 ">
                    <!-- <label>
                    <input type="checkbox" class="checkbox" />
                </label> -->
                </th>
                <th class="bg-red-700  text-white  px-8 py-2 text-center dark:bg-gray-800  "
                >Id</th
                >
                <th class="bg-red-700  text-white px-8 py-2 dark:bg-gray-800">Sticker Name</th>
                <th class="bg-red-700  text-white px-8 py-2 dark:bg-gray-800">Priority</th>
                <th class="bg-red-700  text-white px-8 py-2 dark:bg-gray-800">Category</th>
                <th class="bg-red-700  text-white px-8 py-2 dark:bg-gray-800">Created on</th>
                <th class="bg-red-700  text-white px-8 py-2 dark:bg-gray-800">Publish</th>
                <th class="bg-red-700  text-white py-2 dark:bg-gray-800">Preview</th>
                <th class="bg-red-700  text-white px-8 py-2 dark:bg-gray-800">Action</th>
            </tr>
            <!-- {#each paginatedItems as item} -->
            <!--{#each paginatedItems as item, i}-->
            <!--    <tr class="2xl:text-3xl">-->
            <!--        <th>-->
            <!--            &lt;!&ndash; <label>-->
            <!--            <input type="checkbox" class="checkbox" />-->
            <!--        </label> &ndash;&gt;-->
            <!--        </th>-->
            <!--        <td class=" px-8 py-2 ">{item.id}</td>-->
            <!--        <td class=" px-8 py-2">{item.name}</td>-->

            <!--        <td class=" px-8 py-2">{item.priority}</td>-->
            <!--        <td class=" px-8 py-2">{item.category}</td>-->
            <!--        <td class=" px-8 py-2">{new Date(Number(item.timestamp)).toDateString()}</td>-->

            <!--        <td class=" px-8 py-2">{item.publish}</td>-->
            <!--        <td class="justify-center flex ml-0 items-center py-2">-->
            <!--            &lt;!&ndash; on click of image open image modal &ndash;&gt;-->
            <!--            <div class="flex justify-end    2xl:text-4xl">-->
            <!--                <label for={i} class=" modal-button">-->
            <!--                    <img-->
            <!--                            class="w-4 2xl:w-12 h-auto flex justify-center  items-center"-->
            <!--                            src={item.url}-->
            <!--                            alt={item.name}-->
            <!--                    />-->
            <!--                </label>-->
            <!--            </div>-->

            <!--            <input type="checkbox" id={i} class="modal-toggle" />-->
            <!--            <label-->
            <!--                    for={i}-->
            <!--                    class="modal cursor-pointer bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-4xl bg-opacity-50  border border-gray-100"-->
            <!--            >-->
            <!--                <label class="modal-box relative" for="">-->
            <!--                    <img-->
            <!--                            class="w-full h-auto flex justify-center items-center "-->
            <!--                            alt={item.name}-->
            <!--                            src={item.url}-->
            <!--                    />-->
            <!--                </label>-->
            <!--            </label>-->
            <!--            &lt;!&ndash; bb &ndash;&gt;-->
            <!--        </td>-->
            <!--        <td>-->
            <!--            <div class="flex justify-center items-center mb-2 list-none">-->
            <!--                <li class=" text-sm  w-4 mx-4 hover:bg-gray-300 p-0 cursor:move 2xl:w-10">-->
            <!--                   <a-->
            <!--                        title="Delete"-->
            <!--                >-->
            <!--                    <MdDelete /></a-->
            <!--                >-->
            <!--                </li>-->

            <!--            </div>-->

            <!--        </td>-->
            <!--    </tr>-->
            <!--{/each}-->
        </table>
    </div>

{/if}

<style>
    .spinnerClass {
        position: absolute;
        top: 20%;
        left: 50%;
    }
</style>
