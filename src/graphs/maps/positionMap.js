import React from 'react';
import { Heatmap } from '@ant-design/plots';
import cedri from './heatmaps/cedri.png'
import { url, requestOptions } from 'API/url';


var rawPosition = JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_buffer",
	"collection": "PositionAMCL_Data",
	"pipeline": [
		{
			'$project': {
				'dateTime': 1,
				'x': 1,
				'y': 1
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



export default class ConnectivityIcon extends React.Component {
    constructor(props) {
		super(props);

		this.state = {
            data: [],
            last: [],
			ticks: -1,
			quality: 0
        };
    }  
    
    canUpdate(){
		if (JSON.parse(window.localStorage.getItem('fromLocal')) || this.state.ticks <= 0) {
			this.setState({ ticks: 10})
			this.refreshList()
		} else if (!JSON.parse(window.localStorage.getItem('fromLocal'))){
			// From MongoDB cloud
			this.setState({ ticks: this.state.ticks - 1})
		}
	}

    refreshList() {
		fetch(url(), requestOptions(rawPosition))
		.then((response) => response.json())
		.then((json) => {
			this.setState({ last: json[0] });
		})
		.catch((error) => {
			console.log(error)
		});
    }

    componentDidMount = () => {
		this.refreshList();
        this.asyncFetch();
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

    asyncFetch = () => {
        // Get last position
        fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/heatmap.json')
        .then((response) => response.json())
        .then((json) => {
            this.setState({data: json})
            this.setState([{g:3520,l:2960,tmp:null}, {g:-3520,l:-2960,tmp:null},...this.state.data])
        })
        .catch((error) => {
            console.log('fetch data failed', error);
        });
    };
  
    config = {
        type: 'density',
        xField: 'g',
        yField: 'l',
        xAxis: false,
        yAxis: false,
        colorField: 'tmp',
        //limitInPlot: true,
        color: '#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2',
        annotations: [
            {
                type: 'image',
                start: [-3520, 2960],
                end: [3520, -2960],
                src: cedri,
            }, {
                type: 'dataMarker',
                position: [100,100],
            }
        ],
        tooltips:{
            fields: ['g','l']
        },
    };

    render() {
        console.log();
        return(
            <div>
                <Heatmap {...this.config} data={this.state.data} sx={{width: 300, height: 300}} />
            </div>
        );
    }
}
