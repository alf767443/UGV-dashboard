import React from 'react';
import { Heatmap } from '@ant-design/plots';
import cedri from '../images/cedri.png'
import { url, requestOptions } from 'API/url';
import styles from 'graphs/styles';

var rawPosition = JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_datalake",
	"collection": "Position_AMCL",
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
    "dataSource": "CeDRI",
	"database": "CeDRI_UGV_datalake",
	"collection": "Position_AMCL",
	"pipeline": [
        {
            '$project': {
                'dateTime': {
                    '$dateTrunc': {
                        'date': '$dateTime', 
                        'unit': 'second'
                    }
                },
                'x': '$pose.pose.position.x', 
                'y': '$pose.pose.position.y'
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
                'dateTime': {
                    '$max': '$dateTime'
                }
            }
        }, {
            '$sort': {
                'dateTime': -1
            }
        }, {
            '$limit': 60
        }, {
            '$set': {
                'start': {
                    'x': "$x",
                    'y': "$y",
                },
            }
        }
    ]
})


export default class ConnectivityIcon extends React.Component {
    constructor(props) {
		super(props);

		this.state = {
            data: [{x:0,y:0,yaw:0}],
            last: {x:0,y:0,yaw:2},
			ticks: -1,
			quality: 0
        };
    }  
    
    refreshPos() {
        // Last point
		fetch(url(), requestOptions(rawPosition))
		.then((response) => response.json())
		.then((json) => {
			this.setState({ last: json[0] });
		})
        .then(() => clearInterval())
		.catch((error) => {
			console.log(error)
		});
    }

    refreshMap(){
        //History of points
        fetch(url(), requestOptions(raw))
        .then((response) => response.json())
        .then((json) => {
            this.setState({ data: json });            
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
		this.timer();
    }

	componentWillUnmount = () =>{
		clearInterval(this.timer)
	}

	timer = () => {
		setInterval(() => {
			this.refreshMap()
		}, 5000)
	}
  
    config = {
        //type: 'density',
        xField: 'x',
        yField: 'y',
        //xAxis: false,
        xAxis:{
            min: -30.20,
            minLimit: -30.20,
            max: 40.20,
            maxLimit: 40.20,
            label: null,
        },
        //yAxis: false,
        yAxis:{
            min: -30.60,
            minLimit: -30.60,
            max: 28.60,
            maxLimit: 28.60,
            label: null,
        },
        colorField: 'yaw',
        limitInPlot: true,
        animation: false,
        color: '#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2',
        annotations: [
            {
                type: 'image',
                start: [-30.20, 28.60],
                end: [40.20, -30.60],
                src: cedri,
            },
        ],
        tooltip: {
            showTitle: false,
            formatter: (point) => {
                return { name: `X:${Math.round(point.x*100)/100}  Y:${Math.round(point.y*100)/100}`}//, value: `Y:${Math.round(point.y)}` };
            },
        }

    };

    render() {
        var temp = [];

        this.state.data.forEach((value) => {
            if (temp.length == 0) {
                temp.push({
                    type: 'line',
                    style: {
                        stroke: '#f8df72',
                        lineWidth: 2,
                    },
                    start: [value.x,value.y],
                    end: [value.x,value.y],
                })
            } else {
                temp.unshift({
                    type: 'line',
                    style: {
                        stroke: '#f8df72',
                        lineWidth: 2,
                    },
                    start: [value.x,value.y],
                    end: temp[0].start,
                })
            }   
        });

        const position = [
            ...this.config.annotations,
            ...temp,
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
            <Heatmap {...this.config} {...styles.map} data={this.state.data} annotations={position} />
        );
    }
}

