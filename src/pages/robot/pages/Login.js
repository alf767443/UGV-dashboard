import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import RobotLogin from '../forms/RobotLogin';
import RobotWrapper from '../styles/RobotWrapper';

// ================================|| LOGIN ||================================ //

const Login = () => (
    <RobotWrapper>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h3">Login</Typography>
                    <Typography component={Link} to="/robot/register" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                        Don&apos;t have a robot?
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <RobotLogin />
            </Grid>
        </Grid>
    </RobotWrapper>
);

export default Login;
