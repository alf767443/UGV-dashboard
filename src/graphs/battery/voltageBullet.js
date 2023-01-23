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
				'voltage': 1
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

export default class VoltageBullet extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
      data: [],
      out: {
            title: 'Voltage',
            ranges: [20, 40, 60, 80, 100],
            measures: [0],
            value: null,
          },
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
			this.setState({ data: json[0].voltage.toFixed(4) });
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
        measureField: 'measures',
        rangeField: 'ranges',
        targetField: 'value',
        xField: 'title',
        size: {
            range: 30,
            measure: 0,
            target: 30,
        },
        color: {
          range: ['#FF7772', '#FFBC6D', '#F5F16E', '#BAFF7D', '#82FF74'],
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
		height: 40,
        width: 350
      };

	render() {
		return (
          <Bullet {...this.config} data={[{...this.state.out, value: this.state.data}]}/>
		);
	}
}