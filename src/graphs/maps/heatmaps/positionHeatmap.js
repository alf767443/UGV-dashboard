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
                        'unit': 'minute'
                    }
                }, 
                'x': { 
                  '$round' : [ '$pose.pose.position.x' , 1 ],
                },
                'y': { 
                  '$round' : [ '$pose.pose.position.y' , 1 ],
                },
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
            data: [{x:-30.20, y:-30.60, cont:null},{x:40.20, y:28.60, count:null}],
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
            this.setState({ data: [...json, {x:-30.20, y:-30.60, count:null},{x:40.20, y:28.60, count:null}] });
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
                start: [-30.20, 28.60],
                end: [40.20, -30.60],
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
            <Heatmap {...this.config} {...styles.map} data={this.state.data} annotations={position} />
        );
    }
}

