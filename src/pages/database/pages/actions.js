// Import from MUI
import { Grid } from '@mui/material';
// Import from project
import { ActionsCard } from 'tables/Actions/Actions';

// --------- database - odometry --------- \\
const dbActions = () => {
    return (
        <Grid container rowSpacing={2.75} columnSpacing={1}>
            {/* Main block */}
            <ActionsCard />
        </Grid>
    );
};

export default dbActions;
