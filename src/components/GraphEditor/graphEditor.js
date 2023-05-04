/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import * as echarts from 'echarts';
import { djangoFetch } from 'API/url';

import MainCard from "components/MainCard";
import Editor from "react-prism-editor";

import styles from "graphs/styles";
import { Typography, Stack, Grid, Skeleton } from '@mui/material';

import { MoreVert } from '@mui/icons-material';
import { Dropdown, message } from 'antd';
import {  url, requestOptions } from 'API/url';

import GraphTile from 'components/graphTile/index';

export default class GraphEditor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			list: null,
			data: this.props.data,
			option: this.props.option,
			tile: {title: this.props.title},
		};
	}

  getData(){
	console.log(this.props.graphID)
    djangoFetch('/chart', '/?name=' + this.props.graphID, 'GET', '')
      .then(response => response.json())
      .then((json) => {
		const _json = json
		console.log(this.props)
		this.state.option === null && this.props.state === 'edit'? this.setState({option: _json.option}): ''
		console.log(this.state)
        this.chart()
      })
      .catch((e) => console.error(e))
  }

  chart(){
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var data = this.state.data
    var option = eval(this.state.option)
    option && myChart.setOption(option);
  }

  handleChange = (code) => {
	this.setState({option: code})
  }

    componentDidMount = () => {
		this.update();
    }

	render() {
		return (
			<div>
				<div>
					<GraphTile graphID={this.props.graphID} {...this.state}/>
				</div>
				<div>
					<MainCard {...styles.maincard}>	
						<Editor
							value={this.state.option}
							onChange={this.handleChange}
							language="javascript"
							highlight={true}
							theme="tomorrow"
							height="20rem"
						/>
					</MainCard>
				</div>
			</div>
			
		);
	}
}
