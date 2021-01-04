export const combineCanvases = (canvasList, direction) => {
    if (direction === 'horizontal') {
        return combineHorizontal(canvasList);
    } else {
        new Error(`Combine type: ${direction} not implemented`);
    }
};

export const combineHorizontal = canvasList => {
    const chartCanvas = document.createElement('canvas');
    chartCanvas.width = canvasList[0].width * canvasList.length;
    chartCanvas.height = canvasList[0].height;

    const newCtx = chartCanvas.getContext('2d');
    canvasList.forEach((c, i) => {
        newCtx.drawImage(c, 0 + c.width * i, 0);
    });

    return chartCanvas;
};

export const setBackgroundColor = (canvas, color) => {
    // Nivo canvas charts have a transparent background. Create a new canvas
    // and set a white background. Copy the canvas chart on top of it.
    const newCanvas = canvas.cloneNode(true);
    const ctx = newCanvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);
    ctx.drawImage(canvas, 0, 0);

    return newCanvas;
};
