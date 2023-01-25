import React from "react";

import { Bullet } from '@ant-design/plots';

// Import from project
import { url, requestOptions } from 'API/url';
import styles from "graphs/styles";

var raw = JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_buffer",
	"collection": "Motor_Data",
	"pipeline": [
        {
          $project: {
            dateTime: 1,
            left: "$left.PWM",
            right: "$right.PWM",
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
        {
          $limit: 1,
        },
      ]
});

export default class PWMBullet extends React.Component {
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
			this.setState({ data: json[0]});
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
        color: {
          range: ['#82FF74', '#F5F16E', '#FF7772'],
          measure: '#5B8FF9',
          target: '#39a3f4',
        },
      };

	data = () => {
        console.log(this.state.data['left']);  
		return [
            {
                title: 'Left PWM',
                ranges: [65, 85, 100],
                measures: [0],
                value: Math.round(this.state.data['left']*100)/100
            }, {
                title: 'Right PWM',
                ranges: [65, 85, 100],
                measures: [0],
                value: Math.round(this.state.data['right']*100)/100
            },
        ]
	}


	render() {
		return (
				<Bullet {...this.config} data={this.data()} {...styles.bullet.dual} />
		);
	}
}