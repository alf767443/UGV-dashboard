// Import from MUI
import { Grid } from '@mui/material';
// Import from project
import { RemoteCard } from 'tables/Decisions/Remote';

// --------- database - odometry --------- \\
const dbRemote = () => {
    return (
        <Grid container rowSpacing={2.75} columnSpacing={1}>
            {/* Main block */}
            <RemoteCard />
        </Grid>
    );
};

export default dbRemote;
