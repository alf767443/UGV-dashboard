import * as React from 'react';
import Box from '@mui/material/Box';

const BoxOptions = {
    width: 300,
    height: 300,
    backgroundColor: 'primary.dark',
    '&:hover': {
        backgroundColor: 'primary.main',
        opacity: [0.9, 0.8, 0.7]
    }
};

const debugBoxe = () => {
    return <Box sx={BoxOptions} />;
};

export default debugBoxe;
