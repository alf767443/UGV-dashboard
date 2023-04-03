// Import from React
import React, { Component } from 'react';

// Import from MUI
import { Typography, Grid, Pagination, Stack } from '@mui/material';
import MainCard from 'components/MainCard';

import styles from './styles';
import SimplePlot from 'graphs/simplePlot';
import LargePlot from 'graphs/largePlot';
import BigPlot from 'graphs/bigPlot';

import { round } from 'lodash';

// --------- table physical data - index --------- \\
export default class Carousel extends Component {
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

    numberPages = () => {
        return round(this.props.Plot.SimplePlot.length/2) + this.props.Plot.LargePlot.length + this.props.Plot.BigPlot.length
    }

    graphs = () => {
        let init = 0
        let end = 0
        
        switch(true){
            case this.state.page <= round(this.props.Plot.SimplePlot.length/2):
                console.log('a');
                init = ((this.state.page - 1) * 2)
                end = (this.state.page * 2 > this.props.Plot.SimplePlot.length ? init + 1: init + 2)
                return (
                    <Grid container {...styles.grid.main} >
                        { this.props.Plot.SimplePlot.slice( init , end).map(element => (
                            <Grid item {...styles.grid.item} key={element.key} >
                            <SimplePlot graph={element.plot} title={element.title} position={null} static={true}/>
                            </Grid>
                        ))} 
                    </Grid>
                )
            case this.state.page > round(this.props.Plot.SimplePlot.length/2) &&  this.state.page <= round(this.props.Plot.SimplePlot.length/2) + this.props.Plot.LargePlot.length :
                console.log('b');
                init = (this.state.page - round(this.props.Plot.SimplePlot.length/2)) - 1
                end = init + 1
                return (
                    <Grid container {...styles.grid.main} >
                        { this.props.Plot.LargePlot.slice( init , end).map(element => (
                            <Grid item {...styles.grid.item} key={element.key} >
                            <LargePlot graph={element.plot} title={element.title} position={null} static={true}/>
                            </Grid>
                        ))} 
                    </Grid>
                )
            case this.state.page > round(this.props.Plot.SimplePlot.length/2) + this.props.Plot.LargePlot.length &&  this.state.page <= round(this.props.Plot.SimplePlot.length/2) + this.props.Plot.LargePlot.length + this.props.Plot.BigPlot.length :
                console.log('c')      
                init = (this.state.page - round(this.props.Plot.SimplePlot.length/2) + this.props.Plot.LargePlot.length) - 1
                end = init + 1
                console.log(this.props.Plot.BigPlot.slice( init , end)) 
                return (
                    <Grid container {...styles.grid.main} >
                        { this.props.Plot.BigPlot.slice( init , end).map(element => (
                            <Grid item {...styles.grid.item} key={element.key} >
                            <BigPlot graph={element.plot} title={element.title} position={null} static={true}/>
                            </Grid>
                        ))} 
                    </Grid>
                )
            default:
                <></>
        }
    }

    render() {
        return (
            <MainCard {...styles.box} >
                <Stack {...styles.stack}>
                    <Typography {...styles.typography}>
                        {this.props.title}
                    </Typography>
                    {this.graphs()}
                    <Pagination count={this.numberPages()} defaultPage={1} siblingCount={0} page={this.state.page} onChange={this.hadleChange} />
                </Stack>    
            </MainCard>
        );
    }
}

