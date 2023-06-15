		/* eslint-disable no-unused-vars */
		import React, { Component  } from 'react';
		import { djangoFetch } from 'API/url';
		import GridLayout from 'react-grid-layout';
		import { MenuItem, Select, Button } from '@mui/material';

		import { IconButton } from '@mui/material';
		import { NoteAdd, Delete, Save, ContentCopy} from '@mui/icons-material';
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

		export default class ActionEditor extends React.Component {
			constructor(props) {
				super(props);

				this.state = {
					actionID: this.getParam(),
					action: null,
					command: null,
					editor: false,
					robotID: window.localStorage.getItem('robotID'),
				};
			}

			addActionClick = () => {
				const messageID = randomString(5) + this.state.robotID
				const sendJSON = {
					"robot": this.state.robotID,
					"command": "",
					"action": {
						"title": "New Action",
						"group": "New Action",
					}
				}
				message.open({
					key: messageID,
					type: 'loading',
					content: 'Creating a action',
					duration: 0,
				});
				djangoFetch('/action', '/', 'POST', JSON.stringify(sendJSON))
				.then((response) => {
					if(response.status === 201){
						this.getList();
						this.render()
					}
				})
				.then(() => message.open({
					key: messageID,
					type: 'success',
					content: 'Action created',
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

			removeActionClick = () => {
				const messageID = randomString(5) + this.state.robotID
				message.open({
					key: messageID,
					type: 'loading',
					content: 'Deleting the action',
					duration: 0,
				});
				djangoFetch('/action', '/?name='+this.state.actionID, 'DELETE', '')
				.then((response) => {
					if(response.status === 301){
						this.getList();
						this.render();
						window.location.href = `/CeDRI_dashboard/edit/action?id=null`;
					}
				})
				.then(() => message.open({
					key: messageID,
					type: 'success',
					content: 'Action deleted',
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

			copyActionClick = () => {
				const messageID = randomString(5) + this.state.robotID
				const sendJSON = {
					command: this.state.command,
					action: {
						group: this.state.action.group,
						title: this.state.action.title + '(copy)'
					},
					robot: this.state.robotID
				}
				message.open({
					key: messageID,
					type: 'loading',
					content: 'Creating a action',
					duration: 0,
				});
				djangoFetch('/action', '/', 'POST', JSON.stringify(sendJSON))
				.then((response) => {
					if(response.status === 201){
						this.getList();
						this.render()
					}
				})
				.then(() => message.open({
					key: messageID,
					type: 'success',
					content: 'Action created',
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
										'$action.group', ' - ', '$action.title'
									]
								}
							}
						}
						}
					]   
				}
				djangoFetch('/action', '/?query=1', 'OPTIONS', JSON.stringify(sendJSON))
				.then((response) => response.json())
				.then((json) => {
					const _json = json
					this.setState({list: _json})
					console.log(_json)
				})
			}

			handleGraphIDChange = (event) => {
				this.setState({actionID: event.target.value})
				console.log(event)
				window.location.href = `/CeDRI_dashboard/edit/action?id=${event.target.value}`;
			}
			
			getParam = () => {
				const searchParams = new URLSearchParams(location.search);
				const actionIDParam = searchParams.get('id');
				console.log(actionIDParam)
				return actionIDParam
			}

			componentBreakpoint = (trigger) =>{
				const width = window.innerWidth
				return width < trigger
			}

			getData = () =>{
				djangoFetch('/action', '/?name=' + this.state.actionID, 'GET', '')
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
				this.state.actionID?this.getData():null
			}

			FormEditor = () => {
				return (
					<MainCard style={{height:'100%', width:'100%'}}>
						<Typography align='center' variant='h5' color='textSecondary' >
							Action configurations
						</Typography>
						<Formik
							initialValues={{
								name: this.state.action.title,
								group: this.state.action.group,
								command: this.state.command,
								submit: null,
							}}
							validationSchema={Yup.object().shape({
								name: Yup.string().max(255).required('Robot is required'),
								group: Yup.string().max(255).required('Group is required'),
								command: Yup.string().max(255).required('Command is required'),
							})}
							onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
								const sendJSON = {
									"filter": {'name': this.state.actionID},
									"update": 
										{
											'$set': {
												'action': {
													'group': values.group,
													'title': values.name
												},
												'command': values.command
											}
										}
								};
								djangoFetch('/action', '/?name='+this.state.actionID, 'PUT', JSON.stringify(sendJSON))
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
								<form noValidate onSubmit={handleSubmit} style={{height:'100%', with:'100%'}} id='ActionEditor-GridLayout-Grid-Form-form'>
									<Grid
										container
										direction="row"
										justifyContent="space-evenly"
										alignItems="stretch"
										columns={6}
										spacing={2}
										padding={2}
									>
										<Grid item xs={6} sm={6} md={3} lg={3}>
											<InputLabel htmlFor="name">Action name</InputLabel>
											<OutlinedInput
												id="name"
												type="name"
												value={values.name}
												name="name"
												onBlur={handleBlur}
												onChange={handleChange}
												placeholder="Action name"
												fullWidth
												error={Boolean(touched.name && errors.name)} />
										</Grid>
										<Grid item xs={6} sm={6} md={3} lg={3}>
											<InputLabel htmlFor="name">Action group</InputLabel>
											<OutlinedInput
												id="group"
												type="group"
												value={values.group}
												name="group"
												onBlur={handleBlur}
												onChange={handleChange}
												placeholder="Action group"
												fullWidth
												error={Boolean(touched.group && errors.group)} />
										</Grid>
										<Grid item xs={6} >
											<InputLabel htmlFor="name">Command</InputLabel>
											<OutlinedInput
												id="command"
												type="command"
												value={values.command}
												name="command"
												onBlur={handleBlur}
												onChange={handleChange}
												placeholder="Query command"
												fullWidth
												error={Boolean(touched.command && errors.command)} />
										</Grid>
										<div className='actionEditor-Form-Save'>
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
				const activeColor = '#454545';
				return (
					<div className='actionEditor' id='ActionEditor'>
						<div className="Header" id='ActionEditor-Header'>
							<div className="SelectGraph" id='ActionEditor-Header-SelectGraoh'>
								<Select
									value={this.state.actionID}
									onChange={this.handleGraphIDChange}
									label="Action"
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
							
							<div className='Add' id='ActionEditor-Header-AddButton'>
								<IconButton sx={{ flexShrink: 0, backgroundColor: 'grey.100', color:'', height:36, width:36, borderRadius:2}}  onClick={this.addActionClick} >
									<NoteAdd sx={{color:activeColor, width:'130%' , height: '130%'}} />
								</IconButton>
							</div>

							<div className='Copy' id='ActionEditor-Header-CopyButton'>
								<IconButton sx={{ flexShrink: 0, backgroundColor: 'grey.100', color:'', height:36, width:36, borderRadius:2}}  onClick={this.copyActionClick} >
									<ContentCopy sx={{color:activeColor, width:'130%' , height: '130%'}} />
								</IconButton>
							</div>

							<div className='Remove' id='ActionEditor-Header-RemoveButton'>
								<IconButton sx={{ flexShrink: 0, backgroundColor: 'grey.100', color:'', height:36, width:36, borderRadius:2}}  onClick={this.removeActionClick}>
									<Delete sx={{color:activeColor, width:'130%' , height: '130%'}} />
								</IconButton>
							</div>
							
							<div className='Save' id='ActionEditor-Header-SaveButton'>
								<IconButton sx={{ flexShrink: 0, backgroundColor: 'grey.100', color:'', height:36, width:36, borderRadius:2}} onClick={this.handleSubmitForm}>
									<Save sx={{color:activeColor, width:'130%' , height: '130%'}}/>
								</IconButton>
							</div>

						</div>
						<div className='Body' id='ActionEditor-Body'>
							<div className='FormEdit' id='ActionEditor-Body-FormEditor'>
								{this.state.action?this.FormEditor():null}
							</div>
						</div>
					</div>
				);
			}

		}
