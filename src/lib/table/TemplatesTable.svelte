<script>


	//loading spinner
	let isPageLoaded = true;


</script>

{#if !isPageLoaded}
	<div class="text-lg spinnerClass text-black  flex flex-col justify-center item-center">
<!--		<Spinner size="50" speed="750" color="#A82124" thickness="2" gap="40" />-->
		<span class="text-red-700 text-lg ">Loading...</span>
	</div>
{:else}
	<div class="flex my-4 items-center">
		<label
			class=" my-2 label-optional ml-4 label-optional-personal label-required-public dark:text-white text-black"
			for="categoryTemplateValue"><h1>Category:</h1></label
		>
		<select
			id="categoryTemplateValue"
			name="categoryTemplate"
			class=" text-sm h-10 mx-2 dark:text-white text-black"
			required
		>
			<option value="all">Select a category</option>
			<!--{#each categoryOptionArr as item}-->
			<!--	<option-->
			<!--		value={item}-->
			<!--		on:click={() => {-->
			<!--			let categoryName = item;-->
			<!--			console.log(categoryName);-->
			<!--			async function categoryNameFunc(categoryName) {-->
			<!--				if (item.toLowerCase() === 'all') {-->
			<!--					axios.get(`${globalUrl}template/show-all-templates`, {}).then((response) => {-->
			<!--						allTemplates = [...response.data.templates];-->
			<!--					});-->
			<!--				}-->
			<!--				axios-->
			<!--					.get(`${globalUrl}template/get-templates-of-this-category/${categoryName}`, {})-->
			<!--					.then(function (response) {-->
			<!--						allTemplates = [...response.data.templates];-->
			<!--					})-->
			<!--					.catch(function (error) {-->
			<!--						error;-->
			<!--					});-->
			<!--			}-->
			<!--			categoryNameFunc(categoryName);-->
			<!--		}}>{item}</option-->
			<!--	>-->
			<!--{/each}-->
		</select>
	</div>

	<!-- ????????-->
	<!-- </div> -->
	<div class="flex mt-4 ">
		<!-- <div class="relative"> -->
		<table
			class="shadow-lg text-sm w-full mx-5     bg-white  dark:bg-gray-800 dark:text-white text-black  "
		>
			<tr id="templatesTableRow" class="">

				<th class="bg-red-700  text-white  px-8 py-2 text-center dark:bg-gray-800 ">Id</th>
				<th class="bg-red-700  text-white px-8 py-2 dark:bg-gray-800  ">Title</th>
				<th class="bg-red-700  text-white px-8 py-2 dark:bg-gray-800 "> Preview</th>
				<th class="bg-red-700  text-white px-8 py-2 dark:bg-gray-800 "> Tags</th>
				<th class="bg-red-700  text-white px-8 py-2 dark:bg-gray-800 "> Category</th>
				<th class="bg-red-700  text-white px-8 py-2 dark:bg-gray-800 "> Created on</th>
				<th class="bg-red-700  text-white px-8 py-2 dark:bg-gray-800 "> Priority</th>
				<th class="bg-red-700  text-white px-8 py-2 dark:bg-gray-800 ">isTrending</th>
				<th class="bg-red-700  text-white px-8 py-2 dark:bg-gray-800 ">Action</th>
			</tr>

			<!--{#each paginatedItems as item}-->
			<!--	<tr class="2xl:text-3xl">-->
			<!--	-->

			<!--		<td class=" px-8 py-2">{item.id}</td>-->
			<!--		<td class=" px-8 py-2">{item.title}</td>-->
			<!--		&lt;!&ndash; on click of image open image modal &ndash;&gt;-->
			<!--		<div class="flex justify-center mt-2 items-center-->
			<!--		">-->
			<!--			<label for={item.id} class=" modal-button">-->
			<!--				<img-->
			<!--					class="w-4 h-auto flex justify-center items-center"-->
			<!--					src={item.url}-->
			<!--					alt={item.name}-->
			<!--				/>-->
			<!--			</label>-->
			<!--		</div>-->

			<!--		<input type="checkbox" id={item.id} class="modal-toggle" />-->
			<!--		<label-->
			<!--			for={item.id}-->
			<!--			class="modal cursor-pointer bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-4xl bg-opacity-50  border border-gray-100"-->
			<!--		>-->
			<!--			<label class="modal-box relative" for="">-->
			<!--				<img-->
			<!--					class="w-full h-auto flex justify-center items-center"-->
			<!--					alt={item.name}-->
			<!--					src={item.url}-->
			<!--				/>-->
			<!--			</label>-->
			<!--		</label>-->
			<!--		&lt;!&ndash; bb &ndash;&gt;-->

			<!--		<td class=" px-8 py-2">{item.tags}</td>-->
			<!--		<td class=" px-8 py-2">{item.categoryName}</td>-->
			<!--		<td class=" px-8 py-2">{new Date(Number(item.timestamp)).toDateString()}</td>-->
			<!--		<td class=" px-8 py-2">{item.priority}</td>-->
			<!--		<td class=" px-8 py-2">{item.trending}</td>-->

			<!--		<td>-->
			<!--			<div class="flex justify-around items-center mb-2 list-none">-->
			<!--				<li class=" text-sm  w-4 hover:bg-gray-300 p-0 cursor:move 2xl:w-10">-->
			<!--					&lt;!&ndash; svelte-ignore a11y-missing-attribute &ndash;&gt;-->
			<!--					<a-->
			<!--						title="Delete"-->
			<!--						on:click={() => {-->
			<!--							let deleteItemId = item.id;-->
			<!--							async function deleteTemplate(id) {-->
			<!--								let newArr = [];-->
			<!--								let newArrIndex = '';-->

			<!--								axios-->
			<!--									.delete(`${globalUrl}template/delete/${deleteItemId}`, {})-->
			<!--									.then(function (response) {-->
			<!--										paginationtemplatesTableStore.subscribe(-->
			<!--											(paginationtemplatesTableStore) => {-->
			<!--												newArr = paginationtemplatesTableStore;-->
			<!--												newArrIndex = newArr.findIndex((item) => item.id === deleteItemId);-->
			<!--											}-->
			<!--										);-->
			<!--										newArr.splice(newArrIndex, 1);-->
			<!--										paginationtemplatesTableStore.set(newArr);-->
			<!--									});-->

			<!--								// paginationCategoryStore.subscribe((paginationCategoryStore) => {-->
			<!--								// 		newArr = paginationCategoryStore;-->
			<!--								// 		newArrIndex = newArr.findIndex((item) => item.id === deleteItemId);-->
			<!--								// 	});-->
			<!--								// 	newArr.splice(newArrIndex, 1);-->
			<!--								// 	paginationCategoryStore.set(newArr);-->
			<!--								// });-->
			<!--							}-->
			<!--							deleteTemplate(deleteItemId);-->
			<!--						}}-->
			<!--					>-->
			<!--						<MdDelete /></a-->
			<!--					>-->
			<!--				</li>-->
			<!--				&lt;!&ndash; <div class="flex justify-around items-center"> &ndash;&gt;-->

			<!--				<li class="  text-sm   w-4 2xl:w-10">-->
			<!--					&lt;!&ndash; svelte-ignore missing-declaration &ndash;&gt;-->
			<!--					&lt;!&ndash; svelte-ignore a11y-missing-attribute &ndash;&gt;-->
			<!--					<a-->
			<!--						title="Mark as Trending"-->
			<!--						on:click={() => {-->
			<!--							let newArr = [];-->
			<!--							const templateId = item.id;-->
			<!--							let isTrending = item.trending;-->
			<!--							isTrending;-->
			<!--							async function setTrendingTemplate() {-->
			<!--								// post:"/set-trending/{name}/{prev_status}",-->
			<!--								try {-->
			<!--									const response = await axios.post(-->
			<!--										`${globalUrl}template/set-trending/${templateId}/${isTrending}`,-->
			<!--										{}-->
			<!--									);-->
			<!--									paginationtemplatesTableStore.subscribe((paginationtemplatesTableStore) => {-->
			<!--										newArr = paginationtemplatesTableStore;-->
			<!--									});-->
			<!--									const filteredData = newArr.find((data) => data.id === templateId);-->
			<!--									filteredData.trending = response.data.trending;-->
			<!--									console.log(filteredData);-->

			<!--									paginationtemplatesTableStore.set(newArr);-->
			<!--								} catch (e) {-->
			<!--									console.log(e);-->
			<!--								}-->
			<!--							}-->
			<!--							setTrendingTemplate();-->
			<!--						}}-->
			<!--					>-->
			<!--						<DiMarkdown />-->
			<!--					</a>-->
			<!--				</li>-->
			<!--				&lt;!&ndash; </div> &ndash;&gt;-->
			<!--			</div>-->
			<!--			&lt;!&ndash; </ul>-->
			<!--				</div>-->
			<!--			</div>-->
			<!--		</div> &ndash;&gt;-->
			<!--		</td>-->
			<!--	</tr>-->
			<!--{/each}-->
		</table>
	</div>
	<!-- </div>   -->


{/if}

<style>
	.spinnerClass {
		position: absolute;
		top: 20%;
		left: 50%;
	}
</style>
