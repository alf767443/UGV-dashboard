import React from "react";

import { Area } from '@ant-design/plots';

import { url, requestOptions } from 'API/url';

import styles from "graphs/styles";

var raw = JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_datalake",
	"collection": "Connection",
	"pipeline": [
		{
			'$project': {
				'dateTime': {
					'$dateTrunc': {
						'date': '$dateTime', 
						'unit': 'minute'
					}
				}, 
				'RTT': 1
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
				'RTT': {
					'$avg': '$RTT'
				}
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

export default class CurrentDatetimeArea extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            data: [],
			ticks: -1
        };
    }

    refreshList() {
		fetch(url(), requestOptions(raw))
		.then((response) => response.json())
		.then((json) => {
			this.setState({ data: json });
		})
		.then(() => {
			clearInterval(this.timer)
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
			this.refreshList()
		}, 5000)
	}

	config = {
		xField: '_id',
		yField: 'RTT',
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
				text: "Connection RTT [s]"
			}
		},tooltip: {
			formatter: (data) => {
				if (data['RTT'] != null){
					return { name: 'RTT', value: data['RTT'].toFixed(1) + ' s' };
				}
				return {};
			},	
		},
	}

	render() {
		return (
			<Area 
				{...this.config}
				{...styles.plot}
				data={this.state.data}
			/>
		);
	}
}
