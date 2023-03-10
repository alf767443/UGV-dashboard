// import React from "react";
import * as React from 'react';

import { Typography, Stack, Grid } from '@mui/material';

import styles from "graphs/styles";

import IconLogger from './iconLog';

import { BatteryChargingFull, TrackChanges, Straighten, ElectricMeter, Explore, ModeStandby } from '@mui/icons-material';


var pipeline = 
{
	battery: JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_datalake",
	"collection": "Diagnostics",
	"pipeline": [
		{
			'$match': {
				'name': '/Motors/motor_node: Battery'
			}
		}, {
			'$sort': {
				'dateTime': -1
			}
		}, {
			'$limit': 5
		}
	]
	}),
	lidar: JSON.stringify({
		"dataSource": "CeDRI",
		"database": "CeDRI_UGV_datalake",
		"collection": "Diagnostics",
		"pipeline": [
			{
				'$match': {
					'name': '/Hokuyo/urg node/Hardware Status'
				}
			}, {
				'$sort': {
					'dateTime': -1
				}
			}, {
				'$limit': 5
			}
		]
	}),
	encoders: JSON.stringify({
		"dataSource": "CeDRI",
		"database": "CeDRI_UGV_datalake",
		"collection": "Diagnostics",
		"pipeline": [
			{
				'$match': {
					'name': '/Motors/motor_node: FirmwareOptions'
				}
			}, {
				'$sort': {
					'dateTime': -1
				}
			}, {
				'$limit': 5
			}
		]
	}),
	motors: JSON.stringify({
		"dataSource": "CeDRI",
		"database": "CeDRI_UGV_datalake",
		"collection": "Diagnostics",
		"pipeline": [
			{
				'$match': {
					'name': '/Motors'
				}
			}, {
				'$sort': {
					'dateTime': -1
				}
			}, {
				'$limit': 5
			}
		]
	}),
	amcl: JSON.stringify({
		"dataSource": "CeDRI",
		"database": "CeDRI_UGV_datalake",
		"collection": "Diagnostics",
		"pipeline": [
			{
				'$match': {
					'name': '/Other/amcl: Standard deviation'
				}
			}, {
				'$sort': {
					'dateTime': -1
				}
			}, {
				'$limit': 5
			}
		]
	}),
	motorPower: JSON.stringify({
		"dataSource": "CeDRI",
		"database": "CeDRI_UGV_datalake",
		"collection": "Diagnostics",
		"pipeline": [
			{
				'$match': {
					'name': '/Motors/motor_node: MotorPower'
				}
			}, {
				'$sort': {
					'dateTime': -1
				}
			}, {
				'$limit': 5
			}
		]
	}),
};

export default class CurrentDatetimeArea extends React.Component {
	render() {
		return (
			<Grid container {...styles.statusIcon.container} >
				<Grid item {...styles.statusIcon.item}>
					{/* Battery */}
					<Stack {...styles.stack}>
						<IconLogger icon={BatteryChargingFull} pipeline={pipeline.battery} title={'Battery'} />
						<Typography {...styles.typography.subtitle}>
							Battery 
						</Typography>
					</Stack>
				</Grid>

				{/* <Divider orientation="vertical" flexItem /> */}

				<Grid item {...styles.statusIcon.item}>
					{/* LiDAR */}
					<Stack {...styles.stack}>
						<IconLogger icon={TrackChanges} pipeline={pipeline.lidar} title={'LiDAR'} />
						<Typography {...styles.typography.subtitle}>
							LiDAR 
						</Typography>
					</Stack>
				</Grid>

				{/* <Divider orientation="vertical" flexItem /> */}

				<Grid item {...styles.statusIcon.item}>
					{/* Encoders */}
					<Stack {...styles.stack}>
						<IconLogger icon={Straighten} pipeline={pipeline.encoders} title={'Encoders'} />
						<Typography {...styles.typography.subtitle}>
							Encoders 
						</Typography>
					</Stack>
				</Grid>

				{/* <Divider orientation="vertical" flexItem /> */}

				<Grid item {...styles.statusIcon.item}>
					{/* Motors */}
					<Stack {...styles.stack}>
						<IconLogger icon={ElectricMeter} pipeline={pipeline.motors} title={'Motors'} />
						<Typography {...styles.typography.subtitle}>
							Motors 
						</Typography>
					</Stack>
				</Grid>

				{/* <Divider orientation="vertical" flexItem /> */}

				<Grid item {...styles.statusIcon.item}>
					{/* Motor Power */}
					<Stack {...styles.stack}>
						<IconLogger icon={ModeStandby} pipeline={pipeline.motorPower} title={'Motor Power'} />
						<Typography {...styles.typography.subtitle}>
							Motor Power 
						</Typography>
					</Stack>
				</Grid>

				{/* <Divider orientation="vertical" flexItem /> */}

				<Grid item {...styles.statusIcon.item}>
					{/* AMCL */}
					<Stack {...styles.stack}>
						<IconLogger icon={Explore} pipeline={pipeline.amcl} title={'AMCL'} />
						<Typography {...styles.typography.subtitle}>
							AMCL 
						</Typography>
					</Stack>
				</Grid>

			</Grid>
		);
	}
}

