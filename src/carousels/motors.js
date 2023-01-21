// Import from React
import React, { Component } from 'react';

// Import from MUI
import { Box, Typography, Stack, Pagination } from '@mui/material';
import MainCard from 'components/MainCard';

// Import from project
import tableSx from 'tables/tableSx';
import CurrentDatetimeLine from 'graphs/motors/currentDatetimeLine' ;
import PWMDatetimeLine from 'graphs/motors/PWMDatetimeLine';
import RotationRateDatetimeLine from 'graphs/motors/rrateDatetimeLine';

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
                        <CurrentDatetimeLine />
                        <PWMDatetimeLine />
                        <RotationRateDatetimeLine />
                    </Stack>
                );
        }
    }

    render() {
        return (
            <MainCard sx={tableSx} content={false}>
                <Box sx={{ p: 3, pb: 0 }}>
                    <Stack spacing={2}>
                        <Typography variant="h3" color="textSecondary">
                            Motors plots
                        </Typography>
                        {this.graphs()}
                        <Pagination count={1} defaultPage={1} siblingCount={0} page={this.state.page} onChange={this.hadleChange} />
                    </Stack>    
                </Box>
            </MainCard>
        );
    }
}

