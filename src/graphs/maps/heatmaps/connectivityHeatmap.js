import React from 'react';
import { Heatmap } from '@ant-design/plots';
import cedri from '../images/cedri.png'
import { url, requestOptions } from 'API/url';

var rawPosition = JSON.stringify({
	"dataSource": "CeDRI_Magni",
	"database": "CeDRI_Magni",
	"collection": "/amcl_pose",
	"pipeline": [
		{
			'$project': {
				'dateTime': 1,
				'x': '$pose.pose.position.x', 
                'y': '$pose.pose.position.y'
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
    "dataSource": "CeDRI_Magni",
	"database": "CeDRI_Magni",
	"collection": "/amcl_pose",
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
                '$round': [
                    '$pose.pose.position.x', 1
                ]
            }, 
            'y': {
                '$round': [
                    '$pose.pose.position.y', 1
                ]
            }
        }
    }, {
        '$unionWith': {
            'coll': '/connectionStatus', 
            'pipeline': [
                {
                    '$unwind': {
                        'path': '$list', 
                        'preserveNullAndEmptyArrays': false
                    }
                }, {
                    '$addFields': {
                        'Connect': '$list.is_alive', 
                        'RTT': '$list.rtt_avg'
                    }
                }, {
                    '$project': {
                        'dateTime': {
                            '$dateTrunc': {
                                'date': '$dateTime', 
                                'unit': 'minute'
                            }
                        }, 
                        'Connect': {
                            '$toInt': [
                                '$Connect'
                            ]
                        }, 
                        'RTT': 1
                    }
                }
            ]
        }
    }, {
        '$group': {
            '_id': '$dateTime', 
            'x': {
                '$first': '$x'
            }, 
            'y': {
                '$first': '$y'
            }, 
            'yaw': {
                '$avg': '$orient.yaw'
            }, 
            'Connect': {
                '$avg': '$Connect'
            }, 
            'RTT': {
                '$avg': '$RTT'
            }, 
            'xy': {
                '$first': '$xy'
            }
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
                '$first': '$x'
            }, 
            'y': {
                '$first': '$y'
            }, 
            'yaw': {
                '$avg': '$orient.yaw'
            }, 
            'Connect': {
                '$avg': '$Connect'
            }, 
            'RTT': {
                '$avg': '$RTT'
            }, 
            'xy': {
                '$first': '$xy'
            }
        }
    }, {
            '$set': {
                'Connect': {
                    '$round': [
                        '$Connect', 2
                    ]
                }
            }
        }
    ]
})


export default class ConnectivityIcon extends React.Component {
    constructor(props) {
		super(props);

		this.state = {
            data: [{x:-30.20, y:-30.60, Connect:null},{x:40.20, y:28.60, Connect:null}],
            last: {x:0,y:0,yaw:2},
			ticks: -1,
			quality: 0
        };
    }  

    refreshPos() {
        // Last point
		fetch('http://192.168.217.183:8000/query/', requestOptions(rawPosition))
		.then((response) => response.json())
		.then((json) => {
			this.setState({ last: json[0] });
		})
        .then(() =>{
			clearInterval(this.timer)
        })
		.catch((error) => {
			//console.log(error)
		})
        .finally(this.refreshPos());
        
    }

    refreshMap(){
        //History of points
        fetch('http://192.168.217.183:8000/query/', requestOptions(raw))
        .then((response) => response.json())
        .then((json)=>console.log(json))
        .then((json) => {
            this.setState({ data: [...json, {x:-30.20, y:-30.60, RTT:0},{x:40.20, y:28.60, RTT:0}] });
            ////console.log(this.state.data)
        })
		.then(() => {
            this.refreshPos()
		})
        .catch((error) => {
            console.log(error)
        });
    }

    componentDidMount = () => {
        this.refreshMap();
		// this.timer();
    }

	componentWillUnmount = () =>{
		clearInterval(this.timer)
	}
  
    config = {
        type: 'density',
        xField: 'x',
        yField: 'y',
        xAxis: false,
        yAxis: false,
        colorField: 'Connect',
        limitInPlot: true,
        animation: false,
        sizeField: 5,
        color: '#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2',
        annotations: [
            {
                type: 'image',
                start: [-30.20, 28.60],
                end: [40.20, -30.60],
                src: cedri,
            },
        ],
        legend: {
            position: 'bottom',
          },
        tooltip: {
            fields: ['xy', 'Connect'],
            showTitle: false,
            formatter: (point) => {
                return { name: `Connectivity of ${point.xy}`, value: `${Math.round(point.Connect*100)}%` };
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
            <Heatmap {...this.config} data={this.state.data} annotations={position} />
        );
    }
}

