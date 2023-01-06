// Import from MUI
import { Grid } from '@mui/material';
// Import from project
import { OdometryCard } from 'tables/Position/Odometry';

// --------- database - odometry --------- \\
const dbOdometry = () => {
    return (
        <Grid container rowSpacing={2.75} columnSpacing={1}>
            {/* Main block */}
            <OdometryCard />
        </Grid>
    );
};

export default dbOdometry;
