<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
    import Navbar from "$lib/Navbar/Navbar.svelte";
    import Sidebar from "$lib/sidebar/Sidebar.svelte";
    import BreadCrumb from "$lib/navBreadCrumb/BreadCrumb.svelte";
</script>


<Navbar/>

<div class="  	flex   ">
    <Sidebar/>

    <div
            class="w-full    text-center text-sm  dark:bg-gray-700 bg-gray-100 overflow-y-hidden"
            id="main-container"
    >
        <BreadCrumb />
        <slot />
    </div>
</div>
