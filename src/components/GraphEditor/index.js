		/* eslint-disable no-unused-vars */
		import React, { Component  } from 'react';
		import { djangoFetch } from 'API/url';
		import GridLayout from 'react-grid-layout';
		import { MenuItem, Select, Button } from '@mui/material';

		import { IconButton } from '@mui/material';
		import { Addchart, Delete, Save } from '@mui/icons-material';
		import { message } from 'antd';

		import {
			Typography,
			Grid,
			InputLabel,
			OutlinedInput,
		} from '@mui/material';


		// third party
		import * as Yup from 'yup';
		import { Formik } from 'formik';

		import MainCard from "components/MainCard";

		import PlotTile from 'components/Tiles/plotTile';

		import Editor from 'react-simple-code-editor';

		import Prism from 'prismjs';
		import 'prismjs/components/prism-clike';
		import 'prismjs/components/prism-javascript';
		import 'prismjs/components/prism-json';
		import 'prismjs/themes/prism.css'; //Example style, you can use another

		import "./styles.css";

		const randomString = (length) => {
			const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
			let result = '';
			for (let i = length; i > 0; --i) {
				result += chars[Math.floor(Math.random() * chars.length)];
			}
			return result;
		}

		export default class GraphEditor extends React.Component {
			constructor(props) {
				super(props);

				this.state = {
					graphID: this.getParam(),
					data: null,
					option: null,
					tile: null,
					query: null,
					editor: false,
					robotID: window.localStorage.getItem('robotID'),
				};
			}

			addChartClick = () => {
				const messageID = randomString(5) + this.state.robotID
				const sendJSON = {
					"query": {
						"dataSource": "DataSource",
						"database": "CeDRI_UGV_datalake",
						"collection": "Battery",
						"pipeline": [
						{
							"$project": {
							"dateTime": {
								"$dateTrunc": {
								"date": "$dateTime",
								"unit": "minute"
								}
							},
							"percentage": 1
							}
						},
						{
							"$densify": {
							"field": "dateTime",
							"range": {
								"step": 1,
								"unit": "minute",
								"bounds": "full"
							}
							}
						},
						{
							"$group": {
							"_id": "$dateTime",
							"percentage": {
								"$avg": "$percentage"
							}
							}
						},
						{
							"$sort": {
							"_id": -1
							}
						},
						{
							"$limit": 180
						},
						{
							"$project": {
							"percentage": {
								"$multiply": [
								"$percentage",
								100
								]
							}
							}
						},
						{
							"$sort": {
							"_id": 1
							}
						}
						]
					},
					"option": "option = {\n      title: {\n        text: 'New Chart',\n        left: '1%'\n      },\n      tooltip: {\n        trigger: 'axis'\n      },\n      grid: {\n        left: '5%',\n        right: '15%',\n        bottom: '10%'\n      },\n      xAxis: {\n        data: data.map(function (item) {\n          return item['_id'];\n        })\n      },\n      yAxis: {},\n      toolbox: {\n        right: 10,\n        feature: {\n          dataZoom: {\n            yAxisIndex: 'none'\n          },\n          restore: {},\n          saveAsImage: {}\n        }\n      },\n      dataZoom: [\n        {\n          startValue: '2014-06-01'\n        },\n        {\n          type: 'inside'\n        }\n      ],\n      visualMap: {\n        top: 50,\n        right: 10,\n        pieces: [\n          {\n            gt: 0,\n            lte: 20,\n            color: '#DB0700'\n          },\n          {\n            gt: 20,\n            lte: 40,\n            color: '#F58B0A'\n          },\n          {\n            gt: 40,\n            lte: 60,\n            color: '#EDD900'\n          },\n          {\n            gt: 60,\n            lte: 80,\n            color: '#7DD600'\n          },\n          {\n            gt: 80,\n            lte: 100,\n            color: '#1AB80F'\n          }\n        ],\n        outOfRange: {\n          color: '#999'\n        }\n      },\n      series: {\n        name: 'Percentage',\n        type: 'line',\n        data: data.map(function (item) {\n          return item['percentage'];\n        })\n      }\n    }\n",
					"tile": {
						"group": "New Group",
						"title": "New Chart"
					},
					"robot": this.state.robotID 
				}
				message.open({
					key: messageID,
					type: 'loading',
					content: 'Creating a chart',
					duration: 0,
				});
				djangoFetch('/chart', '/', 'POST', JSON.stringify(sendJSON))
				.then((response) => {
					if(response.status === 201){
						this.getList();
						this.render()
					}
				})
				.then(() => message.open({
					key: messageID,
					type: 'success',
					content: 'Chart created',
					duration: 2,
				}))
				.catch((e) => console.error(e))
				.catch(() => message.open({
					key: messageID,
					type: 'error',
					content: 'Error when creating',
					duration: 2,
				}))
			}

			removeChartClick = () => {
				const messageID = randomString(5) + this.state.robotID
				message.open({
					key: messageID,
					type: 'loading',
					content: 'Deleting the chart',
					duration: 0,
				});
				djangoFetch('/chart', '/?name='+this.state.graphID, 'DELETE', '')
				.then((response) => {
					if(response.status === 301){
						this.getList();
						this.render();
						window.location.href = `/CeDRI_dashboard/edit/chart?id=null`;
					}
				})
				.then(() => message.open({
					key: messageID,
					type: 'success',
					content: 'Chart deleted',
					duration: 2,
				}))
				.catch((e) => console.error(e))
				.catch(() => message.open({
					key: messageID,
					type: 'error',
					content: 'Error when deleting',
					duration: 2,
				}))
			}

			handleSubmitForm = () => {
				const form = document.getElementById('Internal-Button-Save-InForm');
				console.log(form.click())
				// form.submit()
			// 	if (form) {
			// 		form.dispatchEvent(new Event('submit', { cancelable: true }));
			// 	}
			}

			getList = () => {
				const sendJSON ={
					"pipeline": [
						{
						'$match': {
							'robot': this.state.robotID
						}
						}, {
						'$group': {
							'_id': '$name', 
							'label': {
								'$first': {
									'$concat': [
										'$tile.group', ' - ', '$tile.title'
									]
								}
							}
						}
						}
					]   
				}
				djangoFetch('/chart', '/', 'OPTIONS', JSON.stringify(sendJSON))
				.then((response) => response.json())
				.then((json) => {
					var _json = json
					_json.sort((function(a, b) {
						console.log(a)
						console.log(b)
						var aValue = a.label ; // Convert to lowercase for case-insensitive sorting
						var bValue = b.label; // Convert to lowercase for case-insensitive sorting						
						if (aValue < bValue) {
							return -1;
						}
						if (aValue > bValue) {
							return 1;
						}
						return 0;
					}))
					this.setState({list: _json})
					console.log(_json)
				})
			}

			handleGraphIDChange = (event) => {
				this.setState({graphID: event.target.value})
				console.log(event)
				window.location.href = `/CeDRI_dashboard/edit/chart?id=${event.target.value}`;
			}
			
			getParam = () => {
				const searchParams = new URLSearchParams(location.search);
				const graphIDParam = searchParams.get('id');
				console.log(graphIDParam)
				return graphIDParam
			}

			componentBreakpoint = (trigger) =>{
				const width = window.innerWidth
				return width < trigger
			}

			getData(){
				djangoFetch('/chart', '/?name=' + this.state.graphID, 'GET', '')
					.then(response => response.json())
					.then((json) => {
						const _json = json
						this.setState(_json)	
						this.setState({pipeline: JSON.stringify(_json.query.pipeline, null, '\t')})
					})
					.catch((e) => console.error(e))
			}

			componentDidMount = () => {
				this.getList()
				this.state.graphID?this.getData():null
			}

			CharForm() {
				return <MainCard style={{height:'100%', width:'100%'}}>
				<Typography align='center' variant='h5' color='textSecondary' >
					Chart configurations
				</Typography>
				<Formik
					initialValues={{
						name: this.state.tile.title,
						group: this.state.tile.group,
						database: this.state.query.database,
						collection: this.state.query.collection,
						submit: null,
					}}
					validationSchema={Yup.object().shape({
						name: Yup.string().max(255).required('Robot is required'),
						group: Yup.string().max(255).required('Robot is required'),
						database: Yup.string().max(255).required('Robot is required'),
						collection: Yup.string().max(255).required('Robot is required'),
					})}
					onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
						console.log(this.state.pipeline)
						console.log(JSON.parse(this.state.pipeline))
						const sendJSON = {
							"filter": {'name': this.state.graphID},
							"update": 
								{
									'$set': {
										'tile': {
											'group': values.group,
											'title': values.name
										},
										'query': {
											'dataSource': 'DataSource',
											'database': values.database,
											'collection': values.collection,
											'pipeline': JSON.parse(this.state.pipeline)
										},
										'option': this.state.option
									}
								}
						};
						console.log(this.state.pipeline)
						djangoFetch('/chart', '/?name='+this.state.graphID, 'PUT', JSON.stringify(sendJSON))
							.then((response) => {
								if (response.status === 202) {
									setStatus({ success: true });
									setSubmitting(false);
								}
								else {
									setStatus({ success: false });
									setErrors({ submit: 'Incorrect password or robot' });
									setSubmitting(false);
								}
								return response.json();
							})
							.then(()=>this.getData())
							.catch((e) => console.error(e));

						try {
							setStatus({ success: false });
							setSubmitting(false);
						} catch (err) {
							setStatus({ success: false });
							setErrors({ submit: err.message });
							setSubmitting(false);
						}
					}}
				>
					{({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
						<form noValidate onSubmit={handleSubmit} style={{height:'100%', with:'100%'}} id='GraphEditor-GridLayout-Grid-Form-form'>
							<Grid
								container
								direction="row"
								justifyContent="space-evenly"
								alignItems="stretch"
								columns={20}
								spacing={2}
							>
								<Grid item xs={20} sm={20} md={9} lg={9}>
									<InputLabel htmlFor="name">Chart name</InputLabel>
									<OutlinedInput
										id="name"
										type="name"
										value={values.name}
										name="name"
										onBlur={handleBlur}
										onChange={handleChange}
										placeholder="Chart name"
										fullWidth
										error={Boolean(touched.name && errors.name)} />
								</Grid>
								<Grid item xs={20} sm={20} md={9} lg={9}>
									<InputLabel htmlFor="name">Chart group</InputLabel>
									<OutlinedInput
										id="group"
										type="group"
										value={values.group}
										name="group"
										onBlur={handleBlur}
										onChange={handleChange}
										placeholder="Chart group"
										fullWidth
										error={Boolean(touched.group && errors.group)} />
								</Grid>
								<Grid item xs={20} sm={20} md={9} lg={9}>
									<InputLabel htmlFor="name">Query database</InputLabel>
									<OutlinedInput
										id="database"
										type="database"
										value={values.database}
										name="database"
										onBlur={handleBlur}
										onChange={handleChange}
										placeholder="Query database"
										fullWidth
										error={Boolean(touched.database && errors.database)} />
								</Grid>
								<Grid item xs={20} sm={20} md={9} lg={9}>
									<InputLabel htmlFor="name">Query collection</InputLabel>
									<OutlinedInput
										id="collection"
										type="collection"
										value={values.collection}
										name="collection"
										onBlur={handleBlur}
										onChange={handleChange}
										placeholder="Query collection"
										fullWidth
										error={Boolean(touched.collection && errors.collection)} />
								</Grid>
								<div className='graphEditor-Form-Save'>
									<Button
										id='Internal-Button-Save-InForm'
										disableElevation
										disabled={isSubmitting}
										fullWidth
										type="submit"
										variant="contained"
										color="primary"
									>
									</Button>
								</div>
							</Grid>
						</form>	
						)}
				</Formik>
				</MainCard>
			}

			PipelineCodeEditor(){
				return(
					<MainCard style={{height:'100%', width:'100%'}}>
						<Typography align='center' variant='h5' color='textSecondary' >
							Pipeline of data
						</Typography>
						<Editor
							value={this.state.pipeline}
							insertSpaces={1}
							tabSize={1}
							onValueChange={code => this.setState({pipeline: code})}
							highlight={code => Prism.highlight(code, Prism.languages.json, 'json')}
							padding={10}
							style={{
								fontFamily: '"Fira code", "Fira Mono", monospace',
								fontSize: 16,
							}}
							/>
					</MainCard>
					)}
			
			OptionCodeEditor(){
				return(
					<MainCard style={{height:'100%', width:'100%'}}>
						<Typography align='center' variant='h5' color='textSecondary' >
							Chart options
						</Typography>
						<Editor
							value={this.state.option}
							insertSpaces={1}
							tabSize={1}
							onValueChange={code => this.setState({option: code})}
							highlight={code => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
							padding={10}
							style={{
								fontFamily: '"Fira code", "Fira Mono", monospace',
								fontSize: 16,
							}}
							/>
					</MainCard>
					)}

			render() {
				const activeColor = '#454545';
				const compact = this.componentBreakpoint(1400)
				const layout = [
					{
						i: 'Plot',
						x: 0, y: 0,
						w: !compact?2:4, h: !compact?2:3,
						item: this.state.data?<PlotTile {...this.state}/>:null
					}, {
						i: 'Data',
						x: 0, y: 1,
						w: !compact?2:4, h: !compact?2:3,
						item: this.state.data?<PlotTile {...this.state} table={true}/>:null
					}, {
						i: 'Form',
						x: 2, y: !compact?0:3,
						w: !compact?2:4, h: !compact?1:2,
						item: this.state.tile?this.CharForm():null
					}, {
						i: 'ChartCode',
						x: 2, y: !compact?1:4,
						w: !compact?1:4, h: !compact?3:3,
						item: this.state.option?this.OptionCodeEditor():null
					},{
						i: 'PipelineCode',
						x: 3, y: !compact?1:5,
						w: !compact?1:4, h: !compact?3:3,
						item: this.state.pipeline?this.PipelineCodeEditor():null
					},
				]

				return (
					<div className='graphEditor' id='GraphEditor'>
						<div className="Header" id='GraphEditor-Header'>
							<div className="SelectGraph" id='GraphEditor-Header-SelectGraoh'>
								<Select
									value={this.state.graphID}
									onChange={this.handleGraphIDChange}
									label="Chart"
									id="select-graph"
									sx={{width: 200, height:36, backgroundColor: "#f5f5f5"}}
								>
									{this.state.list?this.state.list.map((graph) => (
									<MenuItem key={graph._id} value={graph._id}>
										{graph.label}
									</MenuItem>
									)):<></>}
								</Select>
							</div>
							
							<div className='Add' id='GraphEditor-Header-AddButton'>
								<IconButton sx={{ flexShrink: 0, backgroundColor: 'grey.100', color:'', height:36, width:36, borderRadius:2}}  onClick={this.addChartClick} >
									<Addchart sx={{color:activeColor, width:'130%' , height: '130%'}} />
								</IconButton>
							</div>

							<div className='Remove' id='GraphEditor-Header-RemoveButton'>
								<IconButton sx={{ flexShrink: 0, backgroundColor: 'grey.100', color:'', height:36, width:36, borderRadius:2}}  onClick={this.removeChartClick} >
									<Delete sx={{color:activeColor, width:'130%' , height: '130%'}} />
								</IconButton>
							</div>
							
							<div className='Save' id='GraphEditor-Header-SaveButton'>
								<IconButton sx={{ flexShrink: 0, backgroundColor: 'grey.100', color:'', height:36, width:36, borderRadius:2}} onClick={this.handleSubmitForm}>
									<Save sx={{color:activeColor, width:'130%' , height: '130%'}}/>
								</IconButton>
							</div>
						</div>

						<GridLayout className="grid" id='GraphEditor-GridLayout-Grid'
							layout={layout}
							cols={4}
							rowHeight={window.innerHeight/4 - 25}
							width={window.innerWidth - 20}
							margin={[5, 5]}
							isDraggable={false}
							isResizable={false}
							>
								{layout?layout.map((tile)=>
									<div key={tile.i} className='Tile' id={'GridLayout-Grid-'+tile.i}>
										{tile.item?tile.item:<MainCard style={{height:'100%', with:'100%'}}/>}
									</div>
								):<></>}
						</GridLayout>
					</div>
				);
			}

		}
