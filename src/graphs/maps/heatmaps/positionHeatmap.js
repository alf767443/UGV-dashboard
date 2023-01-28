import React from 'react';
import { Heatmap } from '@ant-design/plots';
import cedri from '../images/cedri.png'
import { url, requestOptions } from 'API/url';
import styles from 'graphs/styles';

import { Box, Typography, Stack } from '@mui/material';
import MainCard from "components/MainCard";

var rawPosition = JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_buffer",
	"collection": "PositionAMCL_Data",
	"pipeline": [
		{
			'$project': {
				'dateTime': 1,
				'x': 1,
				'y': 1, 
                'yaw': '$orient.yaw'
			}
		}, {
			'$sort': {
				'dateTime': -1
				}
		}, {
			'$limit': 1
		}
	]
});

var raw = JSON.stringify({
    "dataSource": "CeDRI",
	"database": "CeDRI_UGV_buffer",
	"collection": "PositionOdom_Data",
	"pipeline": [
        {
            '$project': {
                'dateTime': {
                    '$dateTrunc': {
                        'date': '$dateTime', 
                        'unit': 'minute'
                    }
                }, 
                'x': {
                    '$toInt': '$x'
                }, 
                'y': {
                    '$toInt': '$y'
                }, 
                'orient': 1
            }
        }, {
            '$addFields': {
                'xy': {
                    '$concat': [
                        {
                            '$toString': [
                                '$x'
                            ]
                        }, ':', {
                            '$toString': [
                                '$y'
                            ]
                        }
                    ]
                }
            }
        }, {
            '$group': {
                '_id': '$xy', 
                'x': {
                    '$avg': '$x'
                }, 
                'y': {
                    '$avg': '$y'
                }, 
                'yaw': {
                    '$avg': '$orient.yaw'
                }, 
                'count': {
                    '$count': {}
                }
            }
        }, 
    ]
})


export default class ConnectivityIcon extends React.Component {
    constructor(props) {
		super(props);

		this.state = {
            data: [{x:-3520, y:-2960, cont:null},{x:3520, y:2960, count:null}],
            last: {x:0,y:0,yaw:2},
			ticks: -1,
			quality: 0
        };
    }  
    
    canUpdate(){ 
		if (JSON.parse(window.localStorage.getItem('fromLocal')) || this.state.ticks <= 0) {
			this.setState({ ticks: 10})
			this.refreshPos();
		} else if (!JSON.parse(window.localStorage.getItem('fromLocal'))){
			// From MongoDB cloud
			this.setState({ ticks: this.state.ticks - 1})
		}
	}

    refreshPos() {
        // Last point
		fetch(url(), requestOptions(rawPosition))
		.then((response) => response.json())
		.then((json) => {
			this.setState({ last: json[0] });
		})
		.catch((error) => {
			console.log(error)
		});
    }

    refreshMap(){
        //History of points
        fetch(url(), requestOptions(raw))
        .then((response) => response.json())
        .then((json) => {
            this.setState({ data: [...json, {x:-3520, y:-2960, count:null},{x:3520, y:2960, count:null}] });
        })
        .catch((error) => {
            console.log(error)
        });
    }

    componentDidMount = () => {
		this.refreshMap();
        this.refreshPos();
		this.timer();
    }

	componentWillUnmount = () =>{
		clearInterval(this.timer)
	}

	timer = () => {
		setInterval(() => {
			this.canUpdate();
		}, 1000)
	}
  
    config = {
        type: 'density',
        xField: 'x',
        yField: 'y',
        xAxis: false,
        yAxis: false,
        colorField: 'count',
        limitInPlot: true,
        animation: false,
        sizeField: 5,
        color: '#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2',
        annotations: [
            {
                type: 'image',
                start: [-3520, 2960],
                end: [3520, -2960],
                src: cedri,
            },
        ],
        legend: {
            position: 'bottom',
          },
        tooltip: {
            fields: ['_id', 'count'],
            title: 'Count of occurencies',
            formatter: (point) => {
                return { name: point._id, value: point.count };
            },
        }

    };

    render() {
        const position = [
            ...this.config.annotations,
            {
                type: 'dataMarker',
                position: [this.state.last.x,this.state.last.y],
                rotate: this.state.last.yaw,
            }, {
                type: 'text',
                content: `(${Math.round(this.state.last.x)},${Math.round(this.state.last.y)})`,
                style:{
                    fontSize: 22,
                    fill: '#fff',
                    textAlign: 'left',
                },
                position: ['1%', '3%'],
            }
        ]
        return(
            <MainCard sx={styles.maincard.sx} content={styles.maincard.content}>
                <Box sx={styles.box.sx}>
                    <Stack spacing={styles.stack.spacing} direction={styles.stack.direction} alignItems={styles.stack.alignItems}>
                        <Typography variant={styles.typography.title.variant} color={styles.typography.title.color}>
                            Position heatmap
                        </Typography>
                        <Heatmap {...this.config} data={this.state.data} sx={{width: 300, height: 300}} annotations={position} />
                    </Stack>
                </Box>
            </MainCard>
        );
    }
}
