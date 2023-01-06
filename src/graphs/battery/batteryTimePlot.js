
import React from "react";

import { Area } from '@ant-design/plots';


// Import from project
import { url } from 'djangoAPI/url';
import MainCard from "components/MainCard";

import styles from "graphs/styles";
import { Box, Typography, Stack } from '@mui/material';

const urls = 'battery/query=2';

export default class BatteryTimePlot extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            data: []
        };
    }

    refreshList() {
		fetch(url.API + urls)
            .then((response) => response.json())
            .then((json) => {
                this.setState({ data: json });
            })
			.catch((error) => {
				console.log(error)
			});
    }

    componentDidMount = () => {
		this.refreshList();
		this.timer();
    }

	componentWillUnmount = () =>{
		clearInterval(this.timer)
	}

	timer = () => {
		setInterval(() => {
			this.refreshList();
		}, 5000)
	}

	config = {
		padding: 'auto',
		xField: 'dateTime',
		yField: 'Percent',
		xAxis: {
			tickCount: 5,
			type: 'time',
			mask: 'DD/MMM/YY HH:mm',
			title: {
				text: "Time"
			}
		},
		yAxis:{
			tickCount: 10,
			title: {
				text: "Battery charge [%]"
			}
		},
		//seriesField: 'Status',
		smooth: true
	}

	render() {
		return (
			<MainCard sx={styles.maincard.sx} content={styles.maincard.content}>
				<Box sx={styles.box.sx}>
					<Stack spacing={styles.stack.spacing} direction={styles.stack.direction} alignItems={styles.stack.alignItems}>
						<Typography variant={styles.typography.variant} color={styles.typography.color}>
							Battery charge by time
						</Typography>
						<Area 
							{...this.config} 
							data={this.state.data} 
							{... styles.graph.medium} 
						/>
					</Stack>
				</Box>
			</MainCard>
		);
	}
}
