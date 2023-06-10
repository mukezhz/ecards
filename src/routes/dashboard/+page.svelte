<script lang="ts">
	import { Stage, Layer, Rect, Transformer, Image, Text } from 'svelte-konva';
	import Konva from 'konva';
	import type { Transformer as TransformerType } from 'konva/lib/shapes/Transformer';
	import type { Image as ImageType } from 'konva/lib/shapes/Image';
	import type { Rect as RectType } from 'konva/lib/shapes/Rect';
	import type { Layer as LayerType } from 'konva/lib/Layer';
	import { onMount } from 'svelte';

	onMount(() => {
		const img = document.createElement('img');
		img.src = 'https://konvajs.org/assets/yoda.jpg';
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
	interface konvaShapeType {
		type: string;
		rotation?: number;
		x: number;
		y: number;
		width?: number;
		height?: number;
		scaleX?: number;
		scaleY?: number;
		fill?: string;
		name: string;
		draggable: boolean;
		image: CanvasImageSource;
		fontFamily?: string;
		fontSize?: number;
		text?: string;
	}
	let konvaShapes: konvaShapeType[] = [];

	let transformer: TransformerType;
	let selectedShapeName = '';

	function handleStageMouseDown(e: CustomEvent<Konva.KonvaEventObject<MouseEvent | TouchEvent>>) {
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
</script>

<Stage
	config={{ width: window.innerWidth, height: window.innerHeight }}
	on:mousedown={handleStageMouseDown}
	on:touchstart={handleStageMouseDown}
>
	<Layer bind:handle={layerKonva}>
		{#each konvaShapes as konvaShape}
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

<button class="btn variant-filled" on:click={handleDelete}>Remove</button>
