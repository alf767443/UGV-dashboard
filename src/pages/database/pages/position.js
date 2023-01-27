// Import from MUI
import { Stack } from '@mui/material';
// Import from project
import { TableCard } from 'tables/Position';
import { Carrousel } from '../../../carousels/battery'

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
