import * as React from 'react';

import { url, requestOptions } from 'API/url';

import DisabledByDefaultSharpIcon from '@mui/icons-material/DisabledByDefaultSharp';
import WarningSharpIcon from '@mui/icons-material/WarningSharp';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import HelpSharpIcon from '@mui/icons-material/HelpSharp';

import { notification } from 'antd';

var pipeline = 
[
	JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_datalake",
	"collection": "Diagnostics",
	"pipeline": [
		{
			'$match': {
				'name': '/Motors/motor_node: Battery'
			}
		}, {
			'$sort': {
				'dateTime': -1
			}
		}, {
			'$limit': 1
		}
	]
	}),
	JSON.stringify({
		"dataSource": "CeDRI",
		"database": "CeDRI_UGV_datalake",
		"collection": "Diagnostics",
		"pipeline": [
			{
				'$match': {
					'name': '/Hokuyo/urg node/Hardware Status'
				}
			}, {
				'$sort': {
					'dateTime': -1
				}
			}, {
				'$limit': 1
			}
		]
	}),
	JSON.stringify({
		"dataSource": "CeDRI",
		"database": "CeDRI_UGV_datalake",
		"collection": "Diagnostics",
		"pipeline": [
			{
				'$match': {
					'name': '/Motors/motor_node: FirmwareOptions'
				}
			}, {
				'$sort': {
					'dateTime': -1
				}
			}, {
				'$limit': 1
			}
		]
	}),
	JSON.stringify({
		"dataSource": "CeDRI",
		"database": "CeDRI_UGV_datalake",
		"collection": "Diagnostics",
		"pipeline": [
			{
				'$match': {
					'name': '/Motors'
				}
			}, {
				'$sort': {
					'dateTime': -1
				}
			}, {
				'$limit': 1
			}
		]
	}),
	JSON.stringify({
		"dataSource": "CeDRI",
		"database": "CeDRI_UGV_datalake",
		"collection": "Diagnostics",
		"pipeline": [
			{
				'$match': {
					'name': '/Other/amcl: Standard deviation'
				}
			}, {
				'$sort': {
					'dateTime': -1
				}
			}, {
				'$limit': 1
			}
		]
	}),
	JSON.stringify({
		"dataSource": "CeDRI",
		"database": "CeDRI_UGV_datalake",
		"collection": "Diagnostics",
		"pipeline": [
			{
				'$match': {
					'name': '/Motors/motor_node: MotorPower'
				}
			}, {
				'$sort': {
					'dateTime': -1
				}
			}, {
				'$limit': 1
			}
		]
	}),
];

const openNotification = (title, msg, icon) => {
    notification.open({
      message: title,
      description: msg,
      icon: icon,
      placement: 'bottomRight',
      duration: 0,
    });
  };

class Popup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
      data: [{
          level: -1,
      }],
			ticks: -1,
			meta: [],
			msg: '',
			level: -1,
      };
    }

	canUpdate(){
		if (JSON.parse(window.localStorage.getItem('fromLocal')) || this.state.ticks <= 0) {
			this.setState({ ticks: 10})
			this.refreshList()
		} else if (!JSON.parse(window.localStorage.getItem('fromLocal'))){
			this.setState({ ticks: this.state.ticks - 1})
		}
	}

  refreshList() {
		fetch(url(), requestOptions(this.props.pipeline))
		.then((response) => response.json())
		.then((json) => {
			this.setState({ data: json });
			this.setState({ msg: this.state.data[0].message})
			if(this.state.level != this.state.data[0].level){
				openNotification(this.props.title, this.state.data[0].message, this.icon(this.state.data[0]));
				this.setState({level: this.state.data[0].level})
			}
		})
		.catch((error) => {
			console.log(error);
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

  icon = (item, style) => {
      switch(item.level){
          case 0:
              return <CheckCircleSharpIcon color={"success"} {...style}/>;
          case 1:
              return <WarningSharpIcon color={"warning"} {...style}/> ;
          case 2:
              return <DisabledByDefaultSharpIcon color={"error"} {...style}/>;
          default:
              return <HelpSharpIcon color={"info"} {...style}/>;
      }
  }
}

export const Popups = () => {
  pipeline.forEach((item) => Popup(item))
}