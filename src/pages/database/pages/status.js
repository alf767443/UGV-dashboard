// Import from MUI
import { Grid } from '@mui/material';
// Import from project
import { StatusCard } from 'tables/Battery/Status';

// --------- database - status --------- \\
const dbStatus = () => {
    return (
        <Grid container rowSpacing={2.75} columnSpacing={1}>
            {/* Main block */}
            <StatusCard />
        </Grid>
    );
};

export default dbStatus;
