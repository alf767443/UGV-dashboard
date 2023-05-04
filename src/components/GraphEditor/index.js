/* eslint-disable no-unused-vars */
import React, { Component  } from 'react';
import * as echarts from 'echarts';
import { djangoFetch } from 'API/url';

import { Typography, Stack, Grid, Skeleton } from '@mui/material';
import MainCard from "components/MainCard";

import PlotTile from 'components/Tiles/plotTile';
import TableTile from 'components/Tiles/tableTile';

import ReactPrismEditor from "react-prism-editor";

import styles from './styles';
export default class GraphEditor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			graphID: this.props.graphID,
			list: null,
			data: null,
			option: null,
			tile: null,
			query: null,
			editor: true,
		};
	}

  getData(){
	console.log(this.state.graphID)
    djangoFetch('/chart', '/?name=' + this.state.graphID, 'GET', '')
		.then(response => response.json())
		.then((json) => {
			this.setState(json)	
			console.info(this.state)
      })
      .catch((e) => console.error(e))
  }

  componentDidMount = () => {
    this.getData();
  }

	render() {
		console.log(this.state)
		return (
			<Grid
				container
				direction="row"
				justifyContent="space-evenly"
				alignItems="stretch"
				columns={16}
				columnSpacing={1}
				rowSpacing={1}
				>
				<Grid item xs={8}>
					<Grid
						container
						direction="column"
						justifyContent="space-evenly"
						alignItems="stretch"
						columns={16}
						>
						<Grid item>
							<div {...styles.graph}>
								{this.state.data && this.state.option && this.state.tile?<PlotTile {...this.state}/>:<div></div>}
							</div>
						</Grid>
						<Grid item>
							<div {...styles.graph}>
								{this.state.data && this.state.option && this.state.tile?<TableTile {...this.state}/>:<div></div>}							
							</div>
						</Grid>
					</Grid>
				</Grid>
				<Grid item	xs={8}>
					<Grid 
						container
						direction="row"
						justifyContent="space-evenly"
						alignItems="stretch"
						columns={16}
						>
						<Grid item xs={8}>
							{this.state.option?
							<MainCard >
								<Typography {...styles.typography.title}>
									Options of chart
								</Typography>
									<div {...styles.code}>
									<ReactPrismEditor 
										style={{ height: '100%', maxHeight: 'inherit' }}
										language="javascript"
										theme="tomorrow"
										code={this.state.option}
										lineNumber={true}
										readOnly={false}
										clipboard={true}
										startingLineNumber = {1}
										changeCode={(code) => {
											this.setState({option: code})
										}}
									/>
									</div>
							</MainCard>:
							<div></div>}
						</Grid>
						<Grid item xs={8}>
							{this.state.query?
							<MainCard >
								<Typography {...styles.typography.title}>
									Query on MongoDB
								</Typography>
								<div {...styles.code}>
									<ReactPrismEditor
										style={{ height: '100%', maxHeight: 'inherit' }}
										language="json"
										theme="tomorrow"
										code={JSON.stringify(this.state.query.pipeline,null, '\t')}
										lineNumber={true}
										readOnly={false}
										clipboard={true}
										startingLineNumber = {1}
									/>
								</div>
							</MainCard>:
							<div></div>}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		);
	}
}
