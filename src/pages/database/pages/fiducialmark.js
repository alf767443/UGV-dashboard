// Import from MUI
import { Grid } from '@mui/material';
// Import from project
import { FiducialMarkCard } from 'tables/Position/FiducialMark';

// --------- database - odometry --------- \\
const dbFiducialmark = () => {
    return (
        <Grid container rowSpacing={2.75} columnSpacing={1}>
            {/* Main block */}
            <FiducialMarkCard />
        </Grid>
    );
};

export default dbFiducialmark;
