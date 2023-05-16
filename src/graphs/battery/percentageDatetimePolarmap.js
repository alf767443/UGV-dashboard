
import React from "react";

import { Heatmap } from '@ant-design/plots';


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
						'unit': 'hour'
					}
				}, 
				'percentage': 1
			}
		}, {
			'$densify': {
				'field': 'dateTime', 
				'range': {
					'step': 1, 
					'unit': 'hour', 
					'bounds': 'full'
				}
			}
		}, {
			'$addFields': {
				'weekDay': {
					'$dayOfWeek': '$dateTime'
				}, 
				'hour': {
					'$hour': '$dateTime'
				}
			}
		}, {
			'$addFields': {
				'_id': {
					'$concat': [
						{
							'$toString': '$weekDay'
						}, '-', {
							'$toString': '$hour'
						}
					]
				}
			}
		}, {
			'$group': {
				'_id': '$dateTime', 
				'percentageFist': {
					'$first': '$percentage'
				}, 
				'percentageLast': {
					'$last': '$percentage'
				}, 
				'hour': {
					'$first': '$hour'
				}, 
				'weekDay': {
					'$first': '$weekDay'
				}, 
				'label': {
					'$first': '$_id'
				}
			}
		}, {
			'$project': {
				'hour': {
					'$toString': '$hour'
				}, 
				'weekDay': {
					'$switch': {
						'branches': [
							{
								'case': {
									'$eq': [
										'$weekDay', 1
									]
								}, 
								'then': 'Sunday'
							}, {
								'case': {
									'$eq': [
										'$weekDay', 2
									]
								}, 
								'then': 'Monday'
							}, {
								'case': {
									'$eq': [
										'$weekDay', 3
									]
								}, 
								'then': 'Tuesday'
							}, {
								'case': {
									'$eq': [
										'$weekDay', 4
									]
								}, 
								'then': 'Wednesday'
							}, {
								'case': {
									'$eq': [
										'$weekDay', 5
									]
								}, 
								'then': 'Thursday'
							}, {
								'case': {
									'$eq': [
										'$weekDay', 6
									]
								}, 
								'then': 'Friday'
							}, {
								'case': {
									'$eq': [
										'$weekDay', 7
									]
								}, 
								'then': 'Saturday'
							}
						], 
						'default': ''
					}
				}, 
				'percentageDelta': {
					'$subtract': [
						'$percentageLast', '$percentageFist'
					]
				}, 
				'label': 1
			}
		}, {
			'$group': {
				'_id': '$label', 
				'percentageDelta': {
					'$avg': '$percentageDelta'
				}, 
				'weekDay': {
					'$first': '$weekDay'
				}, 
				'label': {
					'$first': '$_id'
				}
			}
		}, {
			'$sort': {
				'weekDay': 1, 
				'hour': 1
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
			this.setState({ data: [...json] });
		})
		.then(() => {
			clearInterval(this.timer)
		})
		.catch((error) => {
			//console.log(error);
		});

		// fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/polar-heatmap.json')
		// .then((response) => response.json())
		// .then((json) => {
		// 	this.setState({ data: json });
		// })
		// .catch((error) => {
		// 	//console.log('fetch data failed', error);
		// });
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
		xField: 'hour',
		yField: 'weekDay',
		colorField: 'percentageDelta',
		legend: true,
		color: '#BAE7FF-#1890FF-#1028ff',
		coordinate: {
		// 坐标轴属性配置
		type: 'polar',
		// 极坐标
		cfg: {
		innerRadius: 0.2,
		},
		},
		heatmapStyle: {
		stroke: '#f5f5f5',
		opacity: 0.8,
		},
		meta: {
		time: {
		type: 'cat',
		},
		value: {
		min: 0,
		max: 1,
		},
		},
		xAxis: {
		line: null,
		grid: null,
		tickLine: null,
		label: {
		offset: 12,
		style: {
		fill: '#666',
		fontSize: 12,
		textBaseline: 'top',
		},
		},
		},
		yAxis: {
		top: true,
		line: null,
		grid: null,
		tickLine: null,
		label: {
		offset: 0,
		style: {
		fill: '#fff',
		textAlign: 'center',
		shadowBlur: 2,
		shadowColor: 'rgba(0, 0, 0, .45)',
		},
		},
		},
		tooltip: {
		showMarkers: false,
		},
		interactions: [
		{
		type: 'element-active',
		},
		],
		};

	render() {
		
		return (
			<Heatmap 
			{...this.config}
				{...styles.plot}
				data={this.state.data}
			/>
		);
	}
}
