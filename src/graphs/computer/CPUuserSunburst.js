import React from "react";

import { Sunburst } from '@ant-design/plots';

import { url, requestOptions } from 'API/url';

import styles from "graphs/styles";

var raw = JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_datalake",
	"collection": "Processes",
	"pipeline": [
        {
            '$sort': {
                'dateTime': -1
            }
        }, {
            '$limit': 1
        }, {
            '$unwind': {
                'path': '$process', 
                'preserveNullAndEmptyArrays': false
            }
        }, {
            '$addFields': {
                'process': {
                    'value': {
                        '$sum': {
                            '$divide': [
                                '$process.cpu_percent', {
                                    '$size': [
                                        '$computer.cpu_perc'
                                    ]
                                }
                            ]
                        }
                    }
                }
            }
        }, {
            '$group': {
                '_id': '$process.username', 
                'value': {
                    '$sum': {
                        '$divide': [
                            '$process.cpu_percent', {
                                '$size': [
                                    '$computer.cpu_perc'
                                ]
                            }
                        ]
                    }
                }, 
                'children': {
                    '$push': '$process'
                }, 
                'count': {
                    '$count': {}
                }
            }
        }, {
            '$addFields': {
                'label': '$_id'
            }
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
			this.setState({ data: {label: 'root', children: [...json]}});
		})
		// .then(() => {
		// 	// clearInterval(this.timer)
		// })
		.catch((error) => {
			//console.log(error);
		});
    }

    componentDidMount = () => {
		this.refreshList();
    }

	config = {
        innerRadius: 0.3,
        interactions: [
            {
            type: 'element-active',
            },
        ],
        hierarchyConfig: {
            field: 'value',
        },
        drilldown: {
            breadCrumb: {
            rootText: 'root',
            },
        },
        tooltip: {
            // fields: ['label', 'value'],
            formatter: (datum) => ({
            name: datum.label,
            value: `${datum.value}%`,
            }),
        },
        label: {
            // label layout: limit label in shape, which means the labels out of shape will be hide
            layout: [
              {
                type: 'limit-in-shape',
              },
            ],
          },
    }

	render() {
		return (
            <Sunburst
                {...this.config}
				{...styles.plot}
				data={this.state.data}
            />
		);
	}
}
