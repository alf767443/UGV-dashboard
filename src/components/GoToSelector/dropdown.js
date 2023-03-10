import React from "react";

// import MainCard from "components/MainCard";

// import styles from "graphs/styles";
// import { Typography, Stack, Grid, Skeleton } from '@mui/material';

// import Battery from './battery/index'
// import Motors from './motors/index'

import { MoreVert } from '@mui/icons-material';
import { Dropdown } from 'antd';
import { requestOptions } from 'API/url';


const items = [
	{
		key: 'battery',
		label: 'Waypoint',
        children: [
            {
                label: "w1",
                key: "w1",
            },
            {
                label: "w2",
                key: "w2",
            },
            {
                label: "w3",
                key: "w3",
            },
            {
                label: "w4",
                key: "w4",
            },
            {
                label: "w5",
                key: "w5",
            },
            {
                label: "w6",
                key: "w6",
            },
            {
                label: "w7",
                key: "w7",
            },
            {
                label: "w8",
                key: "w8",
            },
            {
                label: "w9",
                key: "w9",
            },
            {
                label: "w10",
                key: "w10",
            },
            {
                label: "w11",
                key: "w11",
            },
            {
                label: "w12",
                key: "w12",
            },
            {
                label: "w13",
                key: "w13",
            },
            {
                label: "w14",
                key: "w14",
            },
            {
                label: "w15",
                key: "w15",
            },
            {
                label: "w16",
                key: "w16",
            },
            {
                label: "w17",
                key: "w17",
            },
            {
                label: "w18",
                key: "w18",
            },
            {
                label: "w19",
                key: "w19",
            },
        ]
	},
];
  
var raw = (key) => JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_datalake",
	"collection": "Actions",
	"filter": {'dateTime': Date.now()},
	"update": [
		{
			'$set': {
                'status': 0,
                'source': 2,
                'command': key,
                'msg': 'std_msgs/String',
                'topic': '/navGo2'
			}
		}
	],
});

export default class SimpleGraph extends React.Component {
	constructor(props) {
		super(props);
    }

	handleMenuClick = (e) => {
		console.log(e)
		// message.open({
		// 	key: e.key,
		// 	type: 'loading',
		// 	content: 'Uploading change...',
		// 	style: {
		// 		marginTop: '11vh',
		// 	},
		// 	duration: 0,
		// });
		fetch('http://192.168.217.183:8000/update/', requestOptions(raw(e.key).replace('coordinates', this.props.position)))
		.then((response) => response.json())
		// .then(() => {
		// 	message.destroy(e.key)
		// 	message.open({
		// 		key: e.key,
		// 		type: 'success',
		// 		content: 'Success, reloading the page',
		// 		style: {
		// 			marginTop: '11vh',
		// 		},
		// 		duration: 2.5,
		// 	})
		// })
		.catch((error) => {
			console.log(error);
		});
	};


	render() {
		return (
            <Dropdown
                menu={{
                items,
                onClick: this.handleMenuClick,
                }}
                trigger={['click']}
            >
                <MoreVert sx={{color:'#b3b3b3'}} />
            </Dropdown>
        )
	}
}
