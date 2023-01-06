// material-ui
import { Grid, Typography } from '@mui/material';
import { Route } from '@mui/icons-material';
// project import
import DataBaseButtons from './button';
import { gridParameters } from '../styles';

export const RouteButtons = () => {
    return (
        <Grid>
            <Typography variant="h3" color="textSecondary">
                Route databases
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
                    <DataBaseButtons href={'dbs/routes/routes'} Title={'Routes'} Icon={Route} />
                </Grid>
            </Grid>
        </Grid>
    );
};
