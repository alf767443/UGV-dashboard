// Import from MUI
import { Stack } from '@mui/material';
// Import from project
import { TableCard } from 'tables/Motors';
import { Carrousel } from '../../../carousels/motors'

// --------- database - odometry --------- \\
const dbActions = () => {
    return (
        <Stack spacing={2}>
            <Carrousel />
            <TableCard />
        </Stack>
    );
};

export default dbActions;
