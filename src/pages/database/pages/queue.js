// Import from MUI
import { Grid } from '@mui/material';
// Import from project
import { QueueCard } from 'tables/Actions/Queue';

// --------- database - odometry --------- \\
const dbQueue = () => {
    return (
        <Grid container rowSpacing={2.75} columnSpacing={1}>
            {/* Main block */}
            <QueueCard />
        </Grid>
    );
};

export default dbQueue;
