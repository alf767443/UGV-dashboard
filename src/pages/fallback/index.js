// material-ui
import { Grid, Stack, Typography } from '@mui/material';
import RobotWrapper from 'pages/robot/styles/RobotWrapper';
import { RobotOutlined } from '@ant-design/icons';
// project import

// ================================|| LOGIN ||================================ //

const FallbackPage = () => (
    <RobotWrapper>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack direction="column" justifyContent="space-between" alignItems="center" sx={{ mb: { xs: -0.5, sm: 0.5 } }} color='#373737'>
                    <RobotOutlined style={{fontSize: '200px', color: '#373737'}} twoToneColor="#eb2f96"/>
                    <Typography variant="h1">Page not found</Typography>
                </Stack>
            </Grid>
        </Grid> 
    </RobotWrapper>
);

export default FallbackPage;
