// material-ui
import styles from 'graphs/styles';

import PercentageBullet from 'graphs/battery/percentageBullet';
import CurrentBullet from 'graphs/battery/currentBullet';
import VoltageBullet from 'graphs/battery/voltageBullet';
import TemperatureBullet from 'graphs/battery/temperatureBullet';
import { Stack } from '@mui/material';

const BatteryBullets = () => {
    return (
        <Stack {...styles.bullet.stack}>
            <PercentageBullet />
            <CurrentBullet />
            <VoltageBullet />
            <TemperatureBullet />
        </Stack>
    );
};

export default BatteryBullets;
