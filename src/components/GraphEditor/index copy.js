/* eslint-disable no-unused-vars */
import React, { Component, useState  } from 'react';
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
// export default class GraphEditor extends React.Component {
// 	constructor(props) {
// 		super(props);

// 		state = {
// 			graphID: props.graphID,
// 			list: null,
// 			data: null,
// 			option: null,
// 			tile: null,
// 			query: null,
// 			editor: false,
// 		};
// 	}

	// getData(){
	// 	////console.log(graphID)
	// 	djangoFetch('/chart', '/?name=' + graphID, 'GET', '')
	// 		.then(response => response.json())
	// 		.then((json) => {
	// 			const _json = json
	// 			setState(_json)	
	// 			setState({pipeline: JSON.stringify(_json.query.pipeline, null, '\t')})
	// 			////console.info(state)
	// 		})
	// 		.catch((e) => console.error(e))
	// 	}

	// 	componentDidMount = () => {
	// 		getData();
	// 	}

	// CharForm() {
	// 	return <Grid item>
	// 	<Formik
	// 		initialValues={{
	// 			name: tile.title,
	// 			group: tile.group,
	// 			database: query.database,
	// 			collection: query.collection,
	// 			submit: null,
	// 		}}
	// 		validationSchema={Yup.object().shape({
	// 			name: Yup.string().max(255).required('Robot is required'),
	// 			group: Yup.string().max(255).required('Robot is required'),
	// 			database: Yup.string().max(255).required('Robot is required'),
	// 			collection: Yup.string().max(255).required('Robot is required'),
	// 		})}
	// 		onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
	// 			//console.log(JSON.parse(pipeline))
	// 			const sendJSON = {
	// 				"filter": {'name': graphID},
	// 				"update": 
	// 					{
	// 						'$set': {
	// 							'tile': {
	// 								'group': values.group,
	// 								'title': values.name
	// 							},
	// 							'query': {
	// 								'dataSource': 'DataSource',
	// 								'database': values.database,
	// 								'collection': values.collection,
	// 								'pipeline': JSON.parse(pipeline)
	// 							},
	// 							'option': option
	// 						}
	// 					}
	// 			};
	// 			//console.log(sendJSON)
	// 			djangoFetch('/chart', '/?name='+graphID, 'PUT', JSON.stringify(sendJSON))
	// 				.then((response) => {
	// 					if (response.status === 202) {
	// 						setStatus({ success: true });
	// 						setSubmitting(false);
	// 					}
	// 					else {
	// 						setStatus({ success: false });
	// 						setErrors({ submit: 'Incorrect password or robot' });
	// 						setSubmitting(false);
	// 					}
	// 					return response.json();
	// 				})
	// 				.then(()=>getData())
	// 				.catch((e) => console.error(e));

	// 			try {
	// 				setStatus({ success: false });
	// 				setSubmitting(false);
	// 			} catch (err) {
	// 				setStatus({ success: false });
	// 				setErrors({ submit: err.message });
	// 				setSubmitting(false);
	// 			}
	// 		} }
	// 	>
	// 		{({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
	// 			<form noValidate onSubmit={handleSubmit}>
	// 				<MainCard >
	// 					<Typography {...styles.typography.title}>
	// 						Chart configurations
	// 					</Typography>
	// 					<Grid
	// 						container
	// 						direction="row"
	// 						justifyContent="space-evenly"
	// 						alignItems="stretch"
	// 						columns={20}
	// 						spacing={2}
	// 					>
	// 						<Grid item xs={20} sm={20} md={9} lg={9}>
	// 							<InputLabel htmlFor="name">Chart name</InputLabel>
	// 							<OutlinedInput
	// 								id="name"
	// 								type="name"
	// 								value={values.name}
	// 								name="name"
	// 								onBlur={handleBlur}
	// 								onChange={handleChange}
	// 								placeholder="Chart name"
	// 								fullWidth
	// 								error={Boolean(touched.name && errors.name)} />
	// 						</Grid>
	// 						<Grid item xs={20} sm={20} md={9} lg={9}>
	// 							<InputLabel htmlFor="name">Chart group</InputLabel>
	// 							<OutlinedInput
	// 								id="group"
	// 								type="group"
	// 								value={values.group}
	// 								name="group"
	// 								onBlur={handleBlur}
	// 								onChange={handleChange}
	// 								placeholder="Chart group"
	// 								fullWidth
	// 								error={Boolean(touched.group && errors.group)} />
	// 						</Grid>
	// 						<Grid item xs={20} sm={20} md={9} lg={9}>
	// 							<InputLabel htmlFor="name">Query database</InputLabel>
	// 							<OutlinedInput
	// 								id="database"
	// 								type="database"
	// 								value={values.database}
	// 								name="database"
	// 								onBlur={handleBlur}
	// 								onChange={handleChange}
	// 								placeholder="Query database"
	// 								fullWidth
	// 								error={Boolean(touched.database && errors.database)} />
	// 						</Grid>
	// 						<Grid item xs={20} sm={20} md={9} lg={9}>
	// 							<InputLabel htmlFor="name">Query collection</InputLabel>
	// 							<OutlinedInput
	// 								id="collection"
	// 								type="collection"
	// 								value={values.collection}
	// 								name="collection"
	// 								onBlur={handleBlur}
	// 								onChange={handleChange}
	// 								placeholder="Query collection"
	// 								fullWidth
	// 								error={Boolean(touched.collection && errors.collection)} />
	// 						</Grid>
	// 						<Grid
	// 							container
	// 							direction="row"
	// 							justifyContent="flex-end"
	// 							alignItems="stretch"
	// 							columns={20}
	// 							spacing={1}
	// 						>
	// 							<Grid item >
	// 								<Button
	// 									disableElevation
	// 									disabled={isSubmitting}
	// 									fullWidth
	// 									size="large"
	// 									type="submit"
	// 									variant="contained"
	// 									color="primary"
	// 									endIcon={<SaveIcon />}
	// 								>
	// 								Salvar
	// 								</Button>
	// 							</Grid>	
	// 						</Grid>
	// 					</Grid>
	// 				</MainCard>
	// 			</form>
	// 		)}
	// 	</Formik>
	// 	</Grid>
	// }

		// OptionPipelineEditor() {
		// 	return <Grid
		// 		container
		// 		direction="row"
		// 		justifyContent="space-evenly"
		// 		alignItems="stretch"
		// 		columns={16}
		// 		spacing={1}
		// 	>
		// 		<Grid item xs={16} sm={16} md={8} lg={8}>
		// 			{option ?
		// 				<MainCard>
		// 					<Typography {...styles.typography.title}>
		// 						Options of chart
		// 					</Typography>
		// 					<div {...styles.code}>
		// 						<ReactPrismEditor
		// 							style={{ height: '100%', maxHeight: 'inherit' }}
		// 							language="javascript"
		// 							theme="tomorrow"
		// 							code={option}
		// 							lineNumber={true}
		// 							readOnly={false}
		// 							clipboard={true}
		// 							startingLineNumber={1}
		// 							changeCode={(code) => {
		// 								setState({ option: code });
		// 							} } />
		// 					</div>
		// 				</MainCard> :
		// 				<></>}
		// 		</Grid>
		// 		<Grid item xs={16} sm={16} md={8} lg={8}>
		// 			{query ?
		// 				<MainCard>
		// 					<Typography {...styles.typography.title}>
		// 						Pipeline of data
		// 					</Typography>
		// 					<div {...styles.code}>
		// 						<ReactPrismEditor
		// 							style={{ height: '100%', maxHeight: 'inherit' }}
		// 							language="json"
		// 							theme="tomorrow"
		// 							code={pipeline}
		// 							lineNumber={true}
		// 							readOnly={false}
		// 							clipboard={true}
		// 							startingLineNumber={1}
		// 							changeCode={(code) => {
		// 								setState({ pipeline: code });
		// 							}} 
		// 							/>
									
		// 					</div>
		// 				</MainCard> :
		// 				<></>}
		// 		</Grid>
		// 	</Grid>;
		// }
	
