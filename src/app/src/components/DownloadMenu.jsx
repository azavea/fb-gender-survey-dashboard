import React from 'react';
import { useSelector } from 'react-redux';
import {
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Portal,
} from '@chakra-ui/react';
import { FaDownload } from 'react-icons/fa';
import { combineCanvases, setBackgroundColor, addTitle } from '../utils/canvas';
import { downloadCSV } from '../utils/csv';

const download = (dataUrl, filename, filetype = 'png') => {
    var dl = document.createElement('a');
    document.body.appendChild(dl); // This line makes it work in Firefox.
    dl.setAttribute('href', dataUrl);
    dl.setAttribute('download', `${filename}.${filetype}`);
    dl.click();
    dl.remove();
};

const createFilename = (questionAttrs, years) => {
    // Assemble a file name from question components
    const { cat, geo, qcode, question } = questionAttrs;
    const catDisplay = cat ? `${cat}_` : '';
    const geoDisplay = geo ? `${geo}_` : '';
    return `${years.join('_')}_${qcode}_${geoDisplay}${catDisplay}${question}`;
};

const DownloadMenu = ({
    question,
    chartContainerRef,
    combineDir = 'horizontal',
    csvData,
}) => {
    const { currentYears } = useSelector(state => state.app);
    const saveImage = () => {
        // Use the ref for the chart container to find the canvas DOM element,
        // which is the chart itself
        const chartCanvases = chartContainerRef.current.querySelectorAll(
            'canvas'
        );

        const filename = createFilename(question, currentYears);

        // Depending on the chart type, there may be many canvas elements.
        // Coerce them into a single canvas, or if just one, use it directly.
        const chartCanvas =
            chartCanvases.length > 1
                ? combineCanvases(chartCanvases, combineDir)
                : chartCanvases[0];

        const title = `Question ${question.qcode}${
            question.type === 'ten' && currentYears.length < 2
                ? ` in ${question.geo} in ${question.year}`
                : ''
        }: ${question.question}`;

        const canvasWithTitle = addTitle(chartCanvas, title);

        // Set a white background instead of the default transparent
        const newCanvas = setBackgroundColor(canvasWithTitle, '#FFF');

        // Convert the entire new canvas to a base64 data URL
        const dataUrl = newCanvas.toDataURL('image/png');

        download(dataUrl, filename);
    };

    const saveCSV = () => downloadCSV(csvData);

    return (
        <Flex className='download-menu'>
            <Menu isLazy>
                <MenuButton
                    as={IconButton}
                    ml='auto'
                    aria-label='download chart image'
                    isRound={true}
                    icon={<FaDownload />}
                />
                <Portal>
                    <MenuList>
                        <MenuItem onClick={saveImage}>PNG</MenuItem>
                        <MenuItem onClick={saveCSV}>CSV</MenuItem>
                    </MenuList>
                </Portal>
            </Menu>
        </Flex>
    );
};

export default DownloadMenu;
