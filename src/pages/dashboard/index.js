// material-ui
import { Grid } from '@mui/material';
import CurrentDatetimeArea from 'graphs/battery/currentDatetimeArea';
import PercentageDatetimeArea from 'graphs/battery/percentageDatetimeArea';

// project import

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    return (
        <Grid container rowSpacing={1.75} columnSpacing={2}>
            {/* Main block */}
            <PercentageDatetimeArea />
            <CurrentDatetimeArea />
        </Grid>
    );
};

export default DashboardDefault;
