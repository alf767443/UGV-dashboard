// Import from React
import React, { Component } from 'react';

// Import from MUI
import { Typography, Grid, Pagination, Stack } from '@mui/material';
import MainCard from 'components/MainCard';

// Import from project
import CurrentDatetimeArea from 'graphs/battery/currentDatetimeArea';
import PercentageDatetimeArea from 'graphs/battery/percentageDatetimeArea';
import PowerDatetimeArea from 'graphs/battery/powerDatetimeArea';
import VoltageDatetimeArea from 'graphs/battery/voltageDatetimeArea';
import BatteryBullets from 'graphs/battery/groupBullet';

import styles from './styles';

// --------- table physical data - index --------- \\
export class Carrousel extends Component {
    constructor(props) {
		super(props);
        this.state = {
            page: 1
        }
    }

    
    hadleChange = (event, value) =>{
        this.setState({page: value});
        this.componentDidMount();
    }

    componentDidMount = () => {
		this.graphs();
    }

    graphs = () => {
        switch(this.state.page){
            case 1:
                return(
                    <Grid container {...styles.grid.main} >
                        <Grid item {...styles.grid.item} >
                            <CurrentDatetimeArea />
                        </Grid>
                        <Grid item {...styles.grid.item} >
                            <PercentageDatetimeArea />    
                        </Grid>
                    </Grid>
                );
            case 2:
                return(
                    <Grid container {...styles.grid.main} >
                        <Grid item {...styles.grid.item} >
                            <PowerDatetimeArea />
                        </Grid>
                        <Grid item {...styles.grid.item} >
                            <VoltageDatetimeArea />    
                        </Grid>
                    </Grid>
                )
            case 3:
                return(
                    <Grid container {...styles.grid.main} >
                        <Grid item {...styles.grid.item} >
                            <BatteryBullets />
                        </Grid>
                    </Grid>
                )
        }
    }

    render() {
        return (
            <MainCard {...styles.box} >
                <Stack {...styles.stack}>
                    <Typography {...styles.typography}>
                        Battery plots
                    </Typography>
                    {this.graphs()}
                    <Pagination count={3} defaultPage={1} siblingCount={0} page={this.state.page} onChange={this.hadleChange} />
                </Stack>    
            </MainCard>
        );
    }
}

