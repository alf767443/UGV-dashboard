// Import from React
import React, { Component } from 'react';

// Import from MUI
import { Box, Typography, Stack, Pagination } from '@mui/material';
import MainCard from 'components/MainCard';

// Import from project
import tableSx from 'tables/tableSx';
import Map_Position from '../graphs/maps/pointmaps/positionMap'
import Map_Breadcrumbs from '../graphs/maps/pointmaps/trackMap'
import Heatmap_RTT from  '../graphs/maps/heatmaps/RTTHeatmap'
import Heatmap_Postion from  '../graphs/maps/heatmaps/positionHeatmap'
import Heatmap_Connectivity from  '../graphs/maps/heatmaps/connectivityHeatmap'

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
                    <Stack direction="row" spacing={2}>
                        <Map_Position />
                        <Map_Breadcrumbs />
                        <Heatmap_RTT />
                    </Stack>
                );
            case 2:
                return(
                    <Stack direction="row" spacing={2}>
                        <Heatmap_Postion />
                        <Heatmap_Connectivity />
                    </Stack>
                )
        }
    }

    render() {
        return (
            <MainCard sx={tableSx} content={false}>
                <Box sx={{ p: 3, pb: 0 }}>
                    <Stack spacing={2}>
                        <Typography variant="h3" color="textSecondary">
                            Maps
                        </Typography>
                        {this.graphs()}
                        <Pagination count={2} defaultPage={1} siblingCount={0} page={this.state.page} onChange={this.hadleChange} />
                    </Stack>    
                </Box>
            </MainCard>
        );
    }
}

