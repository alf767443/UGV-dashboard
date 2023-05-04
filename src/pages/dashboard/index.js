import React from "react";

// material-ui
import Grid from '@mui/material/Unstable_Grid2';

import { url, requestOptions } from 'API/url';

import SimpleGraphBox from 'graphs/simplePlot';
import LargeGraphBox from 'graphs/largePlot';
import BigGraphBox from 'graphs/bigPlot';

import list from "graphs/graphsList";

import styles from './styles';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

var pipeline = JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_dashboard",
	"collection": "config",    
	"pipeline": [
		{
			'$match': {
				'user': 'default'
			}
		}, {
			'$limit': 1
		}
	]
})

export default class DashboardDefault  extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            data: {},
            graphs: {
                '0':[
                    {
                        key: '',
                        graph: <SimpleGraphBox graph={null} title={null} position={'00'}/>,
                        coord: '00',
                        type: 'simple',
                    },
                    {
                        key: '',
                        graph: <SimpleGraphBox graph={null} title={null} position={'01'}/>,
                        coord: '01',
                        type: 'simple',
                    },
                    {
                        key: '',
                        graph: <SimpleGraphBox graph={null} title={null} position={'02'}/>,
                        coord: '02',
                        type: 'simple',
                    },
                ],
                '1':[
                    {
                        key: '',
                        graph: <SimpleGraphBox graph={null} title={null} position={'10'}/>,
                        coord: '10',
                        type: 'simple',
                    },
                    {
                        key: '',
                        graph: <SimpleGraphBox graph={null} title={null} position={'11'}/>,
                        coord: '11',
                        type: 'simple',
                    },
                    {
                        key: '',
                        graph: <SimpleGraphBox graph={null} title={null} position={'12'}/>,
                        coord: '12',
                        type: 'simple',
                    },
                ],
                '2':[
                    {
                        key: '',
                        graph: <LargeGraphBox graph={null} title={null} position={'20'}/>,
                        coord: '20',
                        type: 'large',
                    },
                    {
                        key: '',
                        graph: <BigGraphBox graph={null} title={null} position={'21'}/>,
                        coord: '21',
                        type: 'big',
                    },
                ],
            },
        }
    }

    refreshList() {
		fetch(url(), requestOptions(pipeline))
		.then((response) => response.json())
		.then((json) => {
			this.setState({ data: json[0].dashboardLayout });
            // console.log(this.state.data)
            this.generate(json[0].dashboardLayout)
		})
		.catch((error) => {
			console.log(error);
		});
    }

    componentDidMount = () => {
		this.refreshList(); 
    }
    
    generate(userLayout){
        let _out = []
        for(let i = 0; i < 3; i++){
            let temp = [];
            this.state.graphs[i].forEach((item => {
                let _temp = item
                let graph_simple = list.SimplePlot.find(e => e.key == userLayout[item.coord].graph)
                let graph_large = list.LargePlot.find(e => e.key == userLayout[item.coord].graph)
                let graph_big = list.BigPlot.find(e => e.key == userLayout[item.coord].graph)
                switch(userLayout[item.coord].type){
                    case 'simple':
                        _temp.graph = <SimpleGraphBox graph={graph_simple.plot} title={graph_simple.title} position={item.coord} name={userLayout[item.coord].graph}/>
                        break;
                    case 'large':
                        _temp.graph = <LargeGraphBox graph={graph_large.plot} title={graph_large.title} position={item.coord}/>
                        break;
                    case 'big':
                        _temp.graph = <BigGraphBox graph={graph_big.plot} title={graph_big.title} position={item.coord}/>
                        break;
                    default:
                }
                temp.push(_temp)
            }))
            _out.push(temp)
        }
        this.setState({graphs: _out})
        // console.log(this.state.graphs)
        this.forceUpdate()
    }

    render(){
        return (
            <Grid container {...styles.grid.main}>
                <Grid container {...styles.grid.column.header}>
                    <Grid container  {...styles.grid.column.subheader}>
                    {/* Bullets */}
                        <Grid item {...styles.grid.column.graphs}>
                            {this.state.graphs[0].map(e => e.graph)}
                        </Grid>
                        <Grid item {...styles.grid.column.graphs}>
                            {this.state.graphs[1].map(e => e.graph)}
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid container {...styles.grid.column.map}>
                    <Grid item {...styles.grid.column.subheader}>
                        {this.state.graphs[2].map(e => e.graph)}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}