// material-ui
import PercentageBullet from 'graphs/battery/percentageBullet';
import CurrentBullet from 'graphs/battery/currentBullet';
import VoltageBullet from 'graphs/battery/voltageBullet';
import { Stack } from '../../../node_modules/@mui/joy/index';

const BatteryBullets = () => {
    return (
        <Stack direction={'column'} alignItems={'center'} spacing={0} >
            <PercentageBullet />
            <CurrentBullet />
            <VoltageBullet />
        </Stack>
    );
};

export default BatteryBullets;
