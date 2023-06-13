<script lang="ts">
	import { Stage, Layer, Rect, Transformer, Image, Text } from 'svelte-konva';
	import type { Transformer as TransformerType } from 'konva/lib/shapes/Transformer';
	import type { Image as ImageType } from 'konva/lib/shapes/Image';
	import type { Rect as RectType } from 'konva/lib/shapes/Rect';
	import type { Layer as LayerType } from 'konva/lib/Layer';
	import type { Stage as StageType } from 'konva/lib/Stage';
	import { onMount } from 'svelte';
	import type { KonvaEventObject } from 'konva/lib/Node';
	import type { PageServerData } from './$types';
	import { handleSavetoPng } from '$lib/utils/download';
	import type { KonvaShapeType } from '$lib/types/template';

	onMount(() => {
		const img = document.createElement('img');
		img.src = '/favicon.png';
		konvaShapes = [] as KonvaShapeType[];
	});

	let konvaShapes: KonvaShapeType[] = [];

	let transformer: TransformerType;
	let selectedShapeName = '';

	function handleStageMouseDown(e: CustomEvent<KonvaEventObject<MouseEvent | TouchEvent>>) {
		const konvaEvent = e.detail;
		// clicked on stage - clear selection
		if (konvaEvent.target === konvaEvent.target.getStage()) {
			selectedShapeName = '';
			updateTransformer();
			return;
		}

		// clicked on transformer - do nothing
		const clickedOnTransformer = konvaEvent.target.getParent().className === 'Transformer';
		if (clickedOnTransformer) {
			return;
		}
		// find clicked rect by its name
		const name = konvaEvent.target.name();
		const shape = konvaShapes.find((r) => r.name === name);

		selectedShapeName = shape ? name : '';
		updateTransformer();
		renderKonva = konvaEvent.target as ImageType | RectType;
	}

	function handleTransformEnd() {
		// find element in our state
		const rect = konvaShapes.find((r) => r.name === selectedShapeName);
		if (!rect) return;
		// change fill
		// rect.fill = Konva.Util.getRandomColor();
	}

	function updateTransformer() {
		if (!transformer) return;

		// here we need to manually attach or detach Transformer node
		const stage = transformer.getStage();
		if (!stage) return;
		const selectedNode = stage.findOne('.' + selectedShapeName);

		// do nothing if selected node is already attached
		if (selectedNode === transformer.getNode()) {
			return;
		}

		if (selectedNode) {
			// attach to another node
			selectedNode.moveToTop();
			transformer.nodes([selectedNode]);
		} else {
			// remove transformer
			transformer.nodes([]);
		}
	}

	let layerKonva: LayerType;
	let renderKonva: RectType | ImageType;
	function handleDelete(event: Event) {
		renderKonva.remove();
	}
	let canvasParentDiv: HTMLDivElement;

	export let data: PageServerData;
	let stageKonva: StageType;

	let textVal: string = '';
	let fileVal;
	let openEditor: boolean = false;
	let konvaType: string = 'text';

	const handleKonvaELement = (type) => {
		openEditor = true;
		konvaType = type;
	};

	const changeInput = (e: Event) => {
		const target = e.target as unknown as HTMLInputElement;
		textVal = target.value;
	};

	const handleText = (e: Event) => {
		if (!textVal) return;
		if (!konvaShapes) return;
		konvaShapes = [
			...konvaShapes,
			{
				type: 'text',
				rotation: 0,
				x: 150,
				y: 150,
				scaleX: 1,
				scaleY: 1,
				name: crypto.randomUUID(),
				draggable: true,
				fill: 'white',
				fontFamily: 'Calibri',
				fontSize: 30,
				text: textVal,
				image: document.createElement('img')
			}
		];
	};

	const handleImage = (event: Event) => {
		const target = event.target as unknown as HTMLInputElement;
		const img = document.createElement('img');

		if (target.files.length > 0) {
			img.src = URL.createObjectURL(target.files.item(0));
		}

		if (!konvaShapes) return;
		konvaShapes = [
			...konvaShapes,
			{
				type: 'image',
				width: 300,
				height: 300,
				x: 100,
				y: 100,
				name: 'image',
				draggable: true,
				image: img
			}
		];
	};

	const handleDimension = (e: Event, side: string) => {
		const target = e.target as unknown as HTMLInputElement;
		let width, height;
		if (side === 'x') {
			width = target.value;
		} else {
			height = target.value;
		}
		if (!konvaShapes) return;
		konvaShapes = [
			...konvaShapes,
			{
				type: 'rect',
				rotation: 0,
				x: 150,
				y: 150,
				width: width ?? 100,
				height: height ?? 100,
				scaleX: 1,
				scaleY: 1,
				fill: 'green',
				name: 'rect2',
				draggable: true,
				image: document.createElement('img')
			}
		];
	};

	let colorVal: string;
	const changeInputColor = (e: Event) => {
		const target = e.target as unknown as HTMLInputElement;
		colorVal = target.value;
		console.log(colorVal);
	};

	const handleTextColor = () => {
		if (!colorVal) return;
		if (!konvaShapes) return;
		konvaShapes = [
			...konvaShapes,
			{
				type: 'text',
				rotation: 0,
				x: 150,
				y: 150,
				scaleX: 1,
				scaleY: 1,
				name: crypto.randomUUID(),
				draggable: true,
				fill: '#B71D1C',
				fontFamily: 'Calibri',
				fontSize: 30,
				text: textVal,
				image: document.createElement('img')
			}
		];
	};

	const handleBold = () => {
		if (!colorVal) return;
		if (!konvaShapes) return;
		konvaShapes = [
			...konvaShapes,
			{
				type: 'text',
				rotation: 0,
				x: 150,
				y: 150,
				scaleX: 1,
				scaleY: 1,
				name: crypto.randomUUID(),
				draggable: true,
				fill: colorVal,
				fontFamily: 'Calibri',
				fontSize: 30,
				text: textVal,
				image: document.createElement('img')
			}
		];
	};

	const handleFontSize = () => {};

	const handleFontFamily = (e: HTMLInputElement) => {
		if (!konvaShapes) return;
		konvaShapes = [
			{
				type: 'text',
				rotation: 0,
				x: 150,
				y: 150,
				scaleX: 1,
				scaleY: 1,
				name: crypto.randomUUID(),
				draggable: true,
				fill: 'white',
				fontFamily: e.target.value,
				fontSize: 30,
				text: textVal,
				image: document.createElement('img')
			}
		];
	};
