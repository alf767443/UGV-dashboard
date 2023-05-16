import React from "react";

import MainCard from "components/MainCard";

import styles from "graphs/styles";
import { Typography, Stack, Grid, Skeleton } from '@mui/material';

import { MoreVert } from '@mui/icons-material';
import { Dropdown, message } from 'antd';
import {  url, requestOptions } from 'API/url';

import { Area, Line, Column, Bar, Pie, DualAxes, Gauge, Bullet, Liquid, Scatter, Rose, Sankey, Chord, Heatmap } from '@ant-design/plots';

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

var graphs = (graph = "") => JSON.stringify(
	{
		"dataSource": "CeDRI",
		"database": "CeDRI_UGV_dashboard",
		"collection": "graphs",    
		"pipeline": [
			{
				'$match': {
					'name': graph
				}
			}, {
				'$limit': 1
			}
		]
	}
)


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

export default class SimpleGraph extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            data: [],
			config: null,
			query: null,
			plot: null,
			list: null,
        };
    }

	plot(){
		switch(this.state.graph){
			case 'area':
				return Area;
			case 'line':
				return Line;
			case 'column':
				return Column;
			case 'bar':
				return Bar;
			case 'pie':
				return Pie;
			case 'dualaxes':
				return DualAxes;
			case 'gauge':
				return Gauge;
			case 'bullet':
				return Bullet;
			case 'liquid':
				return Liquid;
			case 'scatter':
				return Scatter;
			case 'rose':
				return Rose;
			case 'sankey':
				return Sankey;
			case 'chord':
				return Chord;
			case 'heatmap':
				return Heatmap
			default:
				return false;
		}
	}

	handleMenuClick = (e) => {
		//console.log(e)
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
		// .then((response) => response.json())
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
			//console.log(error);
		});
	};

	getList(){
		fetch(url(), requestOptions(list))
		.then((response) => response.json())
		.then((json) => {
			this.setState({list: json})
			////console.log(this.state.list)
		})
		.catch((error) => {
			//console.log(error);
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
			//console.log(error);
		});
    }

	getGraph(){
		fetch(url(), requestOptions(graphs(this.props.name)))
		.then((response) => response.json())
		.then((json) => {
			this.setState(foundFunctions(json[0]))
			this.setState({plot: this.plot()})
		})
		.then(() => {
			////console.log(this.state)
		})
		.catch((error) => {
			//console.log(error);
		});
	}

	update(){
		if(this.state.list == null){
			this.getList()
		}
		if(this.state.config == null || this.state.query == null || this.state.plot == null){
			this.getGraph();
		}
		else{
			this.refreshList();
		}
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



	render() {
		return (
			<MainCard {...styles.maincard}>	
					<Stack {...styles.stack}>
						<div className="div-pai">
							{this.props.static? <></>: 
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
							</div>}
							<div className="TitleBox">
							<Grid
								container
								direction="row"
								justifyContent="center"
								alignItems="center"
							>
								<Typography {...styles.typography.title}>
									{this.state.title ? this.state.title : 'No graph find' }
								</Typography>
							</Grid>
							</div>
						</div>
						{this.state.plot ? <this.state.plot {...this.state.config} {...styles.plot} data={this.state.data}/> : <Skeleton animation="wave" height={202} width="100%"/> }
					</Stack>
			</MainCard>
		);
	}
}


function string2function(str) {
	str = str.split('=>');
	for (let item in str) {
		str[item] = str[item].trim();
		str[item] = str[item].slice(1, -1);
		str[item] = str[item].trim();
	}
	str[0] = str[0].split(',');
	for (let item in str[0]) {
		str[0][item] = str[0][item].trim();
	}
	return new Function(str[0], str[1]);
}

function foundFunctions(obj, str = "=>") {
	// Verifica se o objeto é nulo ou indefinido
	if (obj === null || typeof obj !== "object") {
		return obj;
	}
  
	for (let key in obj) {
		// Verifica se o valor da chave é uma string e contém a string procurada
		if (typeof obj[key] === "string" && obj[key].includes(str)) {
			obj[key] = string2function(obj[key])
		}
		// Verifica se o valor da chave é um objeto e chama a função recursivamente
		else if (typeof obj[key] === "object") {
			foundFunctions(obj[key], str);
		}
	}
	return obj
  }
  