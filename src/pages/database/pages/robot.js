// Import from MUI
import { Grid } from '@mui/material';
// Import from project
import { RobotCard } from 'tables/Decisions/Robot';

// --------- database - odometry --------- \\
const dbRobot = () => {
    return (
        <Grid container rowSpacing={2.75} columnSpacing={1}>
            {/* Main block */}
            <RobotCard />
        </Grid>
    );
};

export default dbRobot;
