
import React from "react";

import { Area } from '@ant-design/plots';


// Import from project
import { url, requestOptions } from 'API/url';
import MainCard from "components/MainCard";

import styles from "graphs/styles";
import { Typography, Stack } from '@mui/material';

var raw = JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_datalake",
	"collection": "Battery",
	"pipeline": [
		{
			'$project': {
				'dateTime': {
					'$dateTrunc': {
						'date': '$dateTime', 
						'unit': 'minute'
					}
				}, 
				'percentage': {
				'$cond': [
					{
					'$eq': [
						'NaN', '$percentage'
					]
					}, null, '$percentage'
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
				'percentage': {
					'$avg': '$percentage'
				}
			}
		}, {
			'$sort': {
				'_id': -1
			}
		}, {
			'$limit': 100
		}, {
			'$project': {
				'percentage': {
					'$multiply': [
						'$percentage', 100
					]
				}
			}
		}
	]
});

export default class PercentageDatetimeArea extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            data: [],
			ticks: -1
        };
    }

	canUpdate(){
		if (JSON.parse(window.localStorage.getItem('fromLocal')) || this.state.ticks <= 0) {
			this.setState({ ticks: 10})
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
		})
		.catch((error) => {
			console.log(error);
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
			this.canUpdate();
		}, 1000)
	}

	config = {
		xField: '_id',
		yField: 'percentage',
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
				text: "Battery percentage [%]"
			}
		},tooltip: {
			formatter: (data) => {
				if (data['percentage'] != null){
					return { name: 'Percentage', value: data['percentage'].toFixed(1) + '%' };
				}
				return {};
			},	
		},
	}

	render() {
		
		return (
			<MainCard {...styles.maincard}>
				<Stack {...styles.stack}>
					<Typography {...styles.typography.title}>
						Battery percentage by time
					</Typography>
					<Area 
						{...this.config}
						{...styles.plot}
						data={this.state.data}
					/>
				</Stack>
			</MainCard>
		);
	}
}
