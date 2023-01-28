// Import from MUI
import { Stack } from '@mui/material';
// Import from project
import { Carrousel } from '../../../carousels/maps'

// --------- database - odometry --------- \\
const dbActions = () => {
    return (
        <Stack spacing={2}>
            <Carrousel />
        </Stack>
    );
};

export default dbActions;
