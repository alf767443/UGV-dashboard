
import React from "react";

import { Line } from '@ant-design/plots';


// Import from project
import { url, requestOptions } from 'API/url';
import MainCard from "components/MainCard";

import styles from "graphs/styles";
import { Typography, Stack } from '@mui/material';

var raw = (side) => JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_buffer",
	"collection": "Motor_Data",
	"pipeline": [
		{
			'$project': {
				'dateTime': {
					'$dateTrunc': {
						'date': '$dateTime', 
						'unit': 'minute'
					}
				}, 
				'left.rrate': 1, 
				'right.rrate': 1
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
				'rrate': {
					'$avg': "$" + side + ".rrate"
				}
			}
		}, {
			'$sort': {
				'_id': -1
			}
		}, {
			'$limit': 100
		}, {
			'$addFields': {
				'side': side
			}
		}
	]
});

export default class RotationRateDatetimeLine extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            data: [],
			right: [],
			left: [],
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
		fetch(url(), requestOptions(raw("left")))
		.then((response) => response.json())
		.then((json) => {
			this.setState({ left: json });
		})
		.catch((error) => {
			console.log(error);
		});
		fetch(url(), requestOptions(raw("right")))
		.then((response) => response.json())
		.then((json) => {
			this.setState({ right: json });
		})
		.catch((error) => {
			console.log(error);
		});
		this.setState({data: [...this.state.left, ...this.state.right]})
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
		yField: 'rrate',
		seriesField: 'side',
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
				text: "Motor rrate [rpm?]"
			}
		},tooltip: {
			formatter: (data) => {
				if (data['rrate'] != null){
					return { name: 'Rotation rate', value: data['rrate'].toFixed(1) + ' rpm?' };
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
						Battery rrate by time
					</Typography>
					<Line 
						{...this.config}
						{...styles.plot}
						data={this.state.data}
					/>
				</Stack>
			</MainCard>
		);
	}
}
