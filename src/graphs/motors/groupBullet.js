// material-ui
import CurrentBullet from './currentBullet';
import { Stack } from '../../../node_modules/@mui/joy/index';
import PWMBullet from './PWMBullet';
import RrateBullet from './rrateBullet';

// project import

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const MotorBullets = () => {
    return (
        <Stack direction={'column'} alignItems={'center'} spacing={0} >
            <CurrentBullet />
            <PWMBullet />
            <RrateBullet />
        </Stack>
    );
};

export default MotorBullets;
