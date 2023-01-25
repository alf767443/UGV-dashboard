// material-ui
import styles from 'graphs/styles';


import PercentageBullet from 'graphs/battery/percentageBullet';
import CurrentBullet from 'graphs/battery/currentBullet';
import VoltageBullet from 'graphs/battery/voltageBullet';
import { Box, Typography, Stack } from '@mui/material';
import MainCard from "components/MainCard";

const BatteryBullets = () => {
    return (
        <MainCard sx={styles.maincard.sx} content={styles.maincard.content}>
            <Box sx={styles.box.sx}>
                <Stack spacing={styles.stack.spacing} direction={styles.stack.direction} alignItems={styles.stack.alignItems}>
                    <Typography variant={styles.typography.title.variant} color={styles.typography.title.color}>
                        Battery actual states
                    </Typography>
                    <Stack direction={'column'} alignItems={'center'} spacing={0} >
                        <PercentageBullet />
                        <CurrentBullet />
                        <VoltageBullet />
                    </Stack>
                </Stack>
            </Box>
        </MainCard>
    );
};

export default BatteryBullets;
