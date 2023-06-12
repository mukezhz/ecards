<script>
	import MessageForm from '../form/MessageForm.svelte';


	//loading spinner
	let isPageLoaded = true;

	// onMount(() => {
	// 	setTimeout(() => {
	// 		isPageLoaded = true;
	// 	}, 2000);
	// });
	// onMount(() => {
	// 	fetch(`${globalUrl}message/show-all-message`).then((res) => {
	// 		// fetch('https://fakestoreapi.com/products').then((res) => {
	// 		res.json().then((data) => {
	// 			messageArr = data?.allMessageList ?? [];
	// 			// messageArr = data;
	// 			paginationMessageStore.set(messageArr);
	// 		});
	// 	});
	// });

</script>

<svelte:head>
	<title>Messages</title>
</svelte:head>
{#if !isPageLoaded}
	<div class="text-lg spinnerClass text-black  flex flex-col justify-center item-center">
<!--		<Spinner size="50" speed="750" color="#A82124" thickness="2" gap="40" />-->
		<span class="text-red-700 text-lg ">Loading...</span>
	</div>
{:else}
	<div class="flex justify-end  mt-4 mr-5">
		<button>
			<label for="my-modal-4" class=" modal-button">
				<span class="font-bold "> Add new Message +</span>
			</label>
		</button>
	</div>
<!--	<label for="my-modal-4" class="modal cursor-pointer">-->
<!--		<label class="modal-box relative dark:bg-gray-600" for="">-->
<!--			<MessageForm />-->
<!--		</label>-->
<!--	</label>-->

	<div class="flex mt-4 ">
		<table class="shadow-lg text-sm w-full mx-5   bg-white  dark:bg-gray-800 dark:text-white text-black  ">
			<tr id="templatesTableRow" >
				<th class="bg-red-700 dark:bg-gray-800">
					<!-- <label>
					<input type="checkbox" class="checkbox" />
				</label> -->
				</th>
				<th class="bg-red-700  text-white  px-8 py-2 text-center dark:bg-gray-800 ">Id</th>
				<th class="bg-red-700  text-white px-8 py-2 dark:bg-gray-800  ">Message</th>
				<th class="bg-red-700  text-white px-8 py-2 dark:bg-gray-800  ">Category</th>
				<th class="bg-red-700  text-white px-8 py-2 dark:bg-gray-800  ">Created on</th>
				<th class="bg-red-700  text-white px-8 py-2 dark:bg-gray-800 ">Publish</th>

				<th class="bg-red-700  text-white px-8 py-2 dark:bg-gray-800 ">Action</th>
			</tr>

			<!-- {#each messageArr as item} -->
			<!--{#each paginatedItems as item}-->
			<!--	<tr class="2xl:text-3xl">-->
			<!--		<th>-->
			<!--			&lt;!&ndash; <label>-->
			<!--			<input type="checkbox" class="checkbox" />-->
			<!--		</label> &ndash;&gt;-->
			<!--		</th>-->
			<!--		<td class=" px-8 py-2 ">{item.id}</td>-->
			<!--		<td class=" px-8 py-2">{item.message}</td>-->
			<!--		<td class=" px-8 py-2">{item.category}</td>-->
			<!--		<td class=" px-8 py-2">{new Date(Number(item.timestamp)).toDateString()}</td>-->

			<!--		<td class=" px-8 py-2">{item.trending}</td>-->

			<!--		<td>-->
			<!--			<div class="flex justify-around items-center mb-2 list-none">-->
			<!--				<li-->
			<!--					class=" text-sm  w-4 hover:bg-gray-300 active:bg-red-400 focus:bg-red-500 p-0 cursor:move 2xl:w-10  "-->
			<!--				>-->
			<!--					&lt;!&ndash; svelte-ignore a11y-missing-attribute &ndash;&gt;-->
			<!--					<a-->
			<!--						title="Delete"-->
			<!--						on:click={() => {-->
			<!--							let deleteItemId = item.id;-->
			<!--							deleteItemId, 'is my id';-->
			<!--							async function deleteTemplate(id) {-->
			<!--								let newArr = [];-->
			<!--								let newArrIndex = '';-->

			<!--								axios-->
			<!--									.delete(`${globalUrl}message/delete/${deleteItemId}`, {})-->
			<!--									.then(function (response) {-->
			<!--										paginationMessageStore.subscribe((paginationMessageStore) => {-->
			<!--											newArr = paginationMessageStore;-->
			<!--											newArrIndex = newArr.findIndex((item) => item.id === deleteItemId);-->
			<!--										});-->
			<!--										newArr.splice(newArrIndex, 1);-->
			<!--										paginationMessageStore.set(newArr);-->
			<!--									});-->
			<!--							}-->
			<!--							deleteTemplate(deleteItemId);-->
			<!--						}}-->
			<!--					>-->
			<!--						<MdDelete /></a-->
			<!--					>-->
			<!--				</li>-->
			<!--			</div>-->
			<!--		</td>-->
			<!--	</tr>-->
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
