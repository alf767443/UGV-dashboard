
import React from "react";

import { Area } from '@ant-design/plots';


// Import from project
import { url, requestOptions } from 'API/url';

import styles from "graphs/styles";

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
				'percentage': 1
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
			<Area 
				{...this.config}
				{...styles.plot}
				data={this.state.data}
			/>
		);
	}
}
