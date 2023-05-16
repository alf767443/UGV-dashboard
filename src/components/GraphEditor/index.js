/* eslint-disable no-unused-vars */
import React, { Component  } from 'react';
import * as echarts from 'echarts';
import { djangoFetch } from 'API/url';

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

import PlotTile from 'components/Tiles/plotTile';

import ReactPrismEditor from "react-prism-editor";

import SaveIcon from "@mui/icons-material/Save";

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
			editor: false,
		};
	}

	getData(){
		////console.log(this.state.graphID)
		djangoFetch('/chart', '/?name=' + this.state.graphID, 'GET', '')
			.then(response => response.json())
			.then((json) => {
				const _json = json
				this.setState(_json)	
				this.setState({pipeline: JSON.stringify(_json.query.pipeline, null, '\t')})
				////console.info(this.state)
			})
			.catch((e) => console.error(e))
		}

	componentDidMount = () => {
		this.getData();
	}

	CharForm() {
		return <Grid item>
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
				//console.log(JSON.parse(this.state.pipeline))
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
				//console.log(sendJSON)
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
		</Grid>
	}

	OptionPipelineEditor() {
		return <Grid
			container
			direction="row"
			justifyContent="space-evenly"
			alignItems="stretch"
			columns={16}
			spacing={1}
		>
			<Grid item xs={16} sm={16} md={8} lg={8}>
				{this.state.option ?
					<MainCard>
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
								startingLineNumber={1}
								changeCode={(code) => {
									this.setState({ option: code });
								} } />
						</div>
					</MainCard> :
					<></>}
			</Grid>
			<Grid item xs={16} sm={16} md={8} lg={8}>
				{this.state.query ?
					<MainCard>
						<Typography {...styles.typography.title}>
							Pipeline of data
						</Typography>
						<div {...styles.code}>
							<ReactPrismEditor
								style={{ height: '100%', maxHeight: 'inherit' }}
								language="json"
								theme="tomorrow"
								code={this.state.pipeline}
								lineNumber={true}
								readOnly={false}
								clipboard={true}
								startingLineNumber={1}
								changeCode={(code) => {
									this.setState({ pipeline: code });
								}} 
								/>
								
						</div>
					</MainCard> :
					<></>}
			</Grid>
		</Grid>;
	}
	
	render() {
		////console.log(this.state)
		return (
			<Grid
				container
				direction="row"
				justifyContent="space-evenly"
				alignItems="stretch"
				columns={16}
				spacing={1}
				>
				<Grid item xs={16} sm={16} md={8} lg={8}>
					<Grid
						container
						direction="column"
						justifyContent="space-evenly"
						alignItems="stretch"
						columns={16}
						spacing={1}
						>
						<Grid item>
							<div {...styles.graph}>
								{this.state.data && this.state.option && this.state.tile?<PlotTile {...this.state}/>:<></>}
							</div>
						</Grid>
						<Grid item>
							<div {...styles.graph}>
								{this.state.data && this.state.option && this.state.tile?<PlotTile {...this.state} table={true}/>:<></>}							
							</div>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={16} sm={16} md={8} lg={8}>
					<Grid
						container
						direction="column"
						justifyContent="space-evenly"
						alignItems="stretch"
						columns={16}
						spacing={1}
					>
						<Grid item>
							{this.state.query && this.state.tile?this.CharForm():<></>}
						</Grid>
						<Grid item>
							{this.state.pipeline?this.OptionPipelineEditor():<></>}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		);
	}

}
