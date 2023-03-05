import React from "react";

// material-ui
import Grid from '@mui/material/Unstable_Grid2';

import Position_Map from 'graphs/maps/pointmaps/positionMap';
// import Track_Map from 'graphs/maps/pointmaps/trackMap';

// import Nodes_Map from 'graphs/nodes/nodeMap';
import { url, requestOptions } from 'API/url';

// import Battery_Bullet from 'graphs/battery/groupBullet';
// import Battery_Area_Percentage from 'graphs/battery/percentageDatetimeArea';
// import Battery_Area_Current from 'graphs/battery/currentDatetimeArea'

// import Motor_Bullet from 'graphs/motors/groupBullet';
// import Motor_Line_Current from 'graphs/motors/currentDatetimeLine';
// import Motor_Line_PWM from 'graphs/motors/PWMDatetimeLine';

import Log_prompter from 'graphs/log/printLog'

import SimpleGraphBox from 'graphs/simplePlot';

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
                    },
                    {
                        key: '',
                        graph: <SimpleGraphBox graph={null} title={null} position={'01'}/>,
                        coord: '01'
                    },
                    {
                        key: '',
                        graph: <SimpleGraphBox graph={null} title={null} position={'02'}/>,
                        coord: '02'
                    },
                ],
                '1':[
                    {
                        key: '',
                        graph: <SimpleGraphBox graph={null} title={null} position={'10'}/>,
                        coord: '10',
                    },
                    {
                        key: '',
                        graph: <SimpleGraphBox graph={null} title={null} position={'11'}/>,
                        coord: '11'
                    },
                    {
                        key: '',
                        graph: <SimpleGraphBox graph={null} title={null} position={'12'}/>,
                        coord: '12'
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
            console.log(this.state.data)
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
        for(let i = 0; i < 2; i++){
            let temp = [];
            this.state.graphs[i].forEach((item => {
                let _temp = item
                let graph = list.SimplePlot.find(e => e.key == userLayout[item.coord])
                console.log(item)
                console.log(graph)
                console.log(userLayout[item.coord])
                _temp.graph = <SimpleGraphBox graph={graph.plot} title={graph.title} position={item.coord}/>
                temp.push(_temp)
            }))
            _out.push(temp)
            // this.setState({graphs: { i : temp}})
        }
        this.setState({graphs: _out})
        console.log(this.state.graphs)
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
                    <Grid item {...styles.grid.column.subheader} >
                        {/* Log */}
                        <Log_prompter position={'20'}/>
                        {/* Position map */}
                        <Position_Map position={'21'}/>
                    </Grid>
                </Grid>
            </Grid>

        );
    }
}