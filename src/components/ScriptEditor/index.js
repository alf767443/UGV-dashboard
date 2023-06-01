		/* eslint-disable no-unused-vars */
		import React, { Component  } from 'react';
		import { djangoFetch } from 'API/url';
		import GridLayout from 'react-grid-layout';
		import { MenuItem, Select, Button } from '@mui/material';

		import { IconButton } from '@mui/material';
		import { NoteAdd, Delete, Save } from '@mui/icons-material';
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
		import 'prismjs/components/prism-python';
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

		export default class ScriptEditor extends React.Component {
			constructor(props) {
				super(props);

				this.state = {
					scriptID: this.getParam(),
					script: null,
					code: null,
					next: null,
					last: null,
					sample: null,
					status: null,
					editor: false,
					robotID: window.localStorage.getItem('robotID'),
				};
			}

			addScriptClick = () => {
				const messageID = randomString(5) + this.state.robotID
				const sendJSON = {
					"robot": this.state.robotID,
					"code": "log(msg='Hello World', type='warn')",
					"sample": 60,
					"status": "stop",
					"script": {
						"title": "New Script",
						"group": "New Script",
					}
				}
				message.open({
					key: messageID,
					type: 'loading',
					content: 'Creating a script',
					duration: 0,
				});
				djangoFetch('/script', '/', 'POST', JSON.stringify(sendJSON))
				.then((response) => {
					if(response.status === 201){
						this.getList();
						this.render()
					}
				})
				.then(() => message.open({
					key: messageID,
					type: 'success',
					content: 'Script created',
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

			removeScriptClick = () => {
				const messageID = randomString(5) + this.state.robotID
				message.open({
					key: messageID,
					type: 'loading',
					content: 'Deleting the script',
					duration: 0,
				});
				djangoFetch('/script', '/?name='+this.state.scriptID, 'DELETE', '')
				.then((response) => {
					if(response.status === 301){
						this.getList();
						this.render();
						window.location.href = `/CeDRI_dashboard/edit/script?id=null`;
					}
				})
				.then(() => message.open({
					key: messageID,
					type: 'success',
					content: 'Script deleted',
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
										'$script.group', ' - ', '$script.title'
									]
								}
							}
						}
						}
					]   
				}
				djangoFetch('/script', '/', 'OPTIONS', JSON.stringify(sendJSON))
				.then((response) => response.json())
				.then((json) => {
					const _json = json
					this.setState({list: _json})
					console.log(_json)
				})
			}

			handleGraphIDChange = (event) => {
				this.setState({scriptID: event.target.value})
				console.log(event)
				window.location.href = `/CeDRI_dashboard/edit/script?id=${event.target.value}`;
			}
			
			getParam = () => {
				const searchParams = new URLSearchParams(location.search);
				const scriptIDParam = searchParams.get('id');
				console.log(scriptIDParam)
				return scriptIDParam
			}

			componentBreakpoint = (trigger) =>{
				const width = window.innerWidth
				return width < trigger
			}

			getData = () =>{
				djangoFetch('/script', '/?name=' + this.state.scriptID, 'GET', '')
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
				this.state.scriptID?this.getData():null
			}

			CodeEditor = () => {
				return(
				<MainCard style={{height:'100%', width:'100%'}}>
					<Typography align='center' variant='h5' color='textSecondary' >
						Script code
					</Typography>
					<Editor
						value={this.state.code}
						insertSpaces={1}
						tabSize={1}
						onValueChange={code => this.setState({code: code})}
						highlight={code => Prism.highlight(code, Prism.languages.python, 'python')}
						padding={10}
						style={{
							fontFamily: '"Fira code", "Fira Mono", monospace',
							fontSize: 16,
						}}
						/>
				</MainCard>
			)}

			FormEditor = () => {
				return (
					<MainCard style={{height:'100%', width:'100%'}}>
						<Typography align='center' variant='h5' color='textSecondary' >
							Script configurations
						</Typography>
						<Formik
							initialValues={{
								name: this.state.script.title,
								group: this.state.script.group,
								sample: this.state.sample,
								submit: null,
							}}
							validationSchema={Yup.object().shape({
								name: Yup.string().max(255).required('Robot is required'),
								group: Yup.string().max(255).required('Robot is required'),
								sample: Yup.number().required('Robot is required'),
							})}
							onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
								const sendJSON = {
									"filter": {'name': this.state.scriptID},
									"update": 
										{
											'$set': {
												'script': {
													'group': values.group,
													'title': values.name
												},
												'sample': parseFloat(values.sample),
												'code': this.state.code
											}
										}
								};
								djangoFetch('/script', '/?name='+this.state.scriptID, 'PUT', JSON.stringify(sendJSON))
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
								<form noValidate onSubmit={handleSubmit} style={{height:'100%', with:'100%'}} id='ScriptEditor-GridLayout-Grid-Form-form'>
									<Grid
										container
										direction="row"
										justifyContent="space-evenly"
										alignItems="stretch"
										columns={6}
										spacing={2}
									>
										<Grid item xs={6} sm={6} md={2} lg={2}>
											<InputLabel htmlFor="name">Script name</InputLabel>
											<OutlinedInput
												id="name"
												type="name"
												value={values.name}
												name="name"
												onBlur={handleBlur}
												onChange={handleChange}
												placeholder="Script name"
												fullWidth
												error={Boolean(touched.name && errors.name)} />
										</Grid>
										<Grid item xs={6} sm={6} md={2} lg={2}>
											<InputLabel htmlFor="name">Script group</InputLabel>
											<OutlinedInput
												id="group"
												type="group"
												value={values.group}
												name="group"
												onBlur={handleBlur}
												onChange={handleChange}
												placeholder="Script group"
												fullWidth
												error={Boolean(touched.group && errors.group)} />
										</Grid>
										<Grid item xs={6} sm={6} md={2} lg={2}>
											<InputLabel htmlFor="name">Sample time {`[s]`}</InputLabel>
											<OutlinedInput
												id="sample"
												type="sample"
												value={values.sample}
												name="sample"
												onBlur={handleBlur}
												onChange={handleChange}
												placeholder="Query sample"
												fullWidth
												error={Boolean(touched.sample && errors.sample)} />
										</Grid>
										<div className='scriptEditor-Form-Save'>
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
				)
			}

			render() {
				console.log(this.state)
				const activeColor = '#454545';
				return (
					<div className='scriptEditor' id='ScriptEditor'>
						<div className="Header" id='ScriptEditor-Header'>
							<div className="SelectGraph" id='ScriptEditor-Header-SelectGraoh'>
								<Select
									value={this.state.scriptID}
									onChange={this.handleGraphIDChange}
									label="Script"
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
							
							<div className='Add' id='ScriptEditor-Header-AddButton'>
								<IconButton sx={{ flexShrink: 0, backgroundColor: 'grey.100', color:'', height:36, width:36, borderRadius:2}}  onClick={this.addScriptClick} >
									<NoteAdd sx={{color:activeColor, width:'130%' , height: '130%'}} />
								</IconButton>
							</div>

							<div className='Remove' id='ScriptEditor-Header-RemoveButton'>
								<IconButton sx={{ flexShrink: 0, backgroundColor: 'grey.100', color:'', height:36, width:36, borderRadius:2}}  onClick={this.removeScriptClick} >
									<Delete sx={{color:activeColor, width:'130%' , height: '130%'}} />
								</IconButton>
							</div>
							
							<div className='Save' id='ScriptEditor-Header-SaveButton'>
								<IconButton sx={{ flexShrink: 0, backgroundColor: 'grey.100', color:'', height:36, width:36, borderRadius:2}} onClick={this.handleSubmitForm}>
									<Save sx={{color:activeColor, width:'130%' , height: '130%'}}/>
								</IconButton>
							</div>
						</div>
						<Grid container
							padding={2}
							rowSpacing={2}
							direction="column"
							justifyContent="flex-start"
							alignItems="stretch">
							<Grid item>
								{this.state.script && this.state.sample?this.FormEditor():<MainCard />}
							</Grid>
							<Grid item>
								{this.state.code?this.CodeEditor():<MainCard />}
							</Grid>
						</Grid>
					</div>
				);
			}

		}
