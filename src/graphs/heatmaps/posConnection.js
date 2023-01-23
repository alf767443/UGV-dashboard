import React from 'react';
import { Heatmap } from '@ant-design/plots';


export default class ConnectivityIcon extends React.Component {
    constructor(props) {
		super(props);

		this.state = {
            data: [],
			ticks: -1,
			quality: 0
        };
    }
    //const [data, setData] = useState([]);

    componentDidMount = () => {
		this.asyncFetch();
    }

    asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/heatmap.json')
        .then((response) => response.json())
        .then((json) => this.setState({data: json}))
        .catch((error) => {
            console.log('fetch data failed', error);
        });
    };
  
    config = {
        type: 'density',
        xField: 'g',
        yField: 'l',
        colorField: 'tmp',
        color: '#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2',
        legend: {
        position: 'bottom',
        },
        annotations: [
        {
            type: 'image',
            start: ['min', 'max'],
            end: ['max', 'min'],
            src: 'https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png',
        },
        ],
    };

    render() {
        return(
            <div>
                <Heatmap {...this.config} data={this.state.data} sx={{width: 300, height: 300}} />
            </div>
        );
    }
}
