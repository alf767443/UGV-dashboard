// material-ui
import CurrentBullet from './currentBullet';
import { Box, Typography, Stack } from '@mui/material';
import PWMBullet from './PWMBullet';
import RrateBullet from './rrateBullet';
import MainCard from "components/MainCard";
import styles from 'graphs/styles';

// project import

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const MotorBullets = () => {
    return (
        <MainCard sx={styles.maincard.sx} content={styles.maincard.content}>
            <Box sx={styles.box.sx}>
                <Stack spacing={styles.stack.spacing} direction={styles.stack.direction} alignItems={styles.stack.alignItems}>
                    <Typography variant={styles.typography.title.variant} color={styles.typography.title.color}>
                        Motor actual states
                    </Typography>
                    <Stack direction={'row'} alignItems={'center'} spacing={0} >
                        <CurrentBullet />
                        <PWMBullet />
                        <RrateBullet />
                    </Stack>
                </Stack>
            </Box>
        </MainCard>
    );
};

export default MotorBullets;
