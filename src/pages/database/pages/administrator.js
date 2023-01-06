// Import from MUI
import { Grid } from '@mui/material';
// Import from project
import { AdministratorCard } from 'tables/Decisions/Administrator';

// --------- database - odometry --------- \\
const dbAdministrator = () => {
    return (
        <Grid container rowSpacing={2.75} columnSpacing={1}>
            {/* Main block */}
            <AdministratorCard />
        </Grid>
    );
};

export default dbAdministrator;
