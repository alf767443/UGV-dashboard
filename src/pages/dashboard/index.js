// material-ui
import { Grid } from '@mui/material';
import PercentageDatetimeArea from 'graphs/battery/percentageDatetimeArea';

// project import

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    return (
        <Grid container rowSpacing={1.75} columnSpacing={2}>
            {/* Main block */}
            <PercentageDatetimeArea />
        </Grid>
    );
};

export default DashboardDefault;
