import React from "react";

import { FlowAnalysisGraph } from '@ant-design/graphs';

import { url, requestOptions } from 'API/url';
import MainCard from "components/MainCard";

import styles from "graphs/styles";
import { Typography, Stack } from '@mui/material';

var nodes = JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_datalake",
	"collection": "Nodes",
	"pipeline": [
    {
        '$sort': {
            'dateTime': -1
        }
    }, {
        '$limit': 1
    }, {
        '$unwind': {
            'path': '$nodes', 
            'preserveNullAndEmptyArrays': false
        }
    }, {
        '$unwind': {
            'path': '$nodes.serv', 
            'preserveNullAndEmptyArrays': false
        }
    }, {
        '$group': {
            '_id': '$nodes.node', 
            'title': {
                '$first': '$nodes.node'
            }, 
            'items': {
                '$first': {
                    'text': '$nodes.conn.Pid'
                }
            }
        }
    }, {
        '$project': {
            '_id': 0, 
            'id': '$_id', 
            'value': {
                'title': '$title', 
                'items': '$items'
            }
        }
    }
]
});

var edges = JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_datalake",
	"collection": "Nodes",
	"pipeline": [
    {
        '$sort': {
            'dateTime': -1
        }
    }, {
        '$limit': 1
    }, {
        '$unwind': {
            'path': '$nodes', 
            'preserveNullAndEmptyArrays': false
        }
    }, {
        '$unwind': {
            'path': '$nodes.conn.Connections', 
            'preserveNullAndEmptyArrays': false
        }
    }, {
        '$project': {
            '_id': 0, 
            'target': {
                '$cond': [
                    {
                        '$eq': [
                            '$nodes.conn.Connections.direction', 'outbound '
                        ]
                    }, '$nodes.conn.Connections.to', '$nodes.node'
                ]
            }, 
            'source': {
                '$cond': [
                    {
                        '$eq': [
                            '$nodes.conn.Connections.direction', 'outbound '
                        ]
                    }, '$nodes.node', '$nodes.conn.Connections.to'
                ]
            }, 
            'value': '$nodes.conn.Connections.topic'
        }
    }, {
        '$match': {
            '$expr': {
                '$and': [
                    {
                        '$ne': [
                            '$target', '$source'
                        ]
                    }
                ]
            }, 
            'target': {
                '$nin': [
                    '/rosout'
                ]
            }, 
            'source': {
                '$nin': [
                    '/rosout'
                ]
            }
        }
    }, {
        '$sort': {
            'source': 1, 
            'target': 1
        }
    }
]
});

export default class NodeMap extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
      data: {edges: [{}], nodes:[{}]},
      edges: [],
      nodes: [],
			ticks: -1
      };
    }

	canUpdate(){
		if (JSON.parse(window.localStorage.getItem('fromLocal')) || this.state.ticks <= 0) {
			this.setState({ ticks: 10})
			this.refreshNodes()
      this.refreshEdges()
      if(this.state.edges != this.state.data.edges || this.state.nodes != this.state.data.nodes){
        this.setState( {data: {edges: this.state.edges, nodes: this.state.nodes}})
      }
      // console.log(this.state.data)
		} else if (!JSON.parse(window.localStorage.getItem('fromLocal'))){
			// From MongoDB cloud
			this.setState({ ticks: this.state.ticks - 1})
		}
	}

  refreshNodes() {
		fetch(url(), requestOptions(nodes))
		.then((response) => response.json())
		.then((json) => {
			this.setState({ nodes: json});
		})
		.catch((error) => {
			console.log(error);
		});
    }
  
  refreshEdges() {
    fetch(url(), requestOptions(edges))
    .then((response) => response.json())
    .then((json) => {
      this.setState({ edges: json});
    })
    .catch((error) => {
      console.log(error);
    }); 
    // console.log(this.state.edges)
    }

    componentDidMount = () => {
		this.refreshNodes();
    this.refreshEdges();
    this.setState( {data: {edges: this.state.edges, nodes: this.state.nodes}})
    // console.log(this.state.data)
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
    // data,
    autoFit: true,
    nodeCfg: {
      size: [140, 25],
      badge: {
        style: (cfg) => {
          const ids = ['a', '-2', '-1'];
          const fill = ids.includes(cfg.id) ? '#c86bdd' : '#5ae859';
          return {
            fill,
            radius: [2, 2, 2, 2],
          };
        },
      },
      items: {
        padding: 6,
        containerStyle: {
          fill: '#fff',
        },
        style: (cfg, group, type) => {
          const styles = {
            icon: {
              width: 12,
              height: 12,
            },
            value: {
              fill: '#f00',
            },
            text: {
              fill: '#aaa',
            },
          };
          return styles[type];
        },
      },
      nodeStateStyles: {
        hover: {
          stroke: '#1890ff',
          lineWidth: 2,
        },
      },
      title: {
        containerStyle: {
          fill: 'transparent',
        },
        style: {
          fill: '#000',
          fontSize: 12,
        },
      },
      style: {
        fill: '#E6EAF1',
        stroke: '#B2BED5',
        radius: [2, 2, 2, 2],
      },
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    edgeCfg: {
      type: 'quadratic',
      endArrow: {
        fill: '#007acc',
        strokeOpacity: 0.45,
      },
      label: {
        style: {
          fill: '#2e2f33',
          fontSize: 12,
          fillOpacity: 1,
        },
      },
      style: {
          stroke: '#007acc',
          lineWidth: 2,
          strokeOpacity: 0.5,
      },
      edgeStateStyles: {
        hover: {
          lineWidth: 2,
          strokeOpacity: 1,
        },
      },
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
  };

	render() {
		return (
			<MainCard {...styles.maincard}>
					<Stack {...styles.stack}>
						<Typography {...styles.typography.title}>
							Nodes map
						</Typography>
						<FlowAnalysisGraph 
							{...this.config}
							{...styles.map}
							data={this.state.data}
						/>
					</Stack>
			</MainCard>
		);
	}
}


