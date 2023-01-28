// material-ui
import styles from 'graphs/styles';


import PercentageBullet from 'graphs/battery/percentageBullet';
import CurrentBullet from 'graphs/battery/currentBullet';
import VoltageBullet from 'graphs/battery/voltageBullet';
import TemperatureBullet from 'graphs/battery/temperatureBullet';
import { Typography, Stack } from '@mui/material';
import MainCard from "components/MainCard";

const BatteryBullets = () => {
    return (
        <MainCard {...styles.maincard}>
            <Stack {...styles.stack}>
                <Typography {...styles.typography.title}>
                    Battery actual states
                </Typography>
                <Stack {...styles.bullet.stack}>
                    <PercentageBullet />
                    <CurrentBullet />
                    <VoltageBullet />
                    <TemperatureBullet />
                </Stack>
            </Stack>
        </MainCard>
    );
};

export default BatteryBullets;
