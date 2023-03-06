// material-ui
import CurrentBullet from './currentBullet';
import { Stack } from '@mui/material';
import PWMBullet from './PWMBullet';
import RrateBullet from './rrateBullet';
import styles from 'graphs/styles';

// project import

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const MotorBullets = () => {
    return ( 
        <Stack {...styles.bullet.stack}>
            <CurrentBullet />
            <PWMBullet />
            <RrateBullet />
        </Stack>
    );
};

export default MotorBullets;
