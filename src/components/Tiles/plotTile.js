/* eslint-disable no-unused-vars */
import React from "react";
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


const randomString = (length) => {
	const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let result = '';
	for (let i = length; i > 0; --i) {
		result += chars[Math.floor(Math.random() * chars.length)];
	}
	return result;
}

const sortColumn = (a, b) => {
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

const generateColumns = (data) => {
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
					const nestedColumns = generateColumns([text]);
					const nestedData = [text];
					return <Table columns={nestedColumns} dataSource={nestedData} pagination={false} size = {'small'}/>;
				}
				return text;
			}
		};
	});
	return columns.sort((a, b) => sortColumn(a.title,b.title));
};

export default class PlotTile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			ID: this.props.graphID + randomString(5),
			_id: this.props.graphID,
			data: this.props.data,
			option: this.props.option,
			table: this.props.table,
			doc: null,
			chart: null, 
			update: true,
			canRequest: true,
			columns: [],
			pagination: {},
		};
	}

	getData = () => {
		this.setState({canRequest: false})
		djangoFetch('/chart', '/?name=' + this.props.graphID, 'GET', '')
		.then(response => response.json())
		.then((json) => {
			const _json = json
			if(JSON.stringify(_json.data) != JSON.stringify(this.state.data) || _json.option != this.state.option){
				this.setState({update: true})
			}
			if(this.props.data != undefined || this.props.data != null || !this.props.data){
				this.setState({data: _json.data})
			}
			if(this.props.option != undefined || this.props.option != null || !this.props.option){
				this.setState({option: _json.option})
			}
		})	
		.then(() => this.chart(this.state))
		.then(() => this.timer())
		.catch((e) => console.error(e))
		.finally(() => this.setState({canRequest: true}))
	}

	chart = (_config) => {
		try{
			var data = _config.data;
			var option = eval(_config.option);
			if(this.props.table == undefined || this.props.table == null){
				if(!_config.doc || !_config.chart){
					var _doc =  document.getElementById(_config.ID)
					var _chart =  echarts.init(_doc) 
					this.setState({doc: _doc, chart: _chart})
				}
				_config.chart && _config.update && option && data?(_config.chart.setOption(option),this.setState({update: false})):''				
			}
			else{
				const columns = generateColumns(data);
				this.setState({columns: columns})
				this.setState({update: false})
			}
		}
		catch{
			return null
		}
	}

	update = () => {
		this.props.graphID && this.state.canRequest?this.getData():''
		this.props.graphID && this.state.data && this.state.option?this.chart(this.state):'' 
	}

	componentDidMount = () => {
		this.update();
	}

	componentWillUnmount = () =>{
		clearInterval(this.timer)
	}

	timer = () => {
		setTimeout(() => {
			this.update();
		}, 1000)
	}

	render() {
		return (
			<MainCard style={{ width: '100%', height: '100%' }}>	
				{this.state.option && this.state.data ? 
					(!this.props.table?
						<div className='Graph' id={this.state.ID} {...this.props}/>:
						<Table
							className='Graph'
							columns={this.state.columns}
							dataSource={this.state.data}
							pagination={true}
							scroll = {{scrollToFirstRowOnChange: true, x: true, y: true}}
							size = {'small'}
							tableLayout = {'auto'}
							width = {'auto'}
						/>): 
					<Skeleton className='Graph' animation="wave" height="90%" width="95%"/>}
			</MainCard>
		);
	}	
}
