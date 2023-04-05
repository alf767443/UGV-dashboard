// Import from MUI
import Grid from '@mui/material/Unstable_Grid2';
// Import from project
import { TableCard } from 'tables/Connection';
import Carousel from 'carousels/carousel'
import Plots from 'graphs/connectivity/index'

import styles from './styles';

// --------- database - odometry --------- \\
const dbActions = () => {
    return (
        <Grid container {...styles.grid.main}>
            <Grid item {...styles.grid.item}>
                <Carousel Plot={Plots} />
            </Grid>
            <Grid item {...styles.grid.item}>
                <TableCard />
            </Grid>
        </Grid>
    );
};

export default dbActions;
