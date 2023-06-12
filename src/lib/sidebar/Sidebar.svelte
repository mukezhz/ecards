<script>
    import FaHome from 'svelte-icons/fa/FaHome.svelte';
    import FaImages from 'svelte-icons/fa/FaImages.svelte';
    import IoMdText from 'svelte-icons/io/IoMdText.svelte';
    import FaSearch from 'svelte-icons/fa/FaSearch.svelte';
    import MdFace from 'svelte-icons/md/MdFace.svelte';
    import GiHamburgerMenu from 'svelte-icons/gi/GiHamburgerMenu.svelte';


    //upload a new theme template from the local device
    let files = [];
    $: file = files[0];

     function toggleSidebarFunc() {
        let toggleSidebar = document.getElementsByClassName('sidebarToggleDiv');
        let iconSidebar = document.getElementsByClassName('iconsSidebarToggle');
        let toggleDarkBtnDiv = document.getElementsByClassName('toggleDarkBtn');

        if (toggleSidebar.style.display === 'none') {
            toggleSidebar.style.display = 'block';
            iconSidebar.style.display = 'none';
            toggleDarkBtnDiv.style = 'flex-direction: row;';
            toggleDarkBtnDiv.style = 'align-items:center;';
        } else {
            toggleSidebar.style.display = 'none';
            iconSidebar.style.display = 'block';
            toggleDarkBtnDiv.style = 'flex-direction: column;';
        }
    }

</script>

<div
        class="bg-red   text-black  flex    text-center      "
>
    <!-- toggle Sidebar code -->

    <ul class="    mt-4 text-sm	  items-center">
        <div id="sidebarToggleDiv">
            <div class="flex flex-row    items-center  ml-4 " id="toggleDarkBtn">
                <div class="form-control">
                    <label
                            class="label cursor-pointer w-6   focus:text-gray-200 active:text-gray-400"
                            id="toggleSidebarBtn"
                            on:click={toggleSidebarFunc}
                    >
<!--                        <GiHamburgerMenu />-->
                    </label>
                </div>
            </div>
            <li
                    class="text-white text-black  hover:bg-white  hover:text-black  "
            >
                <a
                        href="/dashboard"
                        class="   flex items-center  p-2  font-normal	 rounded-lg  "
                >
                    <div class="flex items-center align-middle ">
						<span class=" ml-3 w-5 flex    ">
							<FaHome />
						</span>
                        <span class="whitespace-nowrap ml-4 center flex   "> Dashboard</span>
                    </div>
                </a>
            </li>

            <td>
                <div>
                    <li
                            class="collapse-title truncate flex   text-white   "
                    >
                        <div class="flex items-center align-middle ">
							<span class=" ml-1 w-5 h-5 flex  ">
								<FaImages />
							</span>
                            <span class="whitespace-nowrap  ml-4 text-white   center flex  ">
								Templates</span
                            >
                        </div>
                    </li>
                    <div class="collapse-content  ">
                        <div class="  justify-center relative   " id="toggleContent">
                            <li class=" w-full  text-black     ">
                                <ul id="dropdown-example" class="  space-y-2">
                                    <li>
                                        <a
                                                href="/template"
                                                class=" hover:text-black dark:text-white dark:hover:bg-white dark:hover:text-black   hover:bg-red-700  truncate flex items-center w-full p-2 text-sm   transition duration-75 rounded-lg  "
                                        >Trending E-cards</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                                href="/template"
                                                class=" truncate flex dark:hover:bg-white dark:hover:text-black   dark:text-white items-center text-sm hover:text-black  hover:bg-red-700 w-full p-2 transition duration-75 rounded-lg group  "
                                        >Most Downloaded
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                                href="/template"
                                                class=" flex items-center dark:hover:bg-white dark:hover:text-black   dark:text-white  w-full hover:text-black  hover:bg-red-700 p-2 text-sm transition duration-75 rounded-lg group  "
                                        >All E-cards</a
                                        >
                                    </li>
                                </ul>
                            </li>
                        </div>
                    </div>
                </div>
            </td>

            <!-- ///////////////////////////////////////////////////////////////////// -->

            <li
                    class="w-full  py-3   text-black hover:bg-red-700 dark:text-white dark:hover:bg-white dark:hover:text-black   hover:text-black "
            >
                <a
                        href="/sticker"
                        class=" flex items-center p-2 text-base font-normal  rounded-lg  "
                >
                    <div class="flex items-center">
						<span class=" ml-3 w-5 h-5 flex  ">
							<MdFace />
						</span><span class=" whitespace-nowrap  ml-4 center flex  "> Stickers</span>
                    </div>
                </a>
            </li>
            <li
                    class="w-full  py-3 dark:text-white  items-center  text-black hover:bg-red-700 dark:hover:bg-white dark:hover:text-black   hover:text-black  "
            >
                <a
                        href="/message"
                        class=" flex items-center p-2 text-base font-normal  rounded-lg  "
                >
                    <div class="flex  items-center">
						<span class=" ml-3 w-5 h-5 flex   mt-1">
							<IoMdText />
						</span>
                        <span
                                class="whitespace-nowrap  ml-4 center flex  dark:hover:bg-white dark:hover:text-black  "
                        >
							Messages</span
                        >
                    </div>
                </a>
            </li>

            <li
                    class="w-full   py-3 dark:text-white text-black hover:bg-red-700 hover:text-black dark:hover:bg-white dark:hover:text-black  "
            >
                <a
                        href="/category"
                        class=" flex items-center p-2 text-base font-normal  rounded-lg  "
                >
                    <div class="flex items-center align-middle">
						<span class=" ml-3 w-5 h-5 flex  mt-1">
							<FaSearch />
						</span><span class=" whitespace-nowrap  ml-4 center flex  "
                    >Categories</span
                    >
                    </div>
                </a>
            </li>
        </div>

        <!-- sidebar icon div -->

        <div id="iconsSidebarToggle" class="  hidden justify-center w-12 ">
            <!-- toggle Sidebar code -->
            <div class="flex flex-col   justify-center items-center   " id="toggleDarkBtns">
                <div>
                    <!-- <button class=" text-black dark:text-blue-200 w-8 h-16" on:click={toggle}> -->
                    <!-- <FaCloudMoon /> -->
                    <!-- </button> -->
                </div>

                <div class="form-control">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label
                            class="label cursor-pointer w-6 focus:text-gray-200 active:text-gray-400"
                            id="toggleSidebarBtns" >
                            on:click={toggleSidebarFunc}
                        >

