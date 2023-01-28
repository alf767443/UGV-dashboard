// material-ui
import { Grid } from '@mui/material';

import Position_Map from 'graphs/maps/pointmaps/positionMap';
// import Track_Map from 'graphs/maps/pointmaps/trackMap';

import Battery_Bullet from 'graphs/battery/groupBullet';
import Battery_Area_Percentage from 'graphs/battery/percentageDatetimeArea';
import Battery_Area_Current from 'graphs/battery/currentDatetimeArea'

import Motor_Bullet from 'graphs/motors/groupBullet';
import Motor_Line_Current from 'graphs/motors/currentDatetimeLine';
import Motor_Line_PWM from 'graphs/motors/PWMDatetimeLine';

import styles from './styles';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export const DashboardDefault = () => {
    return (
        <Grid container {...styles.grid.main}>
            {/* Header */}

            <Grid container {...styles.grid.column.header}>

                <Grid container  {...styles.grid.column.subheader}>
                {/* Bullets */}
                    <Grid item {...styles.grid.column.graphs}>
                        <Battery_Bullet />    
                    </Grid>
                    <Grid item {...styles.grid.column.graphs}>
                        <Motor_Bullet />    
                    </Grid>
                </Grid>

                {/* Graphs */}
                <Grid container {...styles.grid.column.subheader}>
                    <Grid item {...styles.grid.column.graphs}>
                        <Battery_Area_Percentage />
                        <Battery_Area_Current />  
                    </Grid>
                    <Grid item {...styles.grid.column.graphs}>
                        <Motor_Line_PWM />
                        <Motor_Line_Current />  
                    </Grid>
                </Grid>
            </Grid>

            <Grid item {...styles.grid.column.map} >
                    <Position_Map />
                </Grid>
        </Grid>

    );
};


export default DashboardDefault ;
