import type { Stage } from 'konva/lib/Stage';

const downloadURI = (uri: string, name: string) => {
	const link = document.createElement('a');
	link.download = name;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	// delete link;
};
export const handleSavetoPng = (stageKonva: Stage) => {
	const dataURL = stageKonva.toDataURL();
	downloadURI(dataURL, 'stage.png');
};
