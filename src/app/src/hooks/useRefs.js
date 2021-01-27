import React, { useRef } from 'react';

// A custom hook that creates an array of refs equaling the number of array
// elements passed to it. Useful for creating refs to be used inside of a loop
// where useRef is not valid.
const useRefs = length => {
    const containerRefs = useRef([]);
    if (containerRefs.current.length !== length) {
        containerRefs.current = Array(length)
            .fill()
            .map((_, i) => containerRefs.current[i] || React.createRef());
    }

    return containerRefs;
};

export default useRefs;
