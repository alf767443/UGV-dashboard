// material-ui
import CurrentBullet from './currentBullet';
import { Typography, Stack } from '@mui/material';
import PWMBullet from './PWMBullet';
import RrateBullet from './rrateBullet';
import MainCard from "components/MainCard";
import styles from 'graphs/styles';

// project import

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const MotorBullets = () => {
    return (
        <MainCard {...styles.maincard}>
            <Stack {...styles.stack}>
                <Typography {...styles.typography.title}>
                    Motor actual states
                </Typography>
                <Stack {...styles.bullet.stack}>
                    <CurrentBullet />
                    <PWMBullet />
                    <RrateBullet />
                 </Stack>
            </Stack>
        </MainCard>
    );
};

export default MotorBullets;
