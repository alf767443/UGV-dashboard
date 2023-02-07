
import React from "react";

// Import from project
import { url, requestOptions } from 'API/url';
import { SignalWifi1Bar, SignalWifi2Bar, SignalWifi3Bar, SignalWifi4Bar,  SignalWifiStatusbarConnectedNoInternet4, SignalWifiOff } from '@mui/icons-material';


import styles from './styles';

var raw = JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_datalake",
	"collection": "Connection",
	"pipeline": [
		{
			'$project': {
				'dateTime': 1,
				'RTT': 1,
				'Connect': 1
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
		fetch(url(), requestOptions(raw))
		.then((response) => response.json())
		.then((json) => {
			this.setState({ data: json[0] });
			this.quality();
		})
		.catch((error) => {
			console.log(error)
		});
    }

    componentDidMount = () => {
		this.refreshList();
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

	quality = () => {
		
		
		if (this.state.data['Connect'] && (Date.now() - Date.parse(this.state.data['dateTime'])) < 30000){
			if (this.state.data['RTT'] < 1){
				this.setState({ quality:  1 });
			}
			else if (this.state.data['RTT'] < 10){
				this.setState({ quality:  2 });
			}
			else if (this.state.data['RTT'] < 20){
				this.setState({ quality:  3 });
			}	
			else if (this.state.data['RTT'] < 40){
				this.setState({ quality:  4 });
			}	
			else if (this.state.data['RTT'] < 80){
				this.setState({ quality:  5 });
			}
			else
				this.setState({ quality:  6	});
		}
		else{
			this.setState({ quality:  0 });
		}
	}

	color = () => {
		switch(this.state.quality){
			case 0:
				return '#B3B3B3';
				
			case 1:
				return '#0DB200';
				
			case 2:
				return '#87DB00';
				
			case 3:
				return '#F0F000';
				
			case 4:
				return '#EB5801';
				
			case 5:
				return '#e6afaf';

			case 6:
				return '#B60000';

			default:
				return '#B3B3B3'

		}
	}

	connectIcon = () => {
		switch(this.state.quality){
			case 0:
				return <SignalWifiOff sx={{...styles.icon.style, color:this.color()}} />
			case 1:
				return <SignalWifi4Bar sx={{...styles.icon.style, color:this.color()}} />
			case 2:
				return <SignalWifi3Bar sx={{...styles.icon.style, color:this.color()}} />
			case 3:
				return <SignalWifi2Bar sx={{...styles.icon.style, color:this.color()}} />
			case 4:
				return <SignalWifi1Bar sx={{...styles.icon.style, color:this.color()}} />
			case 5:
				return <SignalWifi4Bar sx={{...styles.icon.style, color:this.color()}} />
			case 6:
				return <SignalWifiStatusbarConnectedNoInternet4 sx={{...styles.icon.style, color:this.color()}} />
			default:
				return <SignalWifiOff sx={{...styles.icon.style, color:this.color()}} />
		}
	}

	render() {
		return (
			<div>
				{this.connectIcon()}
			</div>
		);
	}
}
