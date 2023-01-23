
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
				'dateTime': 1,
				'percentage': 1
			}
		}, {
			'$sort': {
				'dateTime': -1
				}
		}, {
			'$limit': 1
		}
	]
   });

const data = [
    {
      title: 'Percent',
      ranges: [20, 80, 100],
      measures: [65],
      target: 80,
    },
    {
      title: 'Current',
      ranges: [1, 4, 8],
      measures: [3],
      target: 100,
    },
    {
      title: 'Voltage',
      ranges: [16, 24, 26],
      measures: [20],
      target: 85,
    },
    {
      title: 'Temperature',
      ranges: [0, 50, 100],
      measures: [60],
      target: 100,
    },
  ];   

export default class InstantDataBattery extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            data: [],
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
			this.setState({ data: json[0]['percentage'] });
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
        data,
        measureField: 'measures',
        rangeField: 'ranges',
        targetField: 'target',
        xField: 'title',
        color: {
            range: ['#FFbcb8', '#FFe0b0', '#bfeec8'],
            measure: '#5B8FF9',
            target: '#39a3f4',
        },
        label: {
            measure: {
            position: 'middle',
            style: {
                fill: '#fff',
            },
            },
        },
        xAxis: {
            line: null,
        },
        yAxis: false,
        legend: {
            custom: false,
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
        },
    }

	render() {
		return (
			<div>
                <Bullet {...this.config} />
			</div>
		);
	}
}