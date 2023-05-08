	/* eslint-disable no-unused-vars */
	import React, { Component, useRef } from 'react';
	import * as echarts from 'echarts';
	import { djangoFetch } from 'API/url';
	
	import { Table } from 'antd';

	import MainCard from "components/MainCard";

	import styles from "graphs/styles";
	import {  Skeleton } from '@mui/material';

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
	
export default class PlotTile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			graphID: this.props.graphID + this.randomString(5),
			list: null,
			data: this.props.data,
			option: this.props.option,
			table: this.props.table,
			doc: null,
			chart: null, 
			update: true,
			columns: [],
			pagination: {},
		};
	}

	randomString(length) {
		const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let result = '';
		for (let i = length; i > 0; --i) {
			result += chars[Math.floor(Math.random() * chars.length)];
		}
		return result;
	}

	getList(){
		const body = {
			pipeline: [
				{
					'$project': {
						'robot': 1, 
						'name': 1, 
						'group': '$tile.group', 
						'title': '$tile.title'
					}
				}, {
					'$group': {
						'_id': '$robot', 
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
								'title': '$title',
							}
						}
					}
				}
			]
		}
		djangoFetch('/chart', '/', 'OPTIONS', JSON.stringify(body))
		.then(response => response.json())
		.then((json) => {
			const _json = json
			this.setState({list: _json})
		})
		.catch((e) => console.error(e))
	}

	getData(){
		console.log(this.state)
		djangoFetch('/chart', '/?name=' + this.props.graphID, 'GET', '')
		.then(response => response.json())
		.then((json) => {
			const _json = json
			if(JSON.stringify(_json.data) != JSON.stringify(this.state.data) || json.option != this.state.option){	
				this.setState({update: true})
				this.setState(_json)	
			}
		})
		.then(()=>{
			this.chart(this.state);
		})
		.catch((e) => console.error(e))
	}

	chart = (_config) => {
		var data = _config.data;
		var option = eval(_config.option);
		if(this.props.table == undefined || this.props.table == null){
			if(!_config.doc || !_config.chart){
				var _doc =  document.getElementById(_config.graphID)
				var _chart =  echarts.init(_doc) 
				this.setState({doc: _doc, chart: _chart})
			}
			_config.chart && _config.update && option && data?(_config.chart.setOption(option),this.setState({update: false})):''				
		}
		else{
			const columns = this.generateColumns(data);
			this.setState({columns: columns})
			this.setState({update: false})
		}
	}

	handleMenuClick = (e) => {
		console.log(e)
		// message.open({
		// 	key: e.key,
		// 	type: 'loading',
		// 	content: 'Uploading change...',
		// 	style: {
		// 		marginTop: '8vh',
		// 	},
		// 	duration: 0,
		// });
		// fetch('http://192.168.217.183:8000/update/', requestOptions(raw(e.key).replace('coordinates', this.props.position)))
		// .then((response) => response.json())
		// .then(() => {
		// 	message.destroy(e.key)
		// 	message.open({
		// 		key: e.key,
		// 		type: 'success',
		// 		content: 'Success, reloading the page',
		// 		style: {
		// 			marginTop: '8vh',
		// 		},
		// 		duration: 2.5,
		// 	})
		// 	.then(
		// 		window.location.reload(true)
		// 	);
		// })
		// .catch((error) => {
		// 	console.log(error);
		// });
	};

	update(){
		!this.props.editor?this.setState({list: null}): ''
		!this.state.list?this.getList():''
		this.getData()
		this.state.data && this.state.option?this.chart(this.state):'' 
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
		}, 2000)
	}

	generateColumns = data => {
		if (data[0] === null){
			return null
		}
	
		const columns = Object.keys(data[0]).map(key => {      
			return {
				title: key,
				dataIndex: key,
				key: key,
				sorter: true,
				render: (text) => {
					if (typeof text === 'object') {
						const nestedColumns = this.generateColumns([text]);
						const nestedData = [text];
						return <Table columns={nestedColumns} dataSource={nestedData} pagination={false} size = {'small'}/>;
					}
					return text;
				}
			};
		});
		return columns.sort((a, b) => this.sortColumn(a.title,b.title));
	};
	
	sortColumn = (a, b) => {
		if (a == 'dateTime'){
			return -1
		}else if (b == 'dateTime'){
			return 1
		}else if (a.toUpperCase() < b.toUpperCase() ){
			return -1
		}else if (a.toUpperCase() > b.toUpperCase() ){
			return 1
		}else{
			return 0
		}
	}
	
	handleTableChange = (pagination, filters, sorter) => {
		const pager = { ...this.state.pagination };
		pager.current = pagination.current;
		this.setState({ pagination: pager });
	};

	render() {
		return (
			<MainCard style={{ width: '100%', height: '100%' }}>	
				<div className="div-pai">
					{!this.props.editor? 
						<div className="MoreOptions">
							<Dropdown
								menu={{
								items: this.state.list,
								onClick: this.handleMenuClick,
								}}
								trigger={['click']}
							>
								<MoreVert sx={{color:'#b3b3b3'}} />
							</Dropdown>
						</div>:
						<></>}
					{this.state.option && this.state.data ? 
						(!this.props.table?
							<div className='Graph' id={this.state.graphID} {...this.props}></div>:
							<Table
								className='Graph'
								columns={this.state.columns}
								dataSource={this.state.data}
								pagination={true}
								onChange={this.handleTableChange}
								scroll = {{scrollToFirstRowOnChange: true, x: true, y: true}}
								size = {'small'}
								tableLayout = {'auto'}
								width = {'auto'}
							/>): 
						<Skeleton className='Graph' animation="wave" height="90%" width="95%"/>}
				</div>
			</MainCard>
		);
	}	
}
