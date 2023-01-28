// Import from React
import React, { Component } from 'react';

// Import from MUI
import { Typography, Grid, Pagination, Stack } from '@mui/material';
import MainCard from 'components/MainCard';

// Import from project
import CurrentDatetimeLine from 'graphs/motors/currentDatetimeLine' ;
import PWMDatetimeLine from 'graphs/motors/PWMDatetimeLine';
import RotationRateDatetimeLine from 'graphs/motors/rrateDatetimeLine';
import MotorBullets from 'graphs/motors/groupBullet';

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
                            <CurrentDatetimeLine />
                        </Grid>
                        <Grid item {...styles.grid.item} >
                            <PWMDatetimeLine />    
                        </Grid>
                    </Grid>
                );
            case 2:
                return(
                    <Grid container {...styles.grid.main} >
                        <Grid item {...styles.grid.item} >
                            <RotationRateDatetimeLine />
                        </Grid>
                        <Grid item {...styles.grid.item} >
                            <MotorBullets />    
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
                            Motors plots
                        </Typography>
                        {this.graphs()}
                        <Pagination count={2} defaultPage={1} siblingCount={0} page={this.state.page} onChange={this.hadleChange} />
                    </Stack>    
            </MainCard>
        );
    }
}

