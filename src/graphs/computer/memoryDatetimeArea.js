import React from "react";

import { Area } from '@ant-design/plots';

import { url, requestOptions } from 'API/url';

import styles from "graphs/styles";

var raw = JSON.stringify({
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
                'computer.memory': 1
            }
        }, {
            '$set': {
                'memoryPercent': {
                    '$arrayElemAt': [
                        '$computer.memory', 2
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
                'memoryPercent': {
                    '$avg': '$memoryPercent'
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

export default class MemoryDatetimeArea extends React.Component {
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
		yField: 'memoryPercent',
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
				text: "Memory percent [%]"
			}
		},tooltip: {
			formatter: (data) => {
				if (data['memoryPercent'] != null){
					return { name: 'Memory percent', value: data['memoryPercent'].toFixed(1) + ' %' };
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
