// Import from MUI
import { Stack } from '@mui/material';
// Import from project
import Plots from 'graphs/maps/index'
import Carousel from 'carousels/carousel';

// --------- database - odometry --------- \\
const dbActions = () => {
    return (
        <Stack spacing={2}>
            <Carousel Plot={Plots}/>
        </Stack>
    );
};

export default dbActions;
