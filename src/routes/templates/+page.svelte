<script lang="ts">
    import {Image, Layer, Rect, Stage, Text, Transformer} from 'svelte-konva';
    import type {Transformer as TransformerType} from 'konva/lib/shapes/Transformer';
    import type {Image as ImageType} from 'konva/lib/shapes/Image';
    import type {Rect as RectType} from 'konva/lib/shapes/Rect';
    import type {Layer as LayerType} from 'konva/lib/Layer';
    import type {Stage as StageType} from 'konva/lib/Stage';
    import {onMount} from 'svelte';
    import type {KonvaEventObject} from 'konva/lib/Node';
    import type {PageServerData} from './$types';
    import {handleSavetoPng} from '$lib/utils/download';
    import type {KonvaShapeType} from '$lib/types/template';
    import {generateRandomId} from "$lib/utils";


    let height = 0, width = 0, x = 0, y = 0;
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
        const selectedNode = getSelectedNode(transformer)
        selectedNode?.on("change", ev => {
            console.log(ev.target.height())
        })
        selectedNode?.on("dragstart", (ev) => {
            height = ev.target.height()
            width = ev.target.width()
            x = ev.target.x()
            y = ev.target.y()
        })
        selectedNode?.on("dragend", (ev) => {
            height = ev.target.height()
            width = ev.target.width()
            x = ev.target.x()
            y = ev.target.y()
        })
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
                name: generateRandomId(15),
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
                name: generateRandomId(15),
                draggable: true,
                image: img
            }
        ];
    };

    const handleDimension = (e: CustomEvent, side: string) => {
        const event = e as unknown as KeyboardEvent
        const target = e.target as unknown as HTMLInputElement
        if (event.key === "Enter") {
            const selectedNode = getSelectedNode(transformer);
            console.log(selectedNode)
            switch (side) {
                case 'x':
                    selectedNode?.setAttr("x", x || 10)
                    break
                case 'y':
                    selectedNode?.setAttr("y", y || 10)
                    break
                case 'height': {
                    const shape = konvaShapes.find(shape => shape.name === selectedNode.name())
                    shape.height = height
                    konvaShapes = [...konvaShapes]
                    // selectedNode?.setAttr("height", height || 300)
                }
                    break
                case 'width':
                    selectedNode?.setAttr("width", width || 300)
                    break
                default:
                    console.log("UNKNOWN")
            }
            // if (side === 'x') {
            // 	x = target.value;
            // 	console.log(height, width)
            // 	selectedNode?.setAttr("x", Number(width) ||  10)
            // } else if(side === 'y'){
            // 	y = target.value;
            // 	console.log(height, width)
            // 	selectedNode?.setAttr("height", Number(height) || 10)
            // }
            console.log("Enterereer")
        }

        if (!konvaShapes) return;
    };

    const getSelectedNode = (transformer: TransformerType) => {
        if (!transformer) {
            return;
        }

        // here we need to manually attach or detach Transformer node
        const stage = transformer.getStage();
        if (!stage) return;
        const selectedNode = stage.findOne('.' + selectedShapeName);

        // do nothing if selected node is already attached
        if (selectedNode === transformer.getNode()) {
            return selectedNode;
        }
        return selectedNode;
    }

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
                name: generateRandomId(15),
                draggable: true,
                fill: "#B71D1C",
                fontFamily: 'Calibre',
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
            <span>Enter text here:<br/></span>
            <form on:submit|preventDefault={handleText}>
                <input class="p-1 text-black" on:input={(e) => changeInput(e)}/>
                <!-- <button type="submit">Enter</button> -->
            </form>
        </div>

        <div class="mt-5">
            <label for="myfile">Select a file:</label>
            <input class="mt-2" id="myfile" name="myfile" on:change={(e) => handleImage(e)} type="file"/>
        </div>
    </div>
    <div bind:this={canvasParentDiv} class="flex-[0.6]">
        <Stage
                class="bg-gray-500"
                bind:handle={stageKonva}
                config={{
				width: canvasParentDiv?.clientWidth || 800,
				height: canvasParentDiv?.clientHeight || 800,
				x: 1,
				y: 1,
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
                <Transformer bind:handle={transformer}/>
            </Layer>
        </Stage>
    </div>
    <div class={`flex-[0.2] ${openEditor ? 'visible' : 'hidden'} ml-1`}>
        {#if konvaType === 'text'}
            <div>
                <h3>Font Style</h3>
                <div class="gap-5 mt-3">
                    <button class="border border-white rounded-lg p-1">Bold</button>
                    <button class="border border-white rounded-lg p-1 ml-1">Bold Italics</button>
                    <button class="border border-white rounded-lg p-1 ml-1">Italics</button>
                    <button class="border border-white rounded-lg p-1 ml-1">Normal</button>
                </div>
            </div>
            <div class="mt-10">
                <h3>Font Color</h3>
                <form class="flex gap-5 mt-3" on:submit|preventDefault={handleTextColor}>
                    <input
                            type="color"
                            on:change={(e) => changeInputColor(e)}
                            class="h-7 flex items-center rounded justify-center self-center border-1 text-white border-gray-500 w-16 dark:text-gray-800"
                    />
                </form>
            </div>
        {:else if konvaType === 'image' || konvaType === 'rect'}
            <div>
                <div>
                    <h3>Position</h3>
                    <div class="flex gap-5 mt-3">
                        <div class="flex items-center gap-1">
                            <h3>X:&nbsp;</h3>
                            <input
                                    bind:value={x}
                                    class="w-10 p-1 text-black"
                                    on:keyup|preventDefault={(e) => handleDimension(e, 'x')}
                            />
                        </div>
                        <div class="flex items-center gap-1">
                            <h3>Y:&nbsp;</h3>
                            <input
                                    bind:value={y}
                                    class="w-10 p-1 text-black"
                                    on:keyup|preventDefault={(e) => handleDimension(e, 'y')}
                            />
                        </div>
                    </div>
                </div>

                <div class="mt-10">
                    <h3>Dimension</h3>
                    <div class="flex gap-5 mt-3">
                        <div class="flex items-center gap-1">
                            <h3>Width:&nbsp;</h3>
                            <input
                                    bind:value={width}
                                    class="w-10 p-1 text-black rounded-md"
                                    on:keyup|preventDefault={(e) => handleDimension(e, 'width')}
                            />
                        </div>
                        <div class="flex items-center gap-1">
                            <h3>Height:&nbsp;</h3>
                            <input
                                    bind:value={height}
                                    class="w-10 p-1 text-black rounded-md"
                                    on:keyup|preventDefault={(e) => handleDimension(e, 'height')}
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
