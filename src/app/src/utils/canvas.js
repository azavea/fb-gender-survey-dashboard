export const combineCanvases = (canvasList, direction) => {
    if (direction === 'horizontal') {
        return combineHorizontal(canvasList);
    } else {
        new Error(`Combine type: ${direction} not implemented`);
    }
};

function generateWrappedText(context, text, width, font) {
    context.font = font;

    // distance from left
    const x = 20;
    // distance from top; this will change for each line
    let y = 50;
    // max width of text is width of container minus twice the desired padding
    const maxWidth = width - x * 2;
    // line height for text is 1.2 * text size
    const lineHeight = 50;

    const words = text.split(' ');
    let line = '';
    const lines = [];
    words.forEach((word, i) => {
        let testLine = line + word + ' ';
        let metrics = context.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth && i > 0) {
            lines.push({ line, x, y });
            line = word + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    });

    lines.push({ line, x, y });
    return { textHeight: y + lineHeight, lines };
}

function wrapText(context, lines, font) {
    context.font = font;
    context.fillStyle = '#000';

    lines.forEach(item => {
        const { line, x, y } = item;
        context.fillText(line, x, y);
    });

    return context;
}

export const addTitle = (canvas, title) => {
    const chartCanvas = document.createElement('canvas');
    chartCanvas.width = canvas.width;
    chartCanvas.height = canvas.height;

    const newCtx = chartCanvas.getContext('2d');

    const font = '40px sans-serif';

    const { textHeight, lines } = generateWrappedText(
        newCtx,
        title,
        chartCanvas.width,
        font
    );

    chartCanvas.height = canvas.height + textHeight;

    newCtx.fillStyle = '#fff';
    newCtx.fillRect(0, 0, chartCanvas.width, chartCanvas.height);

    wrapText(newCtx, lines, font);

    newCtx.drawImage(canvas, 0, textHeight);

    return chartCanvas;
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