<!--                        <GiHamburgerMenu />-->
                    </label>
                </div>
            </div>

            <ul class="   justify-center items-center w-full  	flex flex-col ">
                <li
                        class="w-full dark:text-white    hover:bg-red-700   hover:text-black dark:hover:text-black  dark:hover:bg-white    "
                >
                    <a
                            href="/"
                            class="   flex items-center justify-center  p-2 text-base font-normal rounded-lg  "
                    >
                        <div class="flex items-center align-middle ">
							<span class=" w-5 h-5 flex   ">
								<FaHome />
							</span>
                        </div>
                    </a>
                </li>

                <div class="collapse">
                    <input type="checkbox" class="peer" />
                    <li
                            class="collapse-title truncate  dark:text-white text-black  hover:bg-red-700 	dark:hover:bg-white     "
                    >
						<span class="w-5 ml-2 flex   dark:text-white">
							<FaImages />
						</span>
                    </li>
                    <div class="collapse-content p-0 m-0">
                        <div class="  justify-center relative   " id="toggleContents">
                            <li class="  text-black    ">
                                <ul id="dropdown-examples" class="  ">
                                    <li>
                                        <a
                                                href="/"
                                                class=" flex items-center  justify-center dark:text-white dark:hover:bg-white dark:hover:text-black   hover:bg-red-700   hover:text-black p-2 text-base font-normal  transition duration-75 rounded-lg group "
                                        >A</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                                href="/"
                                                class="hover:bg-red-700 justify-center dark:text-white dark:hover:bg-white dark:hover:text-black   hover:text-black truncate flex items-center w-full p-2 text-base font-normal  transition duration-75 rounded-lg group "
                                        >T</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                                href="/"
                                                class=" truncate flex items-center  justify-center dark:text-white dark:hover:bg-white dark:hover:text-black   hover:bg-red-700 hover:text-black w-full p-2 text-base font-normal transition duration-75 rounded-lg group   "
                                        >M
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </div>
                    </div>
                </div>

                <li
                        class="w-full py-2  mb-3 hover:bg-red-700   hover:text-black  dark:hover:bg-white dark:hover:text-black   "
                >
                    <a
                            href="/"
                            class=" flex items-center  text-base font-normal justify-center  rounded-lg dark: "
                    >
                        <div class="flex items-center align-middle">
							<span class="  w-5 h-5 flex ">
								<MdFace />
							</span>
                        </div>
                    </a>
                </li>
                <li
                        class="w-full  hover:bg-red-700   hover:text-black mb-3  text-black dark:text-white dark:hover:bg-white dark:hover:text-black     "
                >
                    <a
                            href="/messageTableRoute"
                            class=" flex items-center p-2 text-base font-normal justify-center  rounded-lg dark: "
                    >
                        <div class="flex items-center align-middle">
							<span class="  w-5 h-5 flex  ">
								<IoMdText />
							</span>
                        </div>
                    </a>
                </li>

                <li
                        class="w-full   text-black  hover:bg-red-700   hover:text-black dark:text-white dark:hover:bg-white dark:hover:text-black    "
                >
                    <a
                            href="/"
                            class=" flex items-center p-2 text-base font-normal justify-center  rounded-lg dark: "
                    >
                        <div class="flex items-center align-middle">
							<span class="  w-5 h-5 flex  ">
								<FaSearch />
							</span>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </ul>
</div>

<style>
    .collapse-title,
    .collapse > input[type='checkbox'] {
        width: 100%;
        padding: 1rem;
        padding-right: 1rem;
        padding-right: 3rem;
        min-height: 0;
        transition: background-color 0.2s ease-in-out;
    }
</style>