// 	render() {
// 		//console.log(state)
		// return (
		// 	<Grid
		// 		container
		// 		direction="row"
		// 		justifyContent="space-evenly"
		// 		alignItems="stretch"
		// 		columns={16}
		// 		spacing={1}
		// 		>
		// 		<Grid item xs={16} sm={16} md={8} lg={8}>
		// 			<Grid
		// 				container
		// 				direction="column"
		// 				justifyContent="space-evenly"
		// 				alignItems="stretch"
		// 				columns={16}
		// 				spacing={1}
		// 				>
		// 				<Grid item>
		// 					<div {...styles.graph}>
		// 						{data && option && tile?<PlotTile {...state}/>:<></>}
		// 					</div>
		// 				</Grid>
		// 				<Grid item>
		// 					<div {...styles.graph}>
		// 						{data && option && tile?<PlotTile {...state} table={true}/>:<></>}							
		// 					</div>
		// 				</Grid>
		// 			</Grid>
		// 		</Grid>
		// 		<Grid item xs={16} sm={16} md={8} lg={8}>
		// 			<Grid
		// 				container
		// 				direction="column"
		// 				justifyContent="space-evenly"
		// 				alignItems="stretch"
		// 				columns={16}
		// 				spacing={1}
		// 			>
		// 				<Grid item>
		// 					{query && tile?CharForm():<></>}
		// 				</Grid>
		// 				<Grid item>
		// 					{pipeline?OptionPipelineEditor():<></>}
		// 				</Grid>
		// 			</Grid>
		// 		</Grid>
		// 	</Grid>
		// );
