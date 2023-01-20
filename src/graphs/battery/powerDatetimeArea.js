
import React from "react";

import { Area } from '@ant-design/plots';


// Import from project
import { url, requestOptions } from 'API/url';
import MainCard from "components/MainCard";

import styles from "graphs/styles";
import { Box, Typography, Stack } from '@mui/material';

var raw = JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_buffer",
	"collection": "Battery_Data",
	"pipeline": [
		{
			'$project': {
				'dateTime': {
					'$dateTrunc': {
						'date': '$dateTime', 
						'unit': 'minute'
					}
				}, 
				'voltage': {
					'$cond': [
						{
							'$eq': [
								'NaN', '$voltage'
							]
						}, 'None', '$voltage'
					]
				}, 
				'current': {
					'$cond': [
						{
							'$eq': [
								'NaN', '$current'
							]
						}, 'None', '$current'
					]
				}
			}
		}, {
			'$densify': {
				'field': 'dateTime', 
				'range': {
					'step': 1, 
					'unit': 'minute', 
					'bounds': 'full'
				}
			}
		}, {
			'$group': {
				'_id': '$dateTime', 
				'current': {
					'$avg': '$current'
				}, 
				'voltage': {
					'$avg': '$voltage'
				}
			}
		}, {
			'$set': {
				'power': {
					'$multiply': [
						'$current', '$voltage'
					]
				}
			}
		}, {
			'$project': {
				'_id': 1, 
				'power': 1
			}
		}, {
			'$sort': {
				'_id': -1
			}
		}, {
			'$limit': 100
		}
	]
});

export default class PowerDatetimeArea extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            data: [],
			ticks: -1
        };
    }

	canUpdate(){
		if (JSON.parse(window.localStorage.getItem('fromLocal')) || this.state.ticks <= 0) {
			this.setState({ ticks: 100})
			this.refreshList()
		} else if (!JSON.parse(window.localStorage.getItem('fromLocal'))){
			// From MongoDB cloud
			this.setState({ ticks: this.state.ticks - 1})
		}
	}

    refreshList() {
		fetch(url(), requestOptions(raw))
		.then((response) => response.json())
		.then((json) => {
			this.setState({ data: json });
			console.log(this.state.data)
		})
		.catch((error) => {
			console.log(error);
		});
    }

    componentDidMount = () => {
		this.timer();
    }

	componentWillUnmount = () =>{
		clearInterval(this.timer)
	}

	timer = () => {
		setInterval(() => {
			this.canUpdate();
		}, 1000)
	}

	config = {
		padding: 'auto',
		xField: '_id',
		yField: 'current',
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
				text: "Battery power [W]"
			}
		},tooltip: {
			formatter: (data) => {
				if (data['current'] != null){
					return { name: 'Power', value: data['power'].toFixed(1) + ' W' };
				}
				return {};
			},	
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
							Battery current by time
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
