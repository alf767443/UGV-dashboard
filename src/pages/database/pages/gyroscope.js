// Import from MUI
import { Grid } from '@mui/material';
// Import from project
import { GyroscopeCard } from 'tables/Position/Gyroscope';

// --------- database - odometry --------- \\
const dbGyroscope = () => {
    return (
        <Grid container rowSpacing={2.75} columnSpacing={1}>
            {/* Main block */}
            <GyroscopeCard />
        </Grid>
    );
};

export default dbGyroscope;
