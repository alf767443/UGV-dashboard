/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Table } from 'antd';
import { djangoFetch } from 'API/url';

import MainCard from "components/MainCard";

import styles from "graphs/styles";
import { Typography, Stack, Grid, Skeleton } from '@mui/material';

import "./styles.css";

export default class TableTile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			graphID: this.props.graphID,
			list: null,
			data: null,
			option: null,
			tile: null,
			pagination: {},
			loading: false,
			columns: []
		};
	}

	getData(){
		console.log(this.state.graphID)
		this.setState({ loading: true });
		djangoFetch('/chart', '/?name=' + this.state.graphID, 'GET', '')
		.then(response => response.json())
		.then((json) => {
			const _json = json
			const columns = this.generateColumns(_json.data);
			this.setState({data: !this.props.data?_json.data:this.props.data})
			this.setState({option: !this.props.option?_json.option:this.props.option})
			this.setState({tite: !this.props.tite?_json.tite:this.props.tite})
			this.setState({loading: false})
			this.setState({columns: columns})
			console.error(this.state)
		})
		.catch((e) => console.error(e))
	}

	update(){
		!this.props.editor?this.setState({list: null}): ''
		this.getData()
	}

    componentDidMount = () => {
		this.update();
    }

	_styles = () =>{
		const editPlot = { width: '100%', height: '50vh' }
		const bigPlot = { width: '100%', height: '66vh' }
		const smallPlot = { width: '100%', height: '33vh' }
		return this.props.editor?editPlot:(this.props.bigPlot?bigPlot:smallPlot)
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
		this.getData({
			results: pagination.pageSize,
			page: pagination.current,
			sortField: sorter.field,
			sortOrder: sorter.order,
			...filters
		});
	};
	


	render() {
		const { loading, data, columns } = this.state;
		return (
			<MainCard style={{ width: '100%', height: '100%' }}>	
				{this.state.data ? 
				<Table
					columns={columns}
					rowKey={record => record._id}
					dataSource={data}
					pagination={true}
					loading={loading}
					onChange={this.handleTableChange}
					scroll = {{scrollToFirstRowOnChange: true, x: true}}
					size = {'small'}
					tableLayout = {'auto'}
					width = {'auto'}
				/> : 
				<Skeleton animation="wave" height="100%" width="100%"/> }
			</MainCard>
		);
	}
}
