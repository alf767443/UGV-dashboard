// material-ui
import { Grid, Typography } from '@mui/material';
import { BatteryCharging90, BatterySaver } from '@mui/icons-material';
// project import
import DataBaseButtons from './button';
import { gridParameters } from '../styles';

export const BatteryButtons = () => {
    return (
        <Grid>
            <Typography variant="h3" color="textSecondary">
                Battery databases
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
                    <DataBaseButtons href={'dbs/battery/physical'} Title={'Physical'} Icon={BatterySaver} />
                </Grid>
                <Grid
                    item
                    xs={gridParameters.xs}
                    sm={gridParameters.sm}
                    md={gridParameters.md}
                    lg={gridParameters.lg}
                    xl={gridParameters.xl}
                >
                    <DataBaseButtons href={'dbs/battery/status'} Title={'Status'} Icon={BatteryCharging90} />
                </Grid>
            </Grid>
        </Grid>
    );
};
