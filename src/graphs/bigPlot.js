import React from "react";

import MainCard from "components/MainCard";

import styles from "graphs/styles";
import { Typography, Stack, Grid, Skeleton } from '@mui/material';

import Maps from './maps/index'
import Nodes from './nodes/index'

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
		key: 'maps',
		label: 'Maps',
		children: Maps.BigPlot.sort((a, b) => sort(a.label, b.label))
	},
	{
		key: 'nodes',
		label: 'Nodes',
		children: Nodes.BigPlot.sort((a, b) => sort(a.label, b.label))
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
					'coordinates': {'graph': graph, 'type': 'big'}
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
							{this.props.static? <></>: 
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
							</div>}
							<div className="TitleBox">
							<Grid
								container
								direction="row"
								justifyContent="center"
								alignItems="center"
							>
								<Typography {...styles.typography.title}>
									{this.props.title ? this.props.title : 'No graph find' }
								</Typography>
							</Grid>
							</div>
						</div>
						{this.props.graph ? this.props.graph : <Skeleton animation="wave" height={202} width="100%"/> }
					</Stack>
			</MainCard>
		);
	}
}
