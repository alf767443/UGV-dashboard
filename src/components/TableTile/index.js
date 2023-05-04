/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import * as echarts from 'echarts';
import { djangoFetch } from 'API/url';

import MainCard from "components/MainCard";

import styles from "graphs/styles";
import { Typography, Stack, Grid, Skeleton } from '@mui/material';

import { MoreVert } from '@mui/icons-material';
import { Dropdown, message } from 'antd';
import {  url, requestOptions } from 'API/url';

import "./styles.css";

var raw = (graph) => JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_dashboard",
	"collection": "config",
	"filter": {'user': 'default'},
	"update": [
		{
			'$set': {
				'dashboardLayout': {
					'coordinates': {'graph': graph, 'type': 'simple'}
				},
			}
		}
	],
});

var list = JSON.stringify(
	{
		"dataSource": "CeDRI",
		"database": "CeDRI_UGV_dashboard",
		"collection": "graphs",    
		"pipeline": [
			{
				'$group': {
					'_id': '$group', 
					'key': {
						'$first': '$group'
					}, 
					'label': {
						'$first': '$group'
					}, 
					'children': {
						'$push': {
							'key': '$name', 
							'label': '$title', 
							'title': '$title'
						}
					}
				}
			},
		]
	}
)



export default class GraphTile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			graphID: this.props.graphID,
			list: null,
			data: null,
			option: null,
			tile: null,
		};
	}

  getData(){
	console.log(this.state.graphID)
    djangoFetch('/chart', '/?name=' + this.state.graphID, 'GET', '')
      .then(response => response.json())
      .then((json) => {
		const _json = json
		this.setState({data: !this.props.data?_json.data:this.props.data})
		this.setState({option: !this.props.option?_json.option:this.props.option})
		this.setState({tite: !this.props.tite?_json.tite:this.props.tite})
		console.log(this.state)
        this.chart()
      })
      .catch((e) => console.error(e))
  }

  chart(){
	var chartDom = document.getElementById(this.props.graphID);
	var  myChart = !echarts.getInstanceByDom(chartDom)?echarts.init(chartDom):echarts.getInstanceByDom(chartDom)
    var data = this.state.data
    var option = eval(this.state.option)
    option && myChart.setOption(option);
  }

	handleMenuClick = (e) => {
		console.log(e)
		message.open({
			key: e.key,
			type: 'loading',
			content: 'Uploading change...',
			style: {
				marginTop: '8vh',
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
					marginTop: '8vh',
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

	getList(){
		fetch(url(), requestOptions(list, 'POST'))
		.then((response) => response.json())
		.then((json) => {
			this.setState({list: json})
			console.log(this.state.list)
		})
		.catch((error) => {
			console.log(error);
		});
	}

  refreshList() {
		fetch(url(), requestOptions(JSON.stringify(this.state.query)))
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

	update(){
		if(this.state.list == null){
			// this.getList()
		}
		else{
			// this.refreshList();
		}
		!this.props.editor?this.setState({list: null}): ''
		this.getData()
	}

    componentDidMount = () => {
		this.update();
		this.timer();
    }

	componentWillUnmount = () =>{
		clearInterval(this.timer)
	}

	timer = () => {
		setInterval(() => {
			this.update();
		}, 5000)
	}

	_styles = () =>{
		const editPlot = { width: '100%', height: '50vh' }
		const bigPlot = { width: '100%', height: '66vh' }
		const smallPlot = { width: '100%', height: '33vh' }
		return this.props.editor?editPlot:(this.props.bigPlot?bigPlot:smallPlot)
	}

	render() {
		return (
			<MainCard>	
					<Stack {...styles.stack}>
						<div className="div-pai">
							{this.props.static? <></>: 
							<div className="MoreOptions">
								<Dropdown
									menu={{
									items: !this.props.editor?this.state.list:[],
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
									{this.state.tile ? this.state.tile['title'] : 'No graph find' }
								</Typography>
							</Grid>
							</div>
						</div>
						{this.state.option && this.state.data ? <div id={this.props.graphID} style={this._styles()} ></div> : <Skeleton animation="wave" height="100%" width="100%"/> }
					</Stack>
			</MainCard>
		);
	}
}
