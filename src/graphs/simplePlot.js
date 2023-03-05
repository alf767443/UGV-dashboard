import React from "react";

import MainCard from "components/MainCard";

import styles from "graphs/styles";
import { Typography, Stack, Grid } from '@mui/material';

import Battery from './battery/index'
import Motors from './motors/index'

import { MoreVert } from '@mui/icons-material';
import { Dropdown, message } from 'antd';
import { requestOptions } from 'API/url';

import "./styles.css";

function sort(a, b) {
	a = a.toUpperCase()
	b = b.toUpperCase()
	if (a < b) {
		return -1
	} else if (a > b){
		return 1
	} else {
		return 0
	}
}

const items = [
	{
		key: 'battery',
		label: 'Battery',
		children: Battery.SimplePlot.sort((a, b) => sort(a.label, b.label))
	},
	{
		key: 'motor',
		label: 'Motor',
		children: Motors.SimplePlot.sort((a, b) => sort(a.label, b.label))
	},
];
  
var raw = (graph) => JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_dashboard",
	"collection": "config",
	"filter": {'user': 'default'},
	"update": [
		{
			'$set': {
				'dashboardLayout': {
					'coordinates': graph,
				},
			}
		}
	],
});

export default class SimpleGraph extends React.Component {
	constructor(props) {
		super(props);
    }

	handleMenuClick = (e) => {
		console.log(e)
		message.open({
			key: e.key,
			type: 'loading',
			content: 'Uploading change...',
			style: {
				marginTop: '11vh',
			},
			duration: 0,
		});
		fetch('http://192.168.217.183:8000/update/', requestOptions(raw(e.key).replace('coordinates', this.props.position)))
		.then((response) => response.json())
		.then(() => {
			message.destroy(e.key)
			message.open({
				key: e.key,
				type: 'success',
				content: 'Success, reloading the page',
				style: {
					marginTop: '11vh',
				},
				duration: 2.5,
			})
			.then(
				window.location.reload(true)
			);
		})
		.catch((error) => {
			console.log(error);
		});
	};


	render() {
		return (
			<MainCard {...styles.maincard}>	
					<Stack {...styles.stack}>
						<div className="div-pai">
							<div className="MoreOptions">
								<Dropdown
									menu={{
									items,
									onClick: this.handleMenuClick,
									}}
									trigger={['click']}
								>
									<MoreVert sx={{color:'#b3b3b3'}} />
								</Dropdown>
							</div>
							<div className="TitleBox">
							<Grid
								container
								direction="row"
								justifyContent="center"
								alignItems="center"
							>
								<Typography {...styles.typography.title}>
												{this.props.title}
								</Typography>
							</Grid>
							</div>
						</div>
						{this.props.graph}
					</Stack>
			</MainCard>
		);
	}
}
