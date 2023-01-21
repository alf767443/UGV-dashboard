// material-ui
import { Grid } from '@mui/material';
import CurrentDatetimeLine from 'graphs/motors/currentDatetimeLine' ;
import PWMDatetimeLine from 'graphs/motors/PWMDatetimeLine';
import RotationRateDatetimeLine from 'graphs/motors/rrateDatetimeLine';

// project import

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    return (
        <Grid container rowSpacing={1.75} columnSpacing={2}>
            {/* Main block */}
            <CurrentDatetimeLine />
            <PWMDatetimeLine />
            <RotationRateDatetimeLine />
        </Grid>
    );
};

export default DashboardDefault;
