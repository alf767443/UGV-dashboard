import React from "react";

import { Line } from '@ant-design/plots';


// Import from project
import { url, requestOptions } from 'API/url';

import styles from "graphs/styles";

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
				'leftCurrent': 1, 
				'rightCurrent': 1
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
					'$avg': "$" + side + "Current"
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

export default class CurrentDatetimeLine extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            data: [],
			right: [],
			left: [],
			ticks: -1
        };
    }

    refreshList() {
		fetch(url(), requestOptions(raw("left")))
		.then((response) => response.json())
		.then((json) => {
			this.setState({ left: json });
		})
		.then(() => {
			fetch(url(), requestOptions(raw("right")))
			.then((response) => response.json())
			.then((json) => {
				this.setState({ right: json });
			})
			.then(() => {
				this.setState({data: [...this.state.left, ...this.state.right]})
				clearInterval(this.timer)
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
		yField: 'current',
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
				text: "Motor current [A]"
			}
		},tooltip: {
			formatter: (data) => {
				if (data['current'] != null){
					return { name: 'Current', value: data['current'].toFixed(1) + ' A' };
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
