// Import from MUI
import { Stack } from '@mui/material';
// Import from project
import { TableCard } from 'tables/Battery';
import { BatteryCarrousel } from '../../../carousels/battery'

// --------- database - odometry --------- \\
const dbActions = () => {
    return (
        <Stack spacing={2}>
            <BatteryCarrousel />
            <TableCard />
        </Stack>
    );
};

export default dbActions;
