
import React from "react";

import { Line } from '@ant-design/plots';


// Import from project
import { url, requestOptions } from 'API/url';
import MainCard from "components/MainCard";

import styles from "graphs/styles";
import { Typography, Stack } from '@mui/material';

var raw = (side) => JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_datalake",
	"collection": "Motor",
	"pipeline": [
		{
			'$project': {
				'dateTime': {
					'$dateTrunc': {
						'date': '$dateTime', 
						'unit': 'minute'
					}
				}, 
				'leftPwmDrive': 1, 
				'rightPwmDrive': 1
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
				'PWM': {
					'$avg': "$" + side + "PwmDrive"
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

export default class PWMDatetimeLine extends React.Component {
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
		yField: 'PWM',
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
				text: "Motor PWM [%]"
			}
		},tooltip: {
			formatter: (data) => {
				if (data['PWM'] != null){
					return { name: 'PWM', value: data['PWM'].toFixed(1) + ' %' };
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
						Battery PWM by time
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
