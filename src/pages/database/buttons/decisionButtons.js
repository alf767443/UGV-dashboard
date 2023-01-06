// material-ui
import { Grid, Typography } from '@mui/material';
import { AdminPanelSettings, SettingsRemote, SmartToy } from '@mui/icons-material';
// project import
import DataBaseButtons from './button';
import { gridParameters } from '../styles';

export const DecisionButtons = () => {
    return (
        <Grid>
            <Typography variant="h3" color="textSecondary">
                Decisions databases
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
                    <DataBaseButtons href={'dbs/decisions/administrator'} Title={'Administrator'} Icon={AdminPanelSettings} />
                </Grid>
                <Grid
                    item
                    xs={gridParameters.xs}
                    sm={gridParameters.sm}
                    md={gridParameters.md}
                    lg={gridParameters.lg}
                    xl={gridParameters.xl}
                >
                    <DataBaseButtons href={'dbs/decisions/remote'} Title={'Remote'} Icon={SettingsRemote} />
                </Grid>
                <Grid
                    item
                    xs={gridParameters.xs}
                    sm={gridParameters.sm}
                    md={gridParameters.md}
                    lg={gridParameters.lg}
                    xl={gridParameters.xl}
                >
                    <DataBaseButtons href={'dbs/decisions/robot'} Title={'Robot'} Icon={SmartToy} />
                </Grid>
            </Grid>
        </Grid>
    );
};
