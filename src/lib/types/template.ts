export interface KonvaShapeType {
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
