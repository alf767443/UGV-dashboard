/* eslint-disable no-unused-vars */
import React, { Component  } from 'react';
import * as echarts from 'echarts';
import { djangoFetch } from 'API/url';
import { useLocation } from 'react-router-dom';


import {
	Typography,
	Grid,
    Button,
	Box,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
	Skeleton,
	Divider,
} from '@mui/material';


// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

import MainCard from "components/MainCard";

import ReactPrismEditor from "react-prism-editor";

import SaveIcon from "@mui/icons-material/Save";


import styles from './styles';
import "./styles.css";


export default class ScriptEditor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			graphID: this.props.graphID,
			next: null,
			last: null,
			sample: null,
			status: null, 
			script: null,
			code: null,
			editor: false,
		};
	}

	getData(){
		djangoFetch('/script', '/?name=' + this.state.graphID, 'GET', '')
		.then(response => response.json())
		.then((json) => {
			const _json = json
			this.setState(_json)
			console.log(_json)
		})
		.then(() => console.log(this.state))
		.catch((e) => console.error(e))
	}

	componentDidMount = () => {
		this.getData();
	}

	render() {
		return (
			<div className='main'>
			<Grid
				container
				direction="row"
				justifyContent="space-evenly"
				alignItems="stretch"
				columns={16}
				spacing={1}
			>					
			{this.state.graphID && this.state.script?
				<Grid item xs={16} sm={16} md={16} lg={16}>
					<Formik
						initialValues={{
							name: this.state.script.title,
							group: this.state.script.group,
							submit: null,
						}}
						validationSchema={Yup.object().shape({
							name: Yup.string().max(255).required('Robot is required'),
							group: Yup.string().max(255).required('Robot is required'),
						})}
						onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
							const sendJSON = {
								"filter": {'name': this.state.graphID},
								"update": 
									{
										'$set': {
											'script': {
												'group': values.group,
												'title': values.name
											},
											'code': this.state.code,
										}
									}
							};
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
						} }
					>
						{({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
							<form noValidate onSubmit={handleSubmit}>
								<MainCard >
									<Typography {...styles.typography.title}>
										Chart configurations
									</Typography>
									<Grid
										container
										direction="row"
										justifyContent="space-evenly"
										alignItems="stretch"
										columns={20}
										spacing={2}
									>
										<Grid item xs={20} sm={20} md={20} lg={20}>
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
										<Grid item xs={20} sm={20} md={20} lg={20}>
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
									
										<Grid
											container
											direction="row"
											justifyContent="flex-end"
											alignItems="stretch"
											columns={20}
											spacing={1}
										>
											<Grid item >
												<Button
													disableElevation
													disabled={isSubmitting}
													fullWidth
													size="large"
													type="submit"
													variant="contained"
													color="primary"
													endIcon={<SaveIcon />}
												>
												Salvar
												</Button>
											</Grid>	
										</Grid>
									</Grid>
								</MainCard>
							</form>
						)}
					</Formik>
				</Grid>:<></>}
			{this.state.graphID && this.state.code?
				<Grid item xs={16} sm={16} md={16} lg={16}>
					<MainCard>
						<Typography {...styles.typography.title}>
							Python script
						</Typography>
						<div >
							<ReactPrismEditor
								style={{ height: '100%', maxHeight: 'inherit' }}
								language="python"
								theme="tomorrow"
								code={this.state.code}
								lineNumber={true}
								readOnly={false}
								clipboard={true}
								startingLineNumber={1}
								changeCode={(code) => {
									this.setState({ code: code });
								} } />
						</div>
					</MainCard> 
				</Grid>:<></>}
			</Grid>
			</div>
		);
	}

}
