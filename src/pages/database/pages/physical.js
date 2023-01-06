// Import from MUI
import { Grid } from '@mui/material';
// Import from project
import { PhysicalCard } from 'tables/Battery/Physical';

// --------- database - physical --------- \\
const dbPhysical = () => {
    return (
        <Grid container rowSpacing={2.75} columnSpacing={1}>
            {/* Main block */}
            <PhysicalCard />
        </Grid>
    );
};

export default dbPhysical;
