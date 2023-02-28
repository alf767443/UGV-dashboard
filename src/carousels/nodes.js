// Import from React
import React, { Component } from 'react';

// Import from MUI
import { Typography, Grid, Pagination, Stack } from '@mui/material';
import MainCard from 'components/MainCard';

// Import from project
import NodeMap from 'graphs/nodes/nodeMap';

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
                            <NodeMap />
                        </Grid>
                    </Grid>
                );
        }
    }

    render() {
        return (
            <MainCard {...styles.box} >
                <Stack {...styles.stack}>
                    <Typography {...styles.typography}>
                        Node plots
                    </Typography>
                    {this.graphs()}
                    <Pagination count={1} defaultPage={1} siblingCount={0} page={this.state.page} onChange={this.hadleChange} />
                </Stack>    
            </MainCard>
        );
    }
}

