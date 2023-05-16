import React from "react";

import { Bullet } from '@ant-design/plots';

// Import from project
import { url, requestOptions } from 'API/url';
import styles from "graphs/styles";

import { Typography, Stack } from '@mui/material';

var raw = JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_datalake",
	"collection": "Battery",
	"pipeline": [
		{
			'$project': {
				'dateTime': 1,
				'current': 1
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

export default class CurrentBullet extends React.Component {
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
			this.setState({ data: json[0]});//.current.toFixed(2)});
		})
		.then(() => {
			clearInterval(this.timer)
		})
		.catch((error) => {
			//console.log(error);
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
        color: {
          range: ['#FF7772', '#FFBC6D', '#F5F16E', '#BAFF7D', '#82FF74', '#FF7772'],
          measure: '#5B8FF9',
          target: '#39a3f4',
        }
      };

	data = () => {
		return [{
            title: ' ',
            ranges: [10, 18, 22, 30, 40, 50],
            measures: [0],
			value: Math.round(this.state.data['current']*100)/100
		}]
	}


	render() {
		return (
			<Stack>
				<Bullet {...this.config} data={this.data()} {...styles.bullet.dual} />
				<Typography {...styles.typography.subtitle}>
					Temp.
				</Typography>
			</Stack>
		);
	}
}