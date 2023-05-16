import React from "react";

import { Line } from '@ant-design/plots';


// Import from project
import { url, requestOptions } from 'API/url';

import styles from "graphs/styles";

var raw = (cpu) => JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_datalake",
	"collection": "Processes",
	"pipeline": [
		{
			'$project': {
				'dateTime': {
					'$dateTrunc': {
						'date': '$dateTime', 
						'unit': 'minute'
					}
				}, 
				'computer.cpu_perc': 1
			}
		}, {
			'$set': {
				'cpuPercent': {
					'$arrayElemAt': [
						'$computer.cpu_perc', cpu
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
				'cpuPercent': {
					'$avg': '$cpuPercent'
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
				'cpu': cpu.toString()
			}
		}
	]
});

export default class CurrentDatetimeLine extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            data: [],
			temp: [],
			ticks: -1
        };
    }

    refreshList() {
		fetch(url(), requestOptions(raw(0)))
		.then((response) => response.json())
		.then((json) => {
			this.setState({ _1: [...json] });
		})
		.then(() => {
			fetch(url(), requestOptions(raw(1)))
			.then((response) => response.json())
			.then((json) => {
				this.setState({ _2: [...json] });
			})
			.then(() => {
				fetch(url(), requestOptions(raw(2)))
				.then((response) => response.json())
				.then((json) => {
					this.setState({ _3: [...json] });
				})
				.then(() => {
					fetch(url(), requestOptions(raw(3)))
					.then((response) => response.json())
					.then((json) => {
						this.setState({ data: [...this.state._1, ...this.state._2, ...this.state._3, ...json] });
						// ////console.log(this.state.data)
					})
					.catch((error) => {
						//console.log(error);
					});
				})
				.catch((error) => {
					//console.log(error);
				});
			})
			.catch((error) => {
				//console.log(error);
			});
		})
		.catch((error) => {
			//console.log(error);
		})
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
			this.refreshList()
		}, 5000)
	}

	config = {
		xField: '_id',
		yField: 'cpuPercent',
		seriesField: 'cpu',
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
				text: "CPU percent [%]"
			}
		},tooltip: {
			formatter: (data) => {
				if (data['cpuPercent'] != null){
					return { name: 'CPU' + data['cpu'], value: data['cpuPercent'].toFixed(1) + ' %' };
				}
				return {};
			},	
		},
	}

	render() {
		return (
			<Line 
				{...this.config}
				{...styles.plot}
				data={this.state.data}
			/>
		);
	}
}