</script>

<div class="flex gap-3 p-5">
	<div class="flex-[0.2] flex-col">
		<div>
			<span>Enter text here:<br /></span>
			<form on:submit|preventDefault={handleText}>
				<input
					class="py-1 px-2 text-black outline-none rounded-md"
					on:input={(e) => changeInput(e)}
				/>
				<!-- <button type="submit">Enter</button> -->
			</form>
		</div>

		<div class="mt-5">
			<label for="myfile">Select a file:</label>
			<input type="file" id="myfile" name="myfile" class="mt-2" on:change={(e) => handleImage(e)} />
		</div>
	</div>
	<div bind:this={canvasParentDiv} id="canvasparentdiv" class="flex-[0.6]">
		<Stage
			class="bg-gray-500"
			config={{
				width: canvasParentDiv?.clientWidth || 800,
				height: canvasParentDiv?.clientHeight || 800,
				x: 10,
				y: 10,
				clearBeforeDraw: true,
				preventDefault: true,
				visible: true
			}}
			on:mousedown={handleStageMouseDown}
			on:touchstart={handleStageMouseDown}
		>
			<Layer bind:handle={layerKonva}>
				{#each konvaShapes as konvaShape (konvaShape.name)}
					{#if konvaShape.type === 'rect'}
						<Rect
							config={konvaShape}
							on:transformend={handleTransformEnd}
							on:click={() => handleKonvaELement(konvaShape.type)}
						/>
					{:else if konvaShape.type === 'image' && konvaShape.image}
						<Image
							config={konvaShape}
							on:transformend={handleTransformEnd}
							on:click={() => handleKonvaELement(konvaShape.type)}
						/>
					{:else if konvaShape.type === 'text' && konvaShape.image}
						<Text
							config={konvaShape}
							on:transformend={handleTransformEnd}
							on:click={() => handleKonvaELement(konvaShape.type)}
						/>
					{/if}
				{/each}
				<Transformer bind:handle={transformer} />
			</Layer>
		</Stage>
	</div>
	<div class={`flex-[0.2] ${openEditor ? 'visible' : 'hidden'} ml-1`}>
		{#if konvaType === 'text'}
			<div>
				<h3>Font Style:</h3>
				<div class="gap-5 mt-3">
					<button class="border border-white rounded-lg p-1" onClick={handleBold}>Bold</button>
					<button class="border border-white rounded-lg p-1 ml-2">Bold Italics</button>
					<button class="border border-white rounded-lg p-1 ml-2">Italics</button>
					<button class="border border-white rounded-lg p-1 ml-2">Normal</button>
				</div>
			</div>
			<div class="mt-7">
				<h3>Font Color:</h3>
				<form class="flex gap-5 mt-" on:submit|preventDefault={handleTextColor}>
					<input
						type="color"
						on:change={(e) => changeInputColor(e)}
						class="h-7 flex items-center outline-none rounded justify-center self-center border-1 text-white border-gray-500 w-16 dark:text-gray-800"
					/>
				</form>
			</div>

			<div class="mt-7">
				<h3>Font Size</h3>
				<form class="flex gap-5 mt-2" on:submit|preventDefault={handleFontSize}>
					<input
						class="w-10 py-1 px-2 text-black outline-none rounded-md"
						on:input|preventDefault={(e) => handleDimension(e, 'x')}
					/>
				</form>
			</div>

			<div class="mt-7">
				<h3>Font Family</h3>
				<select
					name="selectFontFamily"
					id="fontInput"
					on:change|preventDefault={(e) => handleFontFamily(e)}
					class="text-black w-40 h-10 rounded text-sm p-2"
				>
					<option> Serif </option>
					<option> Brush Script MT </option>
					<option> Cursive </option>
					<option> Lucida Handwriting </option>
					<option> Sans-Serif </option>
					<option> Garamond </option>
					<option> Verdana </option>
					<option> Courier New </option>
				</select>
			</div>
		{:else if konvaType === 'image' || konvaType === 'rect'}
			<div>
				<div>
					<h3>Position</h3>
					<div class="flex gap-5 mt-3">
						<div class="flex items-center gap-1">
							<h3>X:&nbsp;</h3>
							<input
								class="w-10 p-1 text-black"
								on:input|preventDefault={(e) => handleDimension(e, 'x')}
							/>
						</div>
						<div class="flex items-center gap-1">
							<h3>Y:&nbsp;</h3>
							<input
								class="w-10 p-1 text-black"
								on:input|preventDefault={(e) => handleDimension(e, 'y')}
							/>
						</div>
					</div>
				</div>

				<div class="mt-7">
					<h3>Dimension</h3>
					<div class="flex gap-5 mt-3">
						<div class="flex items-center gap-1">
							<h3>Width:&nbsp;</h3>
							<input
								class="w-10 p-1 text-black rounded-md"
								on:input|preventDefault={(e) => handleDimension(e, 'x')}
							/>
						</div>
						<div class="flex items-center gap-1">
							<h3>Height:&nbsp;</h3>
							<input
								class="w-10 p-1 text-black rounded-md"
								on:input|preventDefault={(e) => handleDimension(e, 'y')}
							/>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<button class="btn variant-filled" on:click={handleDelete}>Remove</button>
<button class="btn variant-filled" on:click={() => handleSavetoPng(stageKonva)}>SaveToPNG</button>
