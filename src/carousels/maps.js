// Import from React
import React, { Component } from 'react';

// Import from MUI
import { Typography, Grid, Pagination, Stack } from '@mui/material';
import MainCard from 'components/MainCard';

// Import from project
import Map_Position from '../graphs/maps/pointmaps/positionMap'
import Map_Breadcrumbs from '../graphs/maps/pointmaps/trackMap'
import Heatmap_RTT from  '../graphs/maps/heatmaps/RTTHeatmap'
import Heatmap_Postion from  '../graphs/maps/heatmaps/positionHeatmap'
import Heatmap_Connectivity from  '../graphs/maps/heatmaps/connectivityHeatmap'

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
                            <Map_Position />
                        </Grid>
                        <Grid item {...styles.grid.item} >
                            <Map_Breadcrumbs />    
                        </Grid>
                    </Grid>
                );
            case 2:
                return(
                    <Grid container {...styles.grid.main} >
                        <Grid item {...styles.grid.item} >
                            <Heatmap_RTT />
                        </Grid>
                        <Grid item {...styles.grid.item} >
                            <Heatmap_Postion />
                        </Grid>
                    </Grid>
                )
            case 3:
                return(
                    <Grid container {...styles.grid.main} >
                        <Grid item {...styles.grid.item} >
                            <Heatmap_Connectivity />
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
                        Maps
                    </Typography>
                        {this.graphs()}
                    <Pagination count={3} defaultPage={1} siblingCount={0} page={this.state.page} onChange={this.hadleChange} />
                </Stack>    
            </MainCard>
        );
    }
}

