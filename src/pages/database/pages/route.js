// Import from MUI
import { Grid } from '@mui/material';
// Import from project
import { RouteCard } from 'tables/Route/Route';

// --------- database - odometry --------- \\
const dbGyroscope = () => {
    return (
        <Grid container rowSpacing={2.75} columnSpacing={1}>
            {/* Main block */}
            <RouteCard />
        </Grid>
    );
};

export default dbGyroscope;
