import React from "react";

import { djangoFetch } from 'API/url';

import { AddLocationAltOutlined  } from '@mui/icons-material';
import { Dropdown, message, Menu, Button } from 'antd';
import { requestOptions } from 'API/url';
import { IconButton } from '@mui/material';

import "./styles.css";

const items = [
	{
		key: 'battery',
		label: 'Waypoint',
        children: [
            {
                label: "w1",
                key: "w1",
            },
            {
                label: "w2",
                key: "w2",
            },
            {
                label: "w3",
                key: "w3",
            },
            {
                label: "w4",
                key: "w4",
            },
            {
                label: "w5",
                key: "w5",
            },
            {
                label: "w6",
                key: "w6",
            },
            {
                label: "w7",
                key: "w7",
            },
            {
                label: "w8",
                key: "w8",
            },
            {
                label: "w9",
                key: "w9",
            },
            {
                label: "w10",
                key: "w10",
            },
            {
                label: "w11",
                key: "w11",
            },
            {
                label: "w12",
                key: "w12",
            },
            {
                label: "w13",
                key: "w13",
            },
            {
                label: "w14",
                key: "w14",
            },
            {
                label: "w15",
                key: "w15",
            },
            {
                label: "w16",
                key: "w16",
            },
            {
                label: "w17",
                key: "w17",
            },
            {
                label: "w18",
                key: "w18",
            },
            {
                label: "w19",
                key: "w19",
            },
        ]
	},
];
  
var raw = (key) => JSON.stringify({
	"dataSource": "CeDRI",
	"database": "CeDRI_UGV_datalake",
	"collection": "Actions",
	"filter": {'dateTime': Date.now()},
	"update": [
		{
			'$set': {
                'status': 0,
                'source': 2,
                'command': key,
                'msg': 'std_msgs/String',
                'topic': '/navGo2',
                'priority': 10
			}
		}
	],
});

// const theme = useTheme();
export default class SimpleGraph extends React.Component {
	constructor(props) {
		super(props);
        
        this.state = {
            edit: false,
            list: null,
            robotID: window.localStorage.getItem('robotID'),
        }
    }

    
  getList = () => {
    const sendJSON = {
        "pipeline": [
            {
                "$match": {
                    "robot": this.state.robotID
                }
            }, {
                "$group": {
                    "_id": "$action.group", 
                    "key": {
                        "$first": "$action.group"
                    }, 
                    "label": {
                        "$first": "$action.group"
                    }, 
                    "children": {
                        "$push": {
                            "key": "$name", 
                            "label": "$action.title", 
                            "title": "$action.title"
                        }
                    }
                }
            }
        ]
    }
    djangoFetch('/action', '/?query=1', 'OPTIONS', JSON.stringify(sendJSON))
      .then((response) => response.json())
      .then((json) => {
        const _json = json
        console.log(_json)
        this.setState({list: _json})
      })
  }

  componentDidMount = () => {
    // this.getLayout();
    this.getList();
  }


	handleMenuClick = (e) => {
		message.open({
			key: e.key,
			type: 'loading',
			content: 'Sending command',
			style: {
				marginTop: '8vh',
			},
			duration: 0,
            
		});
        djangoFetch('/robot', '/?name='+this.state.robotID, 'GET', '')
            .then((response) => response.json())
            .then((json) => {
                const _json = json
                const sendJSON = {
                    "database": _json.database,
                    "action": e.key
                }
                djangoFetch('/action', '/?query=0', 'OPTIONS', JSON.stringify(sendJSON))
                    .then((response) => response.json())
                    .then((json) => {
                        const _json = json
                        message.open({
                            key: e.key,
                            type: 'success',
                            content: 'Success in sending command',
                            style: {
                                marginTop: '8vh',
                                zIndex:9999
                            },
                            duration: 2.5,
                        })
                    })
                    .catch((error) => {
                        console.error(error);
                        message.open({
                            key: e.key,
                            type: 'error',
                            content: 'Error in seding command',
                            style: {
                                marginTop: '8vh',
                                zIndex:9999
                            },
                            duration: 2.5,
                        })
                    });
            })
            .catch((error) => {
                message.open({
                    key: e.key,
                    type: 'error',
                    content: 'Error in seding command',
                    style: {
                        marginTop: '8vh',
                        zIndex:9999
                    },
                    duration: 2.5,
                })
                console.error(error);
            });
        
        
	};


	render() {
        const menu = () => (
            <Menu onClick={(e) => this.handleMenuClick(e)}>
                {this.state.list?this.state.list.map((option) => (
                    <Menu.SubMenu title={option.label} key={option.key}>
                        {option.children.map((child) => (
                        <Menu.Item key={child.key} >{child.label}</Menu.Item>
                        ))}
                    </Menu.SubMenu>
                )):<></>}
            </Menu>
        );
		return (
            <div className='buttonChange' id={'GridLayout-Grid-Button-Change' }>
                <Dropdown overlay={menu()}  >
                    <IconButton sx={{ flexShrink: 0, backgroundColor: 'grey.100', color:'', height:36, width:36, borderRadius:2}}  onClick={this.uploadHandle} >
                        <AddLocationAltOutlined sx={{color:'#454545', width:'130%' , height: '130%'}} />
                    </IconButton>
                </Dropdown>
            </div>
        )              
	}
}