// 	}

// }


const GraphEditor = (props) => {
	const [graphID, setGraphID] = useState(null)
	const [state, setState] = useState(null)
	const [canUpdate, setCanUpdate] = useState(false)
	const [option, setOption] = useState(null)
	const [tile, setTile] = useState(null)
	const [query, setQuery] = useState(null)
	const [pipeline, setPipeline] = useState(null)
	const [data, setData] = useState(null)

	const CharForm = () =>
	<Grid item>
		<Formik
			initialValues={{
				name: tile.title,
				group: tile.group,
				database: query.database,
				collection: query.collection,
				submit: null,
			}}
			validationSchema={Yup.object().shape({
				name: Yup.string().max(255).required('Robot is required'),
				group: Yup.string().max(255).required('Robot is required'),
				database: Yup.string().max(255).required('Robot is required'),
				collection: Yup.string().max(255).required('Robot is required'),
			})}
			onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
				//console.log(JSON.parse(pipeline))
				const sendJSON = {
					"filter": {'name': graphID},
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
									'pipeline': JSON.parse(pipeline)
								},
								'option': option
							}
						}
				};
				//console.log(sendJSON)
				djangoFetch('/chart', '/?name='+graphID, 'PUT', JSON.stringify(sendJSON))
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
					.then(()=>getData())
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

	const OptionPipelineEditor = () => 
	<Grid container
		direction="row"
		justifyContent="space-evenly"
		alignItems="stretch"
		columns={16}
		spacing={1}
	>
		<Grid item xs={16} sm={16} md={8} lg={8}>
			{option ?
				<MainCard>
					<Typography {...styles.typography.title}>
						Options of chart
					</Typography>
					<div {...styles.code}>
						<ReactPrismEditor
							style={{ height: '100%', maxHeight: 'inherit' }}
							language="javascript"
							theme="tomorrow"
							code={option}
							lineNumber={true}
							readOnly={false}
							clipboard={true}
							startingLineNumber={1}
							changeCode={(code) => {
								setOption(code)
							} } />
					</div>
				</MainCard> :
				<></>}
		</Grid>
		<Grid item xs={16} sm={16} md={8} lg={8}>
			{query ?
				<MainCard>
					<Typography {...styles.typography.title}>
						Pipeline of data
					</Typography>
					<div {...styles.code}>
						<ReactPrismEditor
							style={{ height: '100%', maxHeight: 'inherit' }}
							language="json"
							theme="tomorrow"
							code={pipeline}
							lineNumber={true}
							readOnly={false}
							clipboard={true}
							startingLineNumber={1}
							changeCode={(code) => {
								setPipeline(code)
							}} 
							/>
							
					</div>
				</MainCard> :
				<></>}
		</Grid>
	</Grid>;

	function getData(){
		setCanUpdate(false)
		graphID?djangoFetch('/chart', '/?name=' + graphID, 'GET', '')
			.then(response => response.json())
			.then((json) => {
				const _json = json
				//console.log(_json)
				setState(_json)
				setOption(_json.option)
				setTile(_json.tile)
				setQuery(_json.query)
				setData(_json.data)
				setPipeline(JSON.stringify(_json.query.pipeline, null, '\t'))
			})
			.catch((e) => console.error(e))
		:null
	}

	if(graphID != props.graphID){
		setGraphID(props.graphID)
		setCanUpdate(true)
	}

	canUpdate?getData():null

	return (
		<Grid container
			direction="row"
			justifyContent="space-evenly"
			alignItems="stretch"
			columns={16}
			spacing={1}
			>
			<Grid item xs={16} sm={16} md={8} lg={8}>
				<Grid container
					direction="column"
					justifyContent="space-evenly"
					alignItems="stretch"
					columns={16}
					spacing={1}
					>
					<Grid item>
						<div {...styles.graph}>
							{data && option && tile?<PlotTile {...state}/>:<></>}
						</div>
					</Grid>
					<Grid item>
						<div {...styles.graph}>
							{data && option && tile?<PlotTile {...state} table={true}/>:<></>}							
						</div>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={16} sm={16} md={8} lg={8}>
				<Grid container
					direction="column"
					justifyContent="space-evenly"
					alignItems="stretch"
					columns={16}
					spacing={1}
				>
					<Grid item>
						{query && tile?CharForm():<></>}
					</Grid>
					<Grid item>
						{pipeline?OptionPipelineEditor():<></>}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
} 

export default GraphEditor

