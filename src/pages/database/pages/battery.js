// Import from MUI
import { Grid } from '@mui/material';
// Import from project
import { TableCard } from 'tables/Battery';

// --------- database - odometry --------- \\
const dbActions = () => {
    return (
        <Grid container rowSpacing={2.75} columnSpacing={1}>
            {/* Main block */}
            <TableCard />
        </Grid>
    );
};

export default dbActions;
