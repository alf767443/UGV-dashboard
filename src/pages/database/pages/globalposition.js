// Import from MUI
import { Grid } from '@mui/material';
// Import from project
import { GlobalPostionCard } from 'tables/Position/GlobalPosition';

// --------- database - odometry --------- \\
const dbGlobalposition = () => {
    return (
        <Grid container rowSpacing={2.75} columnSpacing={1}>
            {/* Main block */}
            <GlobalPostionCard />
        </Grid>
    );
};

export default dbGlobalposition;
