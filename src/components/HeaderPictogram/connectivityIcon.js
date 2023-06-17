
import React from "react";

// Import from project
import { djangoFetch } from 'API/url';
import { SignalWifi1Bar, SignalWifi2Bar, SignalWifi3Bar, SignalWifi4Bar,  SignalWifiStatusbarConnectedNoInternet4, SignalWifiOff } from '@mui/icons-material';

export default class ConnectivityIcon extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            status:{
				is_alive: null,
				rtt_avg: null,
				lastCheck: null
			},
			quality: 0,
			robotID: window.localStorage.getItem('robotID'),
        };
    }

    refreshList() {
		djangoFetch('/robot', '/?name='+this.state.robotID, 'GET', '')
			.then((response)=>response.json())
			.then((json)=>this.setState({status: json.status}))
			.catch((e) => console.error(e))
			.finally(() => this.quality())
			.finally(() => this.timer());
    }

	componentDidMount = () => {
		while(!this.state.robotID){null}
		this.refreshList()
    }

	componentWillUnmount = () =>{
		clearTimeout(this.timer)
	}

	timer = () => {
		setTimeout(()=>this.refreshList(), 1000)
	}

	quality = () => {
		const status = this.state.status
		if (status.is_alive && (Date.now() - Date.parse(status.lastCheck)) < 20000){
			if (status.rtt_avg < 1){
				this.setState({ quality:  1 });
			}
			else if (status.rtt_avg < 10){
				this.setState({ quality:  2 });
			}
			else if (status.rtt_avg < 20){
				this.setState({ quality:  3 });
			}	
			else if (status.rtt_avg < 40){
				this.setState({ quality:  4 });
			}	
			else if (status.rtt_avg < 80){
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
		const iconStyle = {
			width: 30,
			height: 30,
			color:this.color()
		}
		switch(this.state.quality){
			case 0:
				return <SignalWifiOff sx={{...iconStyle }} />
			case 1:
				return <SignalWifi4Bar sx={{...iconStyle }} />
			case 2:
				return <SignalWifi3Bar sx={{...iconStyle }} />
			case 3:
				return <SignalWifi2Bar sx={{...iconStyle }} />
			case 4:
				return <SignalWifi1Bar sx={{...iconStyle }} />
			case 5:
				return <SignalWifi4Bar sx={{...iconStyle }} />
			case 6:
				return <SignalWifiStatusbarConnectedNoInternet4 sx={{...iconStyle }} />
			default:
				return <SignalWifiOff sx={{...iconStyle }} />
		}
	}

	render() {
		return (
			<div className="connectionPictogram" id="Header-Pictograms-Connection">
				{this.connectIcon()}
			</div>
		);
	}
}
