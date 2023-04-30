import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import RobotRegister from '../forms/RobotRegister';
import RobotWrapper from '../styles/RobotWrapper';

// ================================|| REGISTER ||================================ //

const Register = () => (
    <RobotWrapper>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h3">Sign up</Typography>
                    <Typography component={Link} to="/robot/login" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                        Already have an account?
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <RobotRegister />
            </Grid>
        </Grid>
    </RobotWrapper>
);

export default Register;
