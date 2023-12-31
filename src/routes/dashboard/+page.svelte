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
		konvaShapes = [
			{
				type: 'rect',
				rotation: 0,
				x: 300,
				y: 300,
				width: 400,
				height: 100,
				scaleX: 1,
				scaleY: 1,
				fill: 'red',
				name: 'rect1',
				draggable: true,
				image: img
			},
			{
				type: 'rect',
				rotation: 0,
				x: 150,
				y: 150,
				width: 100,
				height: 100,
				scaleX: 1,
				scaleY: 1,
				fill: 'green',
				name: 'rect2',
				draggable: true,
				image: img
			},
			{
				type: 'text',
				rotation: 0,
				x: 150,
				y: 150,
				scaleX: 1,
				scaleY: 1,
				name: 'text',
				draggable: true,
				fill: 'white',
				image: img,
				fontFamily: 'Calibri',
				fontSize: 30,
				text: 'Hello world'
			},
			{
				type: 'image',
				x: 300,
				y: 300,
				name: 'yoda',
				draggable: true,
				image: img
			}
		];
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
</script>

<div bind:this={canvasParentDiv} id="canvasparentdiv" class="w-full">
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
		bind:handle={stageKonva}
	>
		<Layer bind:handle={layerKonva}>
			{#each konvaShapes as konvaShape (konvaShape.name)}
				{#if konvaShape.type === 'rect'}
					<Rect config={konvaShape} on:transformend={handleTransformEnd} />
				{:else if konvaShape.type === 'image' && konvaShape.image}
					<Image config={konvaShape} on:transformend={handleTransformEnd} />
				{:else if konvaShape.type === 'text' && konvaShape.image}
					<Text config={konvaShape} on:transformend={handleTransformEnd} />
				{/if}
			{/each}
			<Transformer bind:handle={transformer} />
		</Layer>
	</Stage>
</div>
<button class="btn variant-filled" on:click={handleDelete}>Remove</button>
<button class="btn variant-filled" on:click={() => handleSavetoPng(stageKonva)}>SaveToPNG</button>
