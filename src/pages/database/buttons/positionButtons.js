// material-ui
import { Grid, Typography } from '@mui/material';
import { TireRepair, QrCode2, Explore, GpsFixed } from '@mui/icons-material';
// project import
import DataBaseButtons from './button';
import { gridParameters } from '../styles';

export const PositionButtons = () => {
    return (
        <Grid>
            <Typography variant="h3" color="textSecondary">
                Position databases
            </Typography>
            <Grid
                container
                columnSpacing={gridParameters.columnSpacing}
                justifyContent={gridParameters.justifyContent}
                direction={gridParameters.direction}
                alignItems={gridParameters.alignItems}
                columns={gridParameters.columns}
            >
                <Grid
                    item
                    xs={gridParameters.xs}
                    sm={gridParameters.sm}
                    md={gridParameters.md}
                    lg={gridParameters.lg}
                    xl={gridParameters.xl}
                >
                    <DataBaseButtons href={'dbs/position/odometry'} Title={'Whell'} Icon={TireRepair} />
                </Grid>
                <Grid
                    item
                    xs={gridParameters.xs}
                    sm={gridParameters.sm}
                    md={gridParameters.md}
                    lg={gridParameters.lg}
                    xl={gridParameters.xl}
                >
                    <DataBaseButtons href={'dbs/position/fiducialmark'} Title={'Fiducial marks'} Icon={QrCode2} />
                </Grid>
                <Grid
                    item
                    xs={gridParameters.xs}
                    sm={gridParameters.sm}
                    md={gridParameters.md}
                    lg={gridParameters.lg}
                    xl={gridParameters.xl}
                >
                    <DataBaseButtons href={'dbs/position/gyroscope'} Title={'Gyroscope'} Icon={Explore} />
                </Grid>
                <Grid
                    item
                    xs={gridParameters.xs}
                    sm={gridParameters.sm}
                    md={gridParameters.md}
                    lg={gridParameters.lg}
                    xl={gridParameters.xl}
                >
                    <DataBaseButtons href={'dbs/position/globalPosition'} Title={'Global position'} Icon={GpsFixed} />
                </Grid>
            </Grid>
        </Grid>
    );
};
