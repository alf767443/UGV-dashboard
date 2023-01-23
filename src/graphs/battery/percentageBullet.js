import React from "react";

import { Bullet } from '@ant-design/plots';

// Import from project
import { url, requestOptions } from 'API/url';

var raw = JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_buffer",
	"collection": "Battery_Data",
	"pipeline": [
		{
			'$project': {
				'dateTime': {
					'$dateTrunc': {
						'date': '$dateTime', 
						'unit': 'minute'
					}
				}, 
				'current': {
					'$cond': [
						{
							'$eq': [
								'NaN', '$current'
							]
						}, null, '$current'
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
				'current': {
					'$avg': '$current'
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
/*
const data = [
    {
      title: 'Percentage',
      ranges: [40, 70, 100],
      measures: [80],
      target: 85,
    },
  ];
*/
export default class PercentageBullet extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            data: [],
            out: [{
                  title: 'Percentage',
                  ranges: [20, 40, 60, 80, 100],
                  measures: [0],
                  target: 45,
                },],
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
        //data: this.state.out,
        measureField: 'measures',
        rangeField: 'ranges',
        targetField: 'target',
        xField: 'title',
        size: {
            range: 30,
            measure: 0,
            target: 30,
        },
        color: {
          range: ['#FFbcb8', '#FFe0b0', '#bfeec8'],
          measure: '#5B8FF9',
          target: '#39a3f4',
        },
        xAxis: {
          line: null,
        },
        yAxis: false,
        label: {
            measure: false,
            target: true,
        },
        
        // 自定义 legend
        /*legend: {
          custom: true,
          position: 'bottom',
          items: [
            {
              value: '差',
              name: '差',
              marker: {
                symbol: 'square',
                style: {
                  fill: '#FFbcb8',
                  r: 5,
                },
              },
            },
            {
              value: '良',
              name: '良',
              marker: {
                symbol: 'square',
                style: {
                  fill: '#FFe0b0',
                  r: 5,
                },
              },
            },
            {
              value: '优',
              name: '优',
              marker: {
                symbol: 'square',
                style: {
                  fill: '#bfeec8',
                  r: 5,
                },
              },
            },
            {
              value: '实际值',
              name: '实际值',
              marker: {
                symbol: 'square',
                style: {
                  fill: '#5B8FF9',
                  r: 5,
                },
              },
            },
            {
              value: '目标值',
              name: '目标值',
              marker: {
                symbol: 'line',
                style: {
                  stroke: '#39a3f4',
                  r: 5,
                },
              },
            },
          ],
        },*/
      };

	render() {
		return (
			<div>
                <Bullet {...this.config} data={this.state.out}/>
            </div>
		);
	}
}